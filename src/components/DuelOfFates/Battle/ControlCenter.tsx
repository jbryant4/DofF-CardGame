import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import GraveCards from '@/DuelOfFates/Battle/GraveCards';
import HandCard from '@/DuelOfFates/Battle/HandCard';
import BlueBtn from '@/Global/BlueBtn';
import DuelingCard from '~/constants/DuelingCard';
import { GameContext } from '~/context/GameContext';
import styles from './BattleField.module.css';
import Decks from './Decks';

type OwnProps = {
  graveyard: DuelingCard[];
  hand: DuelingCard[];
  foundationDeck: DuelingCard[];
  mainDeck: DuelingCard[];
  enemyBoard: boolean;
};

const ControlCenter = ({
  foundationDeck,
  graveyard,
  hand,
  mainDeck,
  enemyBoard
}: OwnProps) => {
  const [handWrapperWidth, setHandWrapperWidth] = useState(0);

  const { advanceBattleStage, localPlayer, battleTurn, battleStage } =
    useContext(GameContext);
  const handWrapperRef = useRef<HTMLDivElement>(null);
  const handCardSizeToUse =
    (handWrapperWidth - 40) / 4 > 255 ? 255 : (handWrapperWidth - 40) / 4;

  const showDecks = localPlayer === battleTurn && battleStage === 'respite';
  useEffect(() => {
    if (handWrapperRef.current) {
      setHandWrapperWidth(handWrapperRef.current.offsetWidth);
    }
  }, []);

  return (
    <div className={`${styles.controlCenter} bg-green-400`}>
      {!enemyBoard && (
        <GraveCards cards={graveyard} cardWidth={handCardSizeToUse} />
      )}

      <div className={`${styles.hand} relative`}>
        <div
          ref={handWrapperRef}
          className="bg-green-600 flex h-full justify-center relative w-full z-[2]"
        >
          {hand.length > 0 &&
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
      {!enemyBoard && (
        <div
          className={`${styles.actions} flex-col flex items-center justify-around`}
        >
          actions
          <BlueBtn onClick={() => advanceBattleStage()}>advance</BlueBtn>
        </div>
      )}
    </div>
  );
};

export default ControlCenter;
