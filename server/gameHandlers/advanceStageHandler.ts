import { Server, Socket } from 'socket.io';
import { GameMessages } from './gameHandlers';
import { GameRoom } from '../room';
import advanceGameStage from '../utils/advanceStage';

export default (
  socket: Socket,
  rooms: Record<string, GameRoom>,
  io: Server
) => {
  socket.on(GameMessages.AdvanceStage, (roomId: string) => {
    const room = rooms[roomId];
    if (room) {
      advanceGameStage(room);

      io.to(roomId).emit(GameMessages.AdvanceCompete, {
        battleTurn: room.battleTurn,
        battleStage: room.battleStage
      });
    }
  });
};
