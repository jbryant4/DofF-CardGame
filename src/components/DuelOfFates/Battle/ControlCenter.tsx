import classNames from 'classnames';
import { Fragment, useEffect, useRef, useState } from 'react';
import DuelCard from '@/DuelOfFates/Battle/DuelCard';
import BlueBtn from '@/Global/BlueBtn';
import DuelingCard from '~/constants/DuelingCard';
import styles from './BattleField.module.css';
import Decks from './Decks';

type OwnProps = {
  graveyard: DuelingCard[];
  hand: DuelingCard[];
  foundationDeck: DuelingCard[];
  mainDeck: DuelingCard[];
};

const ControlCenter = ({
  foundationDeck,
  graveyard,
  hand,
  mainDeck
}: OwnProps) => {
  const [viewDecks, setViewDecks] = useState(false);
  const [handWrapperWidth, setHandWrapperWidth] = useState(0);

  const handWrapperRef = useRef<HTMLDivElement>(null);
  const handCardSizeToUse =
    handWrapperWidth / 4 > 255 ? 255 : handWrapperWidth / 4;

  useEffect(() => {
    if (handWrapperRef.current) {
      setHandWrapperWidth(handWrapperRef.current.offsetWidth);
    }
  }, []);

  return (
    <div className={`${styles.controlCenter} bg-green-400`}>
      <div className={styles.graveyard}>graveyard</div>
      <div className={`${styles.hand} relative`}>
        <div
          ref={handWrapperRef}
          className="bg-green-600 h-full relative w-full z-[2]"
        >
          {hand.length > 0 &&
            hand.map((card, index) => (
              <Fragment key={index}>
                <DuelCard
                  duelingCard={card}
                  location="hand"
                  layout="hand"
                  cardWidth={handCardSizeToUse}
                  index={index}
                />
              </Fragment>
            ))}
        </div>
        <Decks
          foundationDeck={foundationDeck}
          mainDeck={mainDeck}
          viewDecks={viewDecks}
        />
      </div>
      <div
        className={`${styles.actions} flex-col flex items-center justify-around`}
      >
        actions
        <BlueBtn onClick={() => setViewDecks(v => !v)}>
          {viewDecks ? 'hide decks' : 'show decks'}
        </BlueBtn>
      </div>
    </div>
  );
};

export default ControlCenter;
