import { Socket } from 'socket.io';
import { Duelist } from '~/constants/common/gameTypes';
import { PreGameMessages } from './preGameHandlers';
import { GameRoom } from '../room';

export default (socket: Socket, rooms: Record<string, GameRoom>) => {
  socket.on(PreGameMessages.JoinRoom, (roomId: string, duelist: Duelist) => {
    const room = rooms[roomId];
    if (!room) {
      // Room does not exist
      socket.emit(PreGameMessages.JoinFailed, `Room does not exist ${rooms}`);
    } else if (room.player2.userName.length > 0) {
      // TODO Room is full update for checking if the player id is in one of the slots
      socket.emit(PreGameMessages.JoinFailed, `Room is full ${{ ...room }}`);
    } else {
      room.player2 = { ...duelist, active: false };

      socket.join(roomId);
      // Notify both players that the game is starting
      socket.emit(PreGameMessages.JoinSuccess);
    }
  });
};
