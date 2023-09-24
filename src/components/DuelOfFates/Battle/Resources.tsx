import { useState } from 'react';
import styles from '@/DuelOfFates/Battle/BattleField.module.css';
import ResourceCard from '@/DuelOfFates/Battle/ResourceCard';
import DuelingCard from '~/constants/DuelingCard';

type OwnProps = {
  cards: (DuelingCard | null)[];
};

const Resources = ({ cards }: OwnProps) => {
  const [topCard, setTopCard] = useState('cardOne');

  return (
    <div className={`${styles.resource} p-8 bg-amber-50 relative`}>
      <ResourceCard
        card={cards[0]}
        isActive={topCard === 'cardOne'}
        onClick={() => setTopCard('cardOne')}
      />
      <ResourceCard
        card={cards[1]}
        isActive={topCard !== 'cardOne'}
        onClick={() => setTopCard('cardTwo')}
      />
    </div>
  );
};

export default Resources;
