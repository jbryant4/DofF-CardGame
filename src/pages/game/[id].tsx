import { useRouter } from 'next/router';
import { useEffect } from 'react';
import DuelOfFates from '@/DuelOfFates';

import { playerOne, playerTwo } from '@/DuelOfFates/testSubjects';
import { useGameContext } from '~/context/GameContext';

const GamePage = () => {
  const router = useRouter();
  const {
    localPlayer,
    gameData: { isLoaded },
    roomId
  } = useGameContext();

  useEffect(() => {
    if (isLoaded && !localPlayer) {
      router.push('/game').catch(error => console.log(error));
    }
  }, [isLoaded, localPlayer, router]);

  const playerIdToUse =
    localPlayer === 'playerOne' ? playerOne.id : playerTwo.id;

  useEffect(() => {
    //TODO firebase functionality
    // Join the room when the component mounts
    // Cleanup function to leave the room when the component unmounts
  }, [roomId, playerIdToUse]);

  return <DuelOfFates />;
};

export default GamePage;
