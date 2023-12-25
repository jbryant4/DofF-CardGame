import { useContext } from 'react';
import ControlCenter from '@/DuelOfFates/Battle/ControlCenter';
import Military from '@/DuelOfFates/Battle/Military';
import Resources from '@/DuelOfFates/Battle/Resources';
import { BoardContext } from '~/context/BoardContext';
import { GameContext } from '~/context/GameContext';
import styles from './BattleField.module.css';
import FoundationCards from './FoundationCard';

type OwnProps = { isEnemy?: boolean };

const CardLayout = ({ isEnemy = false }: OwnProps) => {
  return isEnemy ? (
    <div className={styles.enemyLayout}>
      <Resources isEnemy={isEnemy} />
      <FoundationCards isEnemy={isEnemy} />
      <Military isEnemy={isEnemy} />
      <ControlCenter isEnemy={isEnemy} />
    </div>
  ) : (
    <div className={styles.layout}>
      <Resources />
      <FoundationCards />
      <Military />
      <ControlCenter />
    </div>
  );
};

export default CardLayout;
