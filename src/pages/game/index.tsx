import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import withAuth, {
  getServerSideProps as getServerSideAuthProps
} from '@/withAuth';
import { Duelist } from '~/constants/common/gameTypes';
import { Africa, Americas } from '~/constants/starterDecks';
import { GameContext, useGameContext } from '~/context/GameContext';
import { useSocket } from '~/context/SocketContext';
import { PreGameMessages } from '../../../server/preGameHandlers/preGameHandlers';

const Home = () => {
  const [name, setName] = useState('');
  const [deck, setDeck] = useState('');
  const [gameId, setGameId] = useState('');
  const socket = useSocket();
  const router = useRouter();
  const { setLocalPLayer, updatePlayerTwo, updatePlayerOne } = useGameContext();
  const { setRoomId } = useContext(GameContext);
  const deckToUse = deck === 'Africa' ? Africa : Americas;
  const duelist: Duelist = {
    id: name,
    userName: name,
    deck: deckToUse,
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
        .catch(err => console.log('Navigation Error /game join function'));
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
      >
        <div>
          <label htmlFor="name-select">Select Name:</label>
          <select id="name-select" onChange={e => setName(e.target.value)}>
            <option value="">Select Name</option>
            <option value="Architect">Architect</option>
            <option value="Historian">Historian</option>
          </select>
        </div>

        <div>
          <label htmlFor="deck-select">Select Deck:</label>
          <select id="deck-select" onChange={e => setDeck(e.target.value)}>
            <option value="">Select Deck</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
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
          <button type="submit" disabled={!deck || !name}>
            {gameId.trim().length > 0 ? 'Join Game' : 'Create Game'}
          </button>
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
