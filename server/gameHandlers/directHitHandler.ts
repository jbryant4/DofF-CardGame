import { Server, Socket } from 'socket.io';
import { Players } from '~/constants/common/gameTypes';
import { GameMessages } from './gameHandlers';
import { GameRoom } from '../room';
import handlePlayerDamage from '../utils/handlePlayerDamage';

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
        const playerToUpdate: Players =
          attackingPlayer === 'playerOne' ? 'playerTwo' : 'playerOne';

        handlePlayerDamage(room, playerToUpdate, 1, roomId, io);
      }
    }
  );
};
