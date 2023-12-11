import styles from '@/DuelOfFates/Battle/BattleField.module.css';
import DuelingCard from '~/constants/DuelingCard';
import MilitaryCard from './MilitaryCard';

type OwnProps = {
  army: (DuelingCard | null)[];
  champions: (DuelingCard | null)[];
  isEnemy?: boolean;
};

const Military = ({ army, champions, isEnemy = false }: OwnProps) => {
  return (
    <div
      className={`${styles.military} grid grid-cols-6 justify-items-center py-16`}
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
