import { Socket, Server } from 'socket.io';
import { GameRoom } from '../room';

export default (
  socket: Socket,
  rooms: Record<string, GameRoom>,
  io: Server
) => {
  socket.on('player-ready', (roomId: string, playerId: string) => {
    console.log('in player ready', roomId, playerId);
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
        io.to(roomId).emit('start-game');
      }
    }
  });
};
