import { Server } from 'socket.io';
import { BattleStage } from '~/constants/common/gameTypes';
import { GameMessages } from '../gameHandlers/gameHandlers';
import { GameRoom } from '../room';

const stagesInOrder: BattleStage[] = [
  'plan',
  'place',
  'duel',
  'respite',
  'draw'
];

export default function advanceGameStage(
  room: GameRoom,
  roomId: string,
  io: Server,
  from: string
): void {
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
