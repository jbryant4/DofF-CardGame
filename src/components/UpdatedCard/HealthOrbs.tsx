import classNames from 'classnames';
import { CombatStat } from '@/UpdatedCard/BattleCard';

type OwnProps = {
  combatHp: CombatStat;
};

const HealthOrbs = ({ combatHp }: OwnProps) => {
  const healthOrbs =
    combatHp.current > combatHp.max ? combatHp.current : combatHp.max;

  return (
    <div
      id="health"
      className="bg-black flex-shrink-0 relative self-end w-full"
    >
      <div className="flex mx-auto w-fit">
        {Array.from({ length: healthOrbs }).map((_, index) => (
          <div
            key={index}
            className={classNames(
              'health-circle',
              {
                empty: index <= combatHp.max && index >= combatHp.current
              },
              {
                'bonus-health': index + 1 > combatHp.max
              }
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default HealthOrbs;
