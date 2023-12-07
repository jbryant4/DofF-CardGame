import { Server, Socket } from 'socket.io';
import { BattleStage } from '~/constants/common/gameTypes';
import { GameMessages } from './gameHandlers';
import { GameRoom } from '../room';

const stagesInOrder: BattleStage[] = ['plan', 'place', 'duel', 'respite'];

export default (
  socket: Socket,
  rooms: Record<string, GameRoom>,
  io: Server
) => {
  socket.on(GameMessages.AdvanceStage, (roomId: string) => {
    const room = rooms[roomId];
    if (room) {
      const currentStageIndex = stagesInOrder.indexOf(room.battleStage);

      if (currentStageIndex === stagesInOrder.length - 1) {
        room.battleTurn =
          room.battleTurn === 'playerOne' ? 'playerTwo' : 'playerOne';
        room.battleStage = 'plan';
      } else {
        room.battleStage = stagesInOrder[currentStageIndex + 1];
      }

      io.to(roomId).emit(GameMessages.AdvanceCompete, {
        battleTurn: room.battleTurn,
        battleStage: room.battleStage
      });
    }
  });
};
