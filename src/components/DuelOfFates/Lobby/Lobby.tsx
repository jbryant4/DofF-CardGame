import { useContext } from 'react';
import { playerOne, playerTwo } from '@/DuelOfFates/testSubjects';
import { GameContext } from '~/context/GameContext';

function Lobby() {
  const { updatePlayerOne, updatePlayerTwo, setGameState, setLocalPLayer } =
    useContext(GameContext);

  const startAdminGame = () => {
    // Set test users to playerOne and playerTwo states
    updatePlayerOne(prevState => ({ ...prevState, ...playerOne }));
    updatePlayerTwo(prevState => ({ ...prevState, ...playerTwo }));

    //set localPlayer
    setLocalPLayer('playerOne');
    // Change the gameState to 'Battle'
    setGameState('Battle');
  };

  return (
    <div>
      <button onClick={startAdminGame}>Start Admin Game</button>
    </div>
  );
}

export default Lobby;
