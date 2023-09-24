import classNames from 'classnames';
import { useEffect, useState } from 'react';
import foundationCard from '@/DuelOfFates/Battle/FoundationCard';
import CardBorders, { getBorderToUse } from '@/UpdatedCard/CardBorders';
import CombatStats from '@/UpdatedCard/CombatStats';
import HealthOrbs from '@/UpdatedCard/HealthOrbs';
import PreReqOverlay from '@/UpdatedCard/PreReqOverlay';
import UpdatedCard from '@/UpdatedCard/UpdatedCard';
import CardType from '~/constants/CardType';
import DuelingCard from '~/constants/DuelingCard';
import AttackIcon from '~/icons/AttackIcon';
import Hex from '~/icons/Hex';
import ShieldIcon from '~/icons/ShieldIcon';
import { PreReq } from '~/models/Card';
import useGetCardDimensions from './useGetCardDimensions';

function getHexIconKeys(card: CardType | DuelingCard) {
  const { primaryClass, secondaryClass, class: traits } = card;
  switch (card.type) {
    case 'army':
      return ['army'];
    case 'foundation':
      return card.foundation;
    case 'champion':
      return [
        primaryClass ? primaryClass : traits ? traits[0] : undefined,
        secondaryClass ? secondaryClass : traits ? traits[1] : undefined
      ];
    default:
      return ['resource'];
  }
}

type OwnProps = {
  card: DuelingCard;
  width?: number;
  activePreReqs?: PreReq[];
};

export type CombatStat = {
  max: number;
  current: number;
};

const defaultCombatStat: CombatStat = {
  max: 0,
  current: 0
};

// If it comes from any of the contexts wrapping the game it needs to be passed in as a prop
const BattleCard = ({ card, width = 255, activePreReqs = [] }: OwnProps) => {
  const {
    title,
    preReqs,
    effectText,
    foundation,
    hp,
    def,
    atk,
    blankUrl,
    position
  } = card;
  const hexIconKeys = getHexIconKeys(card);
  const showPreReqOverlay = preReqs && preReqs.length > 0;
  const [combatHp, setHp] = useState(defaultCombatStat);
  const [combatDef, setDef] = useState(defaultCombatStat);
  const [combatAtk, setAtk] = useState(defaultCombatStat);
  const [unlocked, setUnlocked] = useState(false);

  const { borderThickness, innerCardWidth, combatCircleRadius, imageHeight } =
    useGetCardDimensions(width);

  useEffect(() => {
    if (preReqs && preReqs.length > 0) return;
    setUnlocked(true);
  }, [preReqs]);

  const showStatOverlay = Boolean((atk && def && hp) || effectText);
  const hasBattleStats = Boolean(atk && def && hp);

  const borderToUse =
    foundation && foundation.length > 0
      ? getBorderToUse(unlocked, foundation[0])
      : 'bg-black';

  //Set initial combat stat
  useEffect(() => {
    if (hp) {
      setHp({ current: hp, max: hp });
    }
    if (atk) {
      setAtk({ current: atk, max: atk });
    }
    if (def) {
      setDef({ current: def, max: def });
    }
  }, [atk, def, hasBattleStats, hp]);

  return (
    <div
      style={{
        width: `${width}px`
      }}
    >
      <div
        id="title"
        className={`${borderToUse} flex items-center overflow-ellipsis relative text-12 text-white w-full whitespace-nowrap lg:text-16`}
        style={{ height: width * 0.25 * 0.4, paddingLeft: width / 8 + 4 }}
      >
        {hexIconKeys && (
          <div
            className="absolute flex flex-col items-center w-fit"
            style={{
              left: -(width / 8 - borderThickness / 2),
              top: -(width * 0.25 * 0.3)
            }}
          >
            <Hex
              size={width * 0.25}
              icon={hexIconKeys[0]}
              canPlace={unlocked}
              foundation={foundation}
            />
            <Hex
              size={width / 6}
              icon={hexIconKeys[1]}
              style={{ marginTop: -(width * 0.25 * 0.06) }}
              foundation={foundation}
              canPlace={unlocked}
            />
          </div>
        )}
        {title}
      </div>

      <div className="overflow-hidden relative">
        <img
          alt="card image"
          src={blankUrl}
          className="object-cover"
          style={{
            width: width,
            height: imageHeight
          }}
        />
        <CardBorders
          borderThickness={borderThickness}
          showBottomBorder={!hasBattleStats}
          innerCardWidth={innerCardWidth}
          foundation={foundation && foundation[0]}
          isPlaceable={unlocked}
        />

        {showPreReqOverlay && (
          <PreReqOverlay
            activePreReqs={activePreReqs}
            width={innerCardWidth}
            left={borderThickness}
            preReqs={preReqs}
            unlocked={unlocked}
            setUnlocked={setUnlocked}
          />
        )}
        {showStatOverlay && (
          <div
            className="absolute bg-gray-500/90 bottom-0 flex flex-col h-2/5"
            style={{
              width: innerCardWidth,
              left: borderThickness
            }}
          >
            <div className="flex flex-grow overflow-y-hidden">
              {hasBattleStats && (
                <CombatStats
                  combatCircleRadius={combatCircleRadius}
                  combatAtk={combatAtk}
                  combatDef={combatDef}
                  position={position}
                />
              )}
              {effectText && (
                <div className="h-full overflow-y-auto pl-4 py-4 text-[10px] text-center lg:text-12">
                  {effectText}
                </div>
              )}
            </div>
            {hasBattleStats && <HealthOrbs combatHp={combatHp} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default BattleCard;
