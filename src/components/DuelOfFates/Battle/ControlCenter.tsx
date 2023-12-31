import {
  Dispatch,
  Fragment,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import HandCard from '@/DuelOfFates/Battle/HandCard';
import { ActionBtn } from '@/Modals/BattleCardModal/BattleCardModal.styles';
import { useBoardContext } from '~/context/BoardContext';
import { useDimensionsContext } from '~/context/DimensionsContext';
import { GameContext } from '~/context/GameContext';
import { useSocket } from '~/context/SocketContext';
import styles from './BattleField.module.css';
import Decks from './Decks';
import { GameMessages } from '../../../../server/gameHandlers/gameHandlers';

type OwnProps = {
  setShowGraveYard?: Dispatch<SetStateAction<boolean>>;
};

const ControlCenter = ({ setShowGraveYard }: OwnProps) => {
  //Currently Need this to determine card width and if not here throws errors
  const { advanceBattleStage, localPlayer, battleTurn, battleStage, roomId } =
    useContext(GameContext);

  const {
    localBoard: { hand }
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

      {showControls && (
        <div
          className={`flex-col flex items-center justify-around relative z-[3] bg-gray-400`}
        >
          actions
          <ActionBtn disabled={false} onClick={() => handleAdvance()}>
            advance
          </ActionBtn>
          {setShowGraveYard && (
            <ActionBtn
              disabled={false}
              onClick={() => setShowGraveYard(prevState => !prevState)}
            >
              graveyard
            </ActionBtn>
          )}
        </div>
      )}
      <Decks />
    </div>
  );
};

export default ControlCenter;
