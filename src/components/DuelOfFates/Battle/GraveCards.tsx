import { Fragment } from 'react';
import styles from '@/DuelOfFates/Battle/BattleField.module.css';
import BattleCard from '@/UpdatedCard/BattleCard';
import DuelingCard from '~/constants/DuelingCard';
import { useBoardContext } from '~/context/BoardContext';

type OwnProps = {
  cardWidth: number;
  isEnemy?: boolean;
};

const GraveCards = ({ isEnemy, cardWidth }: OwnProps) => {
  const { localBoard, enemyBoard } = useBoardContext();

  const { graveyard } = isEnemy ? enemyBoard : localBoard;
  const graveYardsToShow =
    graveyard.slice(0, 3).length > 0 ? graveyard.slice(0, 3) : [];

  return (
    <div
      className={`${styles.graveyard} relative overflow-hidden flex flex-col gap-4 items-center`}
    >
      <div>Grave Yard</div>
      <div className="relative" style={{ width: cardWidth }}>
        {graveYardsToShow.length > 0 ? (
          graveYardsToShow.map((card, index) => (
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
