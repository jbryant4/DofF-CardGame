import styles from '@/DuelOfFates/Battle/BattleField.module.css';
import ResourceCard from '@/DuelOfFates/Battle/ResourceCard';
import DuelingCard from '~/constants/DuelingCard';
import { useBoardContext } from '~/context/BoardContext';

type OwnProps = {
  isEnemy?: boolean;
};

const Resources = ({ isEnemy = false }: OwnProps) => {
  const { localBoard, enemyBoard } = useBoardContext();

  const { resources } = isEnemy ? enemyBoard : localBoard;

  return (
    <div className={`${styles.resource} p-8 bg-amber-50`}>
      <div className="h-full relative w-full">
        <ResourceCard card={resources[0]} isTopCard isEnemy={isEnemy} />
        <ResourceCard card={resources[1]} isEnemy={isEnemy} />
      </div>
    </div>
  );
};

export default Resources;
