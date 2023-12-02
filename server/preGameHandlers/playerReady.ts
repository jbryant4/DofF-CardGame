import { Socket, Server } from 'socket.io';
import { PreGameMessages } from './preGameHandlers';
import { GameRoom } from '../room';

export default (
  socket: Socket,
  rooms: Record<string, GameRoom>,
  io: Server
) => {
  socket.on(PreGameMessages.PlayerReady, (roomId: string, playerId: string) => {
    const room = rooms[roomId];
    if (room) {
      // Mark the player as ready
      if (room.player1.id === playerId) {
        room.player1.active = true;
      } else if (room.player2.id === playerId) {
        room.player2.active = true;
      }

      // Check if both players are ready to start the game
      if (room.player1.active && room.player2.active) {
        io.to(roomId).emit(PreGameMessages.RPSShoot);
      }
    }
  });
};
