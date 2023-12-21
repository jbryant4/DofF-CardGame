import { BattleStage } from '~/constants/common/gameTypes';
import { GameRoom } from '../room';

const stagesInOrder: BattleStage[] = ['plan', 'place', 'duel', 'respite'];

export default function advanceGameStage(room: GameRoom): void {
  const currentStageIndex = stagesInOrder.indexOf(room.battleStage);

  if (currentStageIndex === stagesInOrder.length - 1) {
    room.battleTurn =
      room.battleTurn === 'playerOne' ? 'playerTwo' : 'playerOne';
    room.battleStage = 'plan';
  } else {
    room.battleStage = stagesInOrder[currentStageIndex + 1];
  }
}
