import { useRouter } from 'next/router';
import { useEffect } from 'react';
import DuelOfFates from '@/DuelOfFates';
import { useGameContext } from '~/context/GameContext';
import { useSocket } from '~/context/SocketContext';
import { PreGameMessages } from '../../../server/preGameHandlers/preGameHandlers';

export default function GamePage() {
  const router = useRouter();
  const socket = useSocket();
  const { localPlayer, playerOne, playerTwo, roomId, setGameState } =
    useGameContext();

  useEffect(() => {
    if (!localPlayer) {
      router.push('/game').catch(error => console.log(error));
    }
  }, [localPlayer, router, setGameState]);

  const playerIdToUse =
    localPlayer === 'playerOne' ? playerOne.id : playerTwo.id;

  useEffect(() => {
    if (!socket) return;

    // Join the room when the component mounts
    socket.emit(PreGameMessages.PlayerReady, roomId, playerIdToUse);

    // Cleanup function to leave the room when the component unmounts
    return () => {
      socket.emit('leave-room', roomId, playerIdToUse);
    };
  }, [roomId, playerIdToUse, socket]);

  return <DuelOfFates />;
}
