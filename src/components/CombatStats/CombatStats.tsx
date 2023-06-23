import { useState } from 'react';
import AttackIcon from '~/icons/AttackIcon';
import HeartIcon from '~/icons/HealthBarIcon';
import ShieldIcon from '~/icons/ShieldIcon';
import { Container, Wrapper } from './CombatStats.styles';

type OwnProps = {
  attack?: number;
  defense?: number;
  health?: number;
};

const CombatStats = ({ attack, defense, health }: OwnProps) => {
  const [value, setValue] = useState();
  const noStats = !attack && !defense && !health;

  return noStats ? null : (
    <div>
      <h1 className="text-2xl text-center">Combat Stats</h1>
      <Container className="flex flex-row flex-wrap justify-around leading-none text-[64px] w-full">
        <div className="relative">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 transform">
            {defense}
          </div>
          <ShieldIcon className="fill-blue-600" />
        </div>
        <div className="relative">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-fit left-1/2 top-1/2 transform">
            {health}
          </div>
          <HeartIcon className="fill-red-800" />
        </div>
        <div className="relative w-full">
          <div className="-translate-x-1/2 absolute left-1/2 top-0 transform">
            {attack}
          </div>
          <AttackIcon className="mx-auto" />
        </div>
      </Container>
    </div>
  );
};

export default CombatStats;
