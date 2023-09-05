import { Fragment, useState } from 'react';
import styles from '@/DuelOfFates/Battle/BattleField.module.css';
import DuelingCard from '~/constants/DuelingCard';
import DesertFoundationIcon from '~/icons/DesertFoundationIcon';
import EarthFoundationIcon from '~/icons/EarthFoundationIcon';
import OceanFoundationIcon from '~/icons/OceanFoundationIcon';
import { Foundation } from '~/models/Card';

type OwnProps = {
  cards: (DuelingCard | null)[];
};
const iconToUse = (name: Foundation, size: number) => {
  switch (true) {
    case name === 'desert':
      return <DesertFoundationIcon size={size} />;
    case name === 'ocean':
      return <OceanFoundationIcon size={size} />;
    case name === 'earth':
      return <EarthFoundationIcon size={size} />;
  }
};

const FoundationCards = ({ cards }: OwnProps) => {
  const [showCard, setShowCard] = useState<DuelingCard | null>(null);
  const iconWidth = (window.innerWidth / 14) * 0.65;
  const imageWidth = window.innerWidth / 7;

  return (
    <div className={`${styles.foundation} grid grid-rows-4 px-8 relative`}>
      {showCard && (
        <img src={showCard.blankUrl} style={{ width: imageWidth }} />
      )}
      {cards.map((card, index) => (
        <Fragment key={`foundation-${index}`}>
          <div className="flex items-center justify-center">
            {card && card.foundation ? (
              <div onClick={() => setShowCard(card)}>
                {iconToUse(card.foundation[0], iconWidth)}
              </div>
            ) : (
              <div style={{ width: iconWidth }}>slot {index}</div>
            )}
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default FoundationCards;
