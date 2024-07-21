import { useRouter } from 'next/router';
import { useEffect } from 'react';
import DuelOfFates from '@/DuelOfFates';
import { useGameContext } from '~/context/GameContext';

const GamePage = () => {
  const router = useRouter();
  const {
    localPlayer: { isLoaded, data: localPlayer },
    roomId
  } = useGameContext();

  useEffect(() => {
    if (isLoaded && !localPlayer) {
      router.push('/game').catch(error => console.log(error));
    }
  }, [isLoaded, localPlayer, router]);

  return <DuelOfFates />;
};

export default GamePage;
