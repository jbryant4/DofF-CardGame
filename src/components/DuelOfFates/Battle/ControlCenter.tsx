import { Dispatch, Fragment, SetStateAction, useContext } from 'react';
import HandCard from '@/DuelOfFates/Battle/HandCard';
import { Overlay } from '@/DuelOfFates/Battle/Overlays/Overlays';
import { ActionBtn } from '@/Modals/BattleCardModal/BattleCardModal.styles';
import { useBoardContext } from '~/context/BoardContext';
import { GameContext } from '~/context/GameContext';
import { useSocket } from '~/context/SocketContext';
import styles from './BattleField.module.css';
import Decks from './Decks';
import { GameMessages } from '../../../../server/gameHandlers/gameHandlers';

type OwnProps = {
  overlayOpen: Overlay;
  setShowGraveYard: Dispatch<SetStateAction<Overlay>>;
};

const ControlCenter = ({ overlayOpen, setShowGraveYard }: OwnProps) => {
  //Currently Need this to determine card width and if not here throws errors
  const { advanceBattleStage, localPlayer, battleTurn, roomId } =
    useContext(GameContext);

  const {
    localBoard: { hand },
    enemyBoard: { hand: enemyHand }
  } = useBoardContext();

  const socket = useSocket();

  const showControls = localPlayer === battleTurn;
  // TODO start following the patern of if socket send message if not use the local stuff for deving atm
  const handleAdvance = () => {
    if (socket) {
      socket.emit(GameMessages.AdvanceStage, roomId);
    } else {
      advanceBattleStage();
    }
  };

  return (
    <div
      id="control-wrapper"
      className={`${styles.controlCenter} relative`}
      style={{}}
    >
      <div className="bg-green-400 h-full relative z-[3]">
        <div className="absolute inset-0">
          <div className="flex h-full justify-center">
            {hand.length > 0 &&
              hand.map((card, index) => (
                <Fragment key={card.id}>
                  <HandCard duelingCard={card} index={index} />
                </Fragment>
              ))}
          </div>
        </div>
      </div>

      <div
        className={`flex-col flex items-center gap-4 relative z-[3] bg-gray-400`}
      >
        {showControls && (
          <>
            controls
            <ActionBtn disabled={false} onClick={() => handleAdvance()}>
              advance stage
            </ActionBtn>
            overlays
            <div className="flex justify-around w-full">
              <ActionBtn
                disabled={overlayOpen === Overlay.None}
                onClick={() => setShowGraveYard(Overlay.None)}
              >
                none
              </ActionBtn>
              <ActionBtn
                disabled={overlayOpen === Overlay.GraveYardOverlay}
                onClick={() => setShowGraveYard(Overlay.GraveYardOverlay)}
              >
                graveyard
              </ActionBtn>
              <ActionBtn
                disabled={
                  overlayOpen === Overlay.EnemyHandOverlay ||
                  enemyHand.length === 0
                }
                onClick={() => setShowGraveYard(Overlay.EnemyHandOverlay)}
              >
                enemy hand
              </ActionBtn>
              <ActionBtn
                disabled={overlayOpen === Overlay.ScoreBoardOverlay}
                onClick={() => setShowGraveYard(Overlay.ScoreBoardOverlay)}
              >
                score board
              </ActionBtn>
            </div>
          </>
        )}
      </div>
      <Decks />
    </div>
  );
};

export default ControlCenter;
