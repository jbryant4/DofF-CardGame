import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DuelOfFates from '@/DuelOfFates';
import { useGameContext } from '~/context/GameContext';
import { useSocket } from '~/context/SocketContext';

export default function GamePage() {
  const router = useRouter();
  const { id = '', isAdmin } = router.query;
  const socket = useSocket();
  const adminGame = isAdmin === 'true';
  const { localPlayer, playerOne, playerTwo } = useGameContext();

  useEffect(() => {
    if (!localPlayer) {
      router.push('/game').catch(error => console.log(error));
    }
  }, [localPlayer, router]);

  const playerIdToUse =
    localPlayer === 'playerOne' ? playerOne.id : playerTwo.id;

  useEffect(() => {
    if (adminGame || !socket) return;

    // Join the room when the component mounts
    socket.emit('player-ready', id, playerIdToUse);

    // Cleanup function to leave the room when the component unmounts
    return () => {
      socket.emit('leave-room', id, playerIdToUse);
    };
  }, [adminGame, id, playerIdToUse, socket]);

  return <DuelOfFates isAdmin={adminGame} />;
}
