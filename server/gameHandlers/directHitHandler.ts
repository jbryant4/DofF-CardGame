import { Server, Socket } from 'socket.io';
import { Players } from '~/constants/common/gameTypes';
import { GameMessages } from './gameHandlers';
import { GameRoom } from '../room';

export default (
  socket: Socket,
  rooms: Record<string, GameRoom>,
  io: Server
) => {
  socket.on(
    GameMessages.DirectHit,
    (roomId: string, attackingPlayer: Players) => {
      const room = rooms[roomId];
      if (room) {
        const { player1, player2 } = room;

        const playerToUpdate =
          attackingPlayer === 'playerOne' ? player2 : player1;

        playerToUpdate.hitPoints = playerToUpdate.hitPoints - 1;

        if (playerToUpdate.hitPoints === 0) {
          io.to(roomId).emit(GameMessages.GameOver, {
            winner: attackingPlayer
          });
        } else {
          io.to(roomId).emit(GameMessages.HealthUpdate, {
            player1Health: player1.hitPoints,
            player2Health: player2.hitPoints
          });
        }
      }
    }
  );
};
