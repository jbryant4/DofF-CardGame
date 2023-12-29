import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import GraveCards from '@/DuelOfFates/Battle/GraveCards';
import HandCard from '@/DuelOfFates/Battle/HandCard';
import { ActionBtn } from '@/Modals/BattleCardModal/BattleCardModal.styles';
import DuelingCard from '~/constants/DuelingCard';
import { useBoardContext } from '~/context/BoardContext';
import { useDimensionsContext } from '~/context/DimensionsContext';
import { GameContext } from '~/context/GameContext';
import { useSocket } from '~/context/SocketContext';
import styles from './BattleField.module.css';
import Decks from './Decks';
import { GameMessages } from '../../../../server/gameHandlers/gameHandlers';

type OwnProps = {
  isEnemy?: boolean;
};

const ControlCenter = ({ isEnemy = false }: OwnProps) => {
  //Currently Need this to determine card width and if not here throws errors
  const { advanceBattleStage, localPlayer, battleTurn, battleStage, roomId } =
    useContext(GameContext);
  const { handCardWidth } = useDimensionsContext();

  const { localBoard, enemyBoard } = useBoardContext();
  const { hand } = isEnemy ? enemyBoard : localBoard;

  const handWrapperRef = useRef<HTMLDivElement>(null);

  const socket = useSocket();

  const showControls = !isEnemy && localPlayer === battleTurn;
  // TODO start following the patern of if socket send message if not use the local stuff for deving atm
  const handleAdvance = () => {
    if (socket) {
      socket.emit(GameMessages.AdvanceStage, roomId);
    } else {
      advanceBattleStage();
    }
  };

  return (
    <div className={`${styles.controlCenter} bg-green-400`}>
      <GraveCards isEnemy={isEnemy} cardWidth={handCardWidth} />

      <div className={`${styles.hand} relative`}>
        <div
          ref={handWrapperRef}
          className="bg-green-600 flex h-full justify-end relative w-full z-[2]"
        >
          {hand.length > 0 &&
            hand.map((card, index) => (
              <Fragment key={card.id}>
                <HandCard
                  duelingCard={card}
                  cardWidth={handCardWidth}
                  index={index}
                  enemyHand={isEnemy}
                />
              </Fragment>
            ))}
        </div>
        {!isEnemy && <Decks cardWidth={handCardWidth} />}
      </div>
      {showControls && (
        <div
          className={`${styles.actions} flex-col flex items-center justify-around`}
        >
          actions
          <ActionBtn disabled={false} onClick={() => handleAdvance()}>
            advance
          </ActionBtn>
        </div>
      )}
    </div>
  );
};

export default ControlCenter;
