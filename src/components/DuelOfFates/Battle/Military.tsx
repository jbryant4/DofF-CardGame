import cx from 'classnames';
import styles from '@/DuelOfFates/Battle/BattleField.module.css';
import { useBoardContext } from '~/context/BoardContext';
import MilitaryCard from './MilitaryCard';

type OwnProps = {
  isEnemy?: boolean;
};

const Military = ({ isEnemy = false }: OwnProps) => {
  const { localBoard, enemyBoard } = useBoardContext();

  const { champions, army } = isEnemy ? enemyBoard : localBoard;

  return (
    <div
      className={cx(
        `${styles.military} grid grid-cols-6 justify-items-center `,
        { 'pb-16': !isEnemy },
        { 'pt-16': isEnemy }
      )}
    >
      {champions.map((champ, index) => (
        <MilitaryCard
          key={`champ-${index}`}
          card={champ}
          index={index}
          type="champ"
          isEnemy={isEnemy}
        />
      ))}

      {army.map((soldier, index) => (
        <MilitaryCard
          key={`army-${index}`}
          card={soldier}
          index={index}
          type="army"
          isEnemy={isEnemy}
        />
      ))}
    </div>
  );
};

export default Military;
