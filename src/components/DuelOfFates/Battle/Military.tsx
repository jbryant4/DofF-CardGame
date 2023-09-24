import styles from '@/DuelOfFates/Battle/BattleField.module.css';
import DuelingCard from '~/constants/DuelingCard';
import MilitaryCard from './MilitaryCard';

type OwnProps = {
  army: (DuelingCard | null)[];
  champions: (DuelingCard | null)[];
};

const Military = ({ army, champions }: OwnProps) => {
  return (
    <div
      className={`${styles.military} grid grid-cols-6 justify-items-center py-8`}
    >
      {champions.map((champ, index) => (
        <MilitaryCard
          key={`champ-${index}`}
          card={champ}
          index={index}
          type="champ"
        />
      ))}

      {army.map((soldier, index) => (
        <MilitaryCard
          key={`army-${index}`}
          card={soldier}
          index={index}
          type="army"
        />
      ))}
    </div>
  );
};

export default Military;
