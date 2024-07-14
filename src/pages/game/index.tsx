import { useRouter } from 'next/router';
import { useState } from 'react';
import { ActionBtn } from '@/Modals/BattleCardModal/BattleCardModal.styles';
import { Deck, defaultForgeDeck, Duelist } from '@shared/gameTypes';
import { isFailure, isSuccess } from '@shared/resultType';
import { Africa, Americas } from '~/constants/starterDecks';
import { useCollectorContext } from '~/context/CollectorContext';
import { useGameContext } from '~/context/GameContext';
import game from '~/pages/admin/game';
import createGame from '~/utils/firebase/createGame';
import joinGame from '~/utils/firebase/joinGame';

const Home = () => {
  const [deck, setDeck] = useState<Deck | undefined>(undefined);
  const [joinId, setJoinId] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { setRoomId } = useGameContext();
  const {
    collector: { data: collector, isLoaded }
  } = useCollectorContext();

  if (!isLoaded) {
    return <div>Loading.....</div>;
  }

  if (!collector) {
    console.error('No collector');

    return null;
  }

  const { userName, decks } = collector;
  const decksToShow: Deck[] = [Africa, Americas, ...decks];
  // const decksToShow: Deck[] = [...decks];

  const duelist: Duelist = {
    id: collector.id,
    userName: collector.userName,
    deck: deck ? deck : { ...defaultForgeDeck }
  };

  async function handleJoinGame() {
    const result = await joinGame(duelist, joinId);

    if (isSuccess(result)) {
      console.log(result.content);
      setRoomId(result.content);
      void router.push(`/game/${result.content}`);
    }

    if (isFailure(result)) {
      console.log(result.errorMessage);
      setError(result.errorMessage);
    }
  }

  async function handleCreateGame() {
    const result = await createGame(duelist);

    if (isSuccess(result)) {
      console.log(result.content);
      setRoomId(result.content);
      void router.push(`/game/${result.content}`);
    }

    if (isFailure(result)) {
      setError(result.errorMessage);
    }
  }

  const functionToUse =
    joinId.trim().length > 0 ? handleJoinGame : handleCreateGame;

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
            value={joinId}
            onChange={e => setJoinId(e.target.value)}
          />
        </div>

        <div>
          <ActionBtn type="submit" disabled={!deck}>
            {joinId.trim().length > 0 ? 'Join Game' : 'Create Game'}
          </ActionBtn>
        </div>
      </form>
    </div>
  );
};

export default Home;
