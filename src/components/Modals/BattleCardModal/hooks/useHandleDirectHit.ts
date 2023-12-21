import { useCallback } from 'react';
import { useGameContext } from '~/context/GameContext';
import { useSocket } from '~/context/SocketContext';
import { GameMessages } from '../../../../../server/gameHandlers/gameHandlers';

export default function useHandleDirectHit() {
  const socket = useSocket();
  const { localPlayer, roomId, updatePlayerOne, updatePlayerTwo } =
    useGameContext();

  const handleDirectHit = useCallback(() => {
    if (socket) {
      socket.emit(GameMessages.DirectHit, roomId, localPlayer);
    } else {
      const playerToUpdate =
        localPlayer === 'playerOne' ? updatePlayerTwo : updatePlayerOne;

      playerToUpdate(prevState => ({
        ...prevState,
        hitPoints: prevState.hitPoints - 1
      }));
    }
  }, [localPlayer, roomId, socket, updatePlayerOne, updatePlayerTwo]);

  return handleDirectHit;
}
