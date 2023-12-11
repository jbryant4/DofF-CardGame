import styles from '@/DuelOfFates/Battle/BattleField.module.css';
import ResourceCard from '@/DuelOfFates/Battle/ResourceCard';
import DuelingCard from '~/constants/DuelingCard';

type OwnProps = {
  cards: (DuelingCard | null)[];
  isEnemy?: boolean;
};

const Resources = ({ cards, isEnemy = false }: OwnProps) => {
  return (
    <div className={`${styles.resource} p-8 bg-amber-50`}>
      <div className="h-full relative w-full">
        <ResourceCard card={cards[0]} isTopCard isEnemy={isEnemy} />
        <ResourceCard card={cards[1]} isEnemy={isEnemy} />
      </div>
    </div>
  );
};

export default Resources;
