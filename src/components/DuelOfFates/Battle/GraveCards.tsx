import { Fragment } from 'react';
import styles from '@/DuelOfFates/Battle/BattleField.module.css';
import BattleCard from '@/UpdatedCard/BattleCard';
import DuelingCard from '~/constants/DuelingCard';

type OwnProps = {
  cards: DuelingCard[];
  cardWidth: number;
};

const GraveCards = ({ cards, cardWidth }: OwnProps) => {
  return (
    <div
      className={`${styles.graveyard} relative overflow-hidden flex flex-col gap-4 items-center`}
    >
      <div>Grave Yard</div>
      <div className="relative" style={{ width: cardWidth }}>
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <Fragment key={card.id}>
              <div
                style={{
                  width: cardWidth,
                  height: cardWidth * (4 / 3),
                  zIndex: index
                }}
                className="absolute"
              >
                <BattleCard card={card} width={cardWidth} />
              </div>
            </Fragment>
          ))
        ) : (
          <div
            style={{ width: cardWidth, height: (cardWidth * 4) / 3 }}
            className="absolute border-2 border-black"
          />
        )}
      </div>
    </div>
  );
};

export default GraveCards;
