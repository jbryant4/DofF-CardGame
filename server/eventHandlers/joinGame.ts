import { Server, Socket } from 'socket.io';
import { Duelist } from '~/constants/common/gameTypes';
import { GameRoom } from '../room';

export default (socket: Socket, rooms: Record<string, GameRoom>) => {
  socket.on('join-game', (roomId: string, duelist: Duelist) => {
    const room = rooms[roomId];
    if (!room) {
      // Room does not exist
      socket.emit('join-game-failed', `Room does not exist ${rooms}`);
    } else if (room.player2.userName.length > 0) {
      // Room is full
      socket.emit('join-game-failed', `Room is full ${{ ...room }}`);
    } else {
      room.player2 = { ...duelist, active: false };

      socket.join(roomId);
      // Notify both players that the game is starting
      socket.emit('joining-game');
    }
  });
};
