import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import GraveCards from '@/DuelOfFates/Battle/GraveCards';
import HandCard from '@/DuelOfFates/Battle/HandCard';
import BlueBtn from '@/Global/BlueBtn';
import DuelingCard from '~/constants/DuelingCard';
import { GameContext } from '~/context/GameContext';
import { useSocket } from '~/context/SocketContext';
import styles from './BattleField.module.css';
import Decks from './Decks';
import { GameMessages } from '../../../../server/gameHandlers/gameHandlers';

type OwnProps = {
  graveyard: DuelingCard[];
  hand: DuelingCard[];
  foundationDeck: DuelingCard[];
  mainDeck: DuelingCard[];
  enemyBoard?: boolean;
};

const ControlCenter = ({
  foundationDeck,
  graveyard,
  hand,
  mainDeck,
  enemyBoard = false
}: OwnProps) => {
  const [handWrapperWidth, setHandWrapperWidth] = useState(0);
  //Currently Need this to determine card width and if not here throws errors
  const [loaded, setLoaded] = useState(false);
  const { advanceBattleStage, localPlayer, battleTurn, battleStage, roomId } =
    useContext(GameContext);
  const handWrapperRef = useRef<HTMLDivElement>(null);
  const handCardSizeToUse =
    (handWrapperWidth - 40) / 4 > 255 ? 255 : (handWrapperWidth - 40) / 4;
  const socket = useSocket();
  const showDecks = localPlayer === battleTurn && battleStage === 'draw';
  useEffect(() => {
    if (handWrapperRef.current) {
      setHandWrapperWidth(handWrapperRef.current.offsetWidth);
    }
    setLoaded(true);
  }, []);

  const showControls = !enemyBoard && localPlayer === battleTurn;
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
      {!enemyBoard && (
        <GraveCards cards={graveyard} cardWidth={handCardSizeToUse} />
      )}

      <div className={`${styles.hand} relative`}>
        <div
          ref={handWrapperRef}
          className="bg-green-600 flex h-full justify-end relative w-full z-[2]"
        >
          {hand.length > 0 &&
            loaded &&
            hand.map((card, index) => (
              <Fragment key={card.id}>
                <HandCard
                  duelingCard={card}
                  cardWidth={handCardSizeToUse}
                  index={index}
                  enemyHand={enemyBoard}
                />
              </Fragment>
            ))}
        </div>
        {!enemyBoard && (
          <Decks
            cardWidth={handCardSizeToUse}
            foundationDeck={foundationDeck}
            mainDeck={mainDeck}
            viewDecks={showDecks}
            handDeckLength={hand.length}
          />
        )}
      </div>
      {showControls && (
        <div
          className={`${styles.actions} flex-col flex items-center justify-around`}
        >
          actions
          <BlueBtn onClick={() => handleAdvance()}>advance</BlueBtn>
        </div>
      )}
    </div>
  );
};

export default ControlCenter;
