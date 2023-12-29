import { useEffect, useState } from 'react';
import AttackIcon from '~/icons/AttackIcon';
import ShieldIcon from '~/icons/ShieldIcon';
import { getDefaultCombatStat } from './constants';

type OwnProps = {
  combatCircleRadius: number;
  atk: number;
  hp: number;
  def: number;
  position: 'attack' | 'defense';
};

const CombatStats = ({
  atk,
  def,
  hp,
  combatCircleRadius,
  position
}: OwnProps) => {
  const [combatHp, setHp] = useState(getDefaultCombatStat());
  const [combatDef, setDef] = useState(getDefaultCombatStat());
  const [combatAtk, setAtk] = useState(getDefaultCombatStat());

  //Set initial combat stat
  useEffect(() => {
    setHp(prevState => ({
      current: hp,
      max: prevState.max ? prevState.max : hp
    }));
    setAtk(prevState => ({
      current: atk,
      max: prevState.max ? prevState.max : atk
    }));
    setDef(prevState => ({
      current: def,
      max: prevState.max ? prevState.max : def
    }));
  }, [atk, def, hp]);

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

      {/*Health Circle*/}
      <div
        style={{
          width: combatCircleRadius,
          height: combatCircleRadius,
          marginLeft: -(combatCircleRadius / 3)
        }}
        className="bg-red-700/90 flex font-bold items-center justify-center mt-4 rounded-full text-24 text-black"
      >
        {combatHp.current}
      </div>
    </>
  );
};

export default CombatStats;
