import { useContext } from 'react';
import { playerOne, playerTwo } from '@/DuelOfFates/testSubjects';
import { GameContext } from '~/context/GameContext';

function LoadingPage() {
  const { battleTurn } = useContext(GameContext);

  return (
    <div>
      <p>Setting up the Board </p>
      <p>{battleTurn} will be going first good luck </p>
    </div>
  );
}

export default LoadingPage;
