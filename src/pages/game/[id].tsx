import { useRouter } from 'next/router';
import DuelOfFates from '@/DuelOfFates';
import { BoardProvider } from '~/context/BoardContext';
import { GameProvider } from '~/context/GameContext';
// import { EffectProvider } from '../../contexts/EffectContext';

function GamePage() {
  const router = useRouter();
  const { id = '' } = router.query; // Get game id from URL

  if (typeof id !== 'string') {
    // Handle the unexpected case, perhaps return an error component or redirect the user.
    return <div>Invalid game Id: {id}</div>;
  }

  return (
    <GameProvider gameId={id}>
      <BoardProvider>
        <DuelOfFates />
      </BoardProvider>
    </GameProvider>
  );
}

export default GamePage;
