import { useState } from 'react';
import { CombatStat } from '@/UpdatedCard/BattleCard';
import AttackIcon from '~/icons/AttackIcon';
import ShieldIcon from '~/icons/ShieldIcon';

type OwnProps = {
  combatCircleRadius: number;
  combatAtk: CombatStat;
  combatDef: CombatStat;
  position: 'attack' | 'defense';
};

const CombatStats = ({
  combatAtk,
  combatCircleRadius,
  combatDef,
  position
}: OwnProps) => {
  return (
    <>
      <div id="attack-defense" className="flex items-center relative">
        <div
          className="flex items-center justify-center overflow-hidden relative rounded-full text-white z-[2]"
          style={{
            width: combatCircleRadius,
            height: combatCircleRadius,
            fontSize: Math.floor(combatCircleRadius) - 10
          }}
        >
          {position === 'attack' ? combatAtk.current : combatDef.current}
        </div>
        {position === 'attack' ? (
          <AttackIcon
            className="absolute z-[1]"
            style={{ left: -combatCircleRadius / 2.6 }}
            size={combatCircleRadius * 1.8}
          />
        ) : (
          <ShieldIcon
            className="absolute z-[1]"
            style={{ left: -combatCircleRadius / 2 }}
            size={combatCircleRadius * 2}
          />
        )}
      </div>
      <div
        id="off-attack-defense"
        className="flex items-end relative"
        style={{ marginLeft: -combatCircleRadius / 8 }}
      >
        <div
          className="flex items-center justify-center overflow-hidden relative rounded-full text-white z-[2]"
          style={{
            width: combatCircleRadius / 2,
            height: combatCircleRadius / 2,
            fontSize: Math.floor(combatCircleRadius / 2) - 10,
            marginBottom: combatCircleRadius / 4
          }}
        >
          {position === 'attack' ? combatDef.current : combatDef.current}
        </div>
        {position === 'attack' ? (
          <ShieldIcon
            className="absolute z-[1]"
            style={{
              left: -combatCircleRadius / 2 / 2.6
            }}
            size={(combatCircleRadius / 2) * 1.8}
          />
        ) : (
          <AttackIcon
            className="absolute z-[1]"
            style={{
              left: -combatCircleRadius / 2 / 2
            }}
            size={(combatCircleRadius / 2) * 2}
          />
        )}
      </div>
    </>
  );
};

export default CombatStats;
