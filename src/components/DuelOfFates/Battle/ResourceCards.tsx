import { useState } from 'react';
import styles from '@/DuelOfFates/Battle/BattleField.module.css';
import DuelingCard from '~/constants/DuelingCard';
import card from '~/models/Card';

type OwnProps = {
  cards: (DuelingCard | null)[];
};

const ResourceCards = ({ cards }: OwnProps) => {
  const [topCard, setTopCard] = useState('cardOne');
  const cardWidth = innerWidth / 7 - 20;

  return (
    <div className={`${styles.resource} p-8 bg-amber-50 relative`}>
      {cards[0] ? (
        <img
          src={cards[0].blankUrl}
          className="absolute top-8"
          style={{
            width: cardWidth,
            height: (cardWidth * 4) / 3,
            right: topCard === 'cardOne' ? 8 : 'unset',
            left: topCard === 'cardOne' ? 'unset' : 8,
            zIndex: topCard === 'cardOne' ? 2 : 1
          }}
          onClick={() => setTopCard('cardOne')}
        />
      ) : (
        <div
          className="absolute bg-green-200 border-2 border-gray-600 top-8"
          style={{
            width: cardWidth,
            height: (cardWidth * 4) / 3,
            right: 8,
            zIndex: 2
          }}
        />
      )}

      {cards[1] ? (
        <img
          src={cards[1]?.blankUrl}
          className="absolute bg-green-300 bottom-8"
          style={{
            width: cardWidth,
            height: (cardWidth * 4) / 3,
            right: topCard !== 'cardOne' ? 8 : 'unset',
            left: topCard !== 'cardOne' ? 'unset' : 8,
            zIndex: topCard !== 'cardOne' ? 2 : 1
          }}
          onClick={() => setTopCard('cardTwo')}
        />
      ) : (
        <div
          className="absolute bg-green-200 border-2 border-gray-600 bottom-8"
          style={{
            width: cardWidth,
            height: (cardWidth * 4) / 3,
            left: 8,
            zIndex: 1
          }}
        />
      )}
    </div>
  );
};

export default ResourceCards;
