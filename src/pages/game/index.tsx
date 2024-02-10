import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { ActionBtn } from '@/Modals/BattleCardModal/BattleCardModal.styles';
import withAuth, {
  getServerSideProps as getServerSideAuthProps
} from '@/withAuth';
import { Duelist } from '~/constants/common/gameTypes';
import { Africa, Americas } from '~/constants/starterDecks';
import { useCollector } from '~/context/CollectorContext';
import { GameContext, useGameContext } from '~/context/GameContext';
import { useSocket } from '~/context/SocketContext';
import { Deck } from '~/models/Collector';
import { PreGameMessages } from '../../../server/preGameHandlers/preGameHandlers';

const Home = () => {
  const [deck, setDeck] = useState<Deck | undefined>(undefined);
  const [gameId, setGameId] = useState('');
  const socket = useSocket();
  const router = useRouter();
  const { setLocalPLayer, updatePlayerTwo, updatePlayerOne } = useGameContext();
  const { setRoomId } = useContext(GameContext);
  const { collector } = useCollector();

  if (!collector) {
    console.error('No collector');

    return null;
  }

  const { userName, decks } = collector;
  const decksToShow: Deck[] = [Africa, Americas, ...decks];

  const duelist: Duelist = {
    id: collector.userName,
    userName: collector.userName,
    deck: deck ? deck : { title: '', cards: [], duelReady: false },
    hitPoints: 10
  };

  const handleJoinGame = () => {
    if (!socket) {
      console.error('no socket connection');

      return;
    }

    // Emit a 'join-game' event to the server with the provided game ID
    socket.emit(PreGameMessages.JoinRoom, gameId, duelist);

    // Handle the response from the server
    socket.on(PreGameMessages.JoinFailed, error => {
      // Handle the error scenario, e.g., display an error message
      console.log(`Join game failed: ${error}`);
    });

    socket.on(PreGameMessages.JoinSuccess, data => {
      updatePlayerTwo({ ...duelist });
      setLocalPLayer('playerTwo');
      console.log(data);
      setRoomId(data);
      router
        .push(`/game/${data}`)
        .catch(err => console.log('Navigation Error /game join function', err));
    });
  };

  const handleCreateGame = () => {
    if (!socket) {
      console.error('no socket connection');

      return;
    }

    socket.emit(PreGameMessages.NewRoom, duelist);

    socket.on(PreGameMessages.RoomCreated, data => {
      updatePlayerOne({ ...duelist });

      setLocalPLayer('playerOne');
      const roomId = data.roomId;
      setRoomId(roomId);

      router
        .push(`/game/${roomId}`)
        .catch(err =>
          console.log('Navigation Error /game create function', err)
        );
    });
  };

  const functionToUse =
    gameId.trim().length > 0 ? handleJoinGame : handleCreateGame;

  return (
    <div className="flex flex-col gap-24 h-full items-center justify-center w-full">
      <h1>Duel of Fates</h1>
      <h2>Lobby </h2>

      <form
        onSubmit={e => {
          e.preventDefault();
          functionToUse();
        }}
        className="flex flex-col gap-24"
      >
        <div>Welcome Duelist: {userName}</div>

        <div>
          <label htmlFor="deck-select">Select Deck:</label>
          <select
            id="deck-select"
            onChange={e => setDeck(JSON.parse(e.target.value))}
          >
            <option>Select Deck</option>
            {decksToShow.map(d =>
              d.duelReady ? (
                <option key={d.title} value={JSON.stringify(d)}>
                  {d.title}
                </option>
              ) : null
            )}
          </select>
        </div>

        <div>
          <label htmlFor="game-id">Game ID:</label>
          <input
            type="text"
            id="game-id"
            placeholder="Enter Game ID"
            value={gameId}
            onChange={e => setGameId(e.target.value)}
          />
        </div>

        <div>
          <ActionBtn type="submit" disabled={!deck}>
            {gameId.trim().length > 0 ? 'Join Game' : 'Create Game'}
          </ActionBtn>
        </div>
      </form>
    </div>
  );
};

export default withAuth(Home);

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const authProps = await getServerSideAuthProps(ctx);

  return { props: { ...authProps.props } };
}
