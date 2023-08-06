import classNames from 'classnames';
import { useEffect, useState } from 'react';
import CardBorders from '@/UpdatedCard/CardBorders';
import PreReqOverlay from '@/UpdatedCard/PreReqOverlay';
import CardType from '~/constants/CardType';
import AttackIcon from '~/icons/AttackIcon';
import Hex from '~/icons/Hex';
import ShieldIcon from '~/icons/ShieldIcon';
import useGetCardDimensions from './useGetCardDimensions';

type CardPlacement =
  | 'attacking'
  | 'defending'
  | 'down-defending'
  | 'down-attacking';

type OwnProps = {
  card: CardType;
  width?: number;
};

type CombatStat = {
  max: number;
  current: number;
};

const defaultCombatStat: CombatStat = {
  max: 0,
  current: 0
};
const UpdatedCard = ({ card, width = 200 }: OwnProps) => {
  const {
    title,
    preReqs,
    effectText,
    foundation,
    hp,
    def,
    atk,
    class: traits,
    blankUrl,
    type
  } = card;
  const [combatHp, setHp] = useState(defaultCombatStat);
  const [combatDef, setDef] = useState(defaultCombatStat);
  const [combatAtk, setAtk] = useState(defaultCombatStat);
  const [placement, setPlacement] = useState<CardPlacement>('attacking');
  const [unlocked, setUnlocked] = useState(false);

  const { borderThickness, innerCardWidth, combatCircleRadius, imageHeight } =
    useGetCardDimensions(width);

  const hasBattleStats = Boolean(atk && def && hp);
  const healthOrbs =
    combatHp.current > combatHp.max ? combatHp.current : combatHp.max;

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
        className="bg-black flex items-center overflow-ellipsis relative text-16 text-white w-full whitespace-nowrap"
        style={{ height: width * 0.25 * 0.4, paddingLeft: width / 8 + 4 }}
      >
        <div
          className="absolute flex flex-col items-center w-fit"
          style={{
            left: -(width / 8 - borderThickness / 2),
            top: -(width * 0.25 * 0.3)
          }}
        >
          <Hex
            size={width * 0.25}
            stroke="blue"
            icon={traits}
            className="z-20"
          />
          <Hex
            size={width / 6}
            className="z-20"
            stroke="blue"
            icon={traits}
            style={{ marginTop: -(width * 0.25 * 0.06) }}
          />
        </div>
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
          hasBattleStats
          innerCardWidth={innerCardWidth}
        />

        {preReqs && (
          <PreReqOverlay
            width={innerCardWidth}
            left={borderThickness}
            preReqs={preReqs}
            unlocked={unlocked}
          />
        )}
        {hasBattleStats && (
          <div
            className="absolute bg-gray-500/90 bottom-0 flex flex-col h-2/5"
            style={{
              width: innerCardWidth,
              left: borderThickness
            }}
          >
            <div className="flex flex-grow overflow-y-hidden">
              <div id="attack-defense" className="flex items-center relative">
                <div
                  className="bg-green-300 flex items-center justify-center overflow-hidden relative rounded-full z-[2]"
                  style={{
                    width: combatCircleRadius,
                    height: combatCircleRadius,
                    fontSize: Math.floor(combatCircleRadius) - 10
                  }}
                >
                  {placement.includes('attack')
                    ? combatAtk.current
                    : combatDef.current}
                </div>
                {placement.includes('attack') ? (
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
                  className="bg-green-300 flex items-center justify-center overflow-hidden relative rounded-full z-[2]"
                  style={{
                    width: combatCircleRadius / 2,
                    height: combatCircleRadius / 2,
                    fontSize: Math.floor(combatCircleRadius / 2) - 10,
                    marginBottom: combatCircleRadius / 4
                  }}
                >
                  {placement.includes('attack')
                    ? combatAtk.current
                    : combatDef.current}
                </div>
                {placement.includes('attack') ? (
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
              {effectText && (
                <div className="flex h-full items-center overflow-y-auto p-8 text-12">
                  {effectText}
                </div>
              )}
            </div>
            <div
              id="health"
              className="bg-black flex-shrink-0 pb-4 relative self-end w-full"
            >
              <div className="flex mx-auto w-fit">
                {Array.from({ length: healthOrbs }).map((_, index) => (
                  <div
                    key={index}
                    className={classNames(
                      'health-circle',
                      {
                        empty:
                          index <= combatHp.max && index >= combatHp.current
                      },
                      {
                        'bonus-health': index + 1 > combatHp.max
                      }
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div id="showcase-btn" className="">
        <div
          onClick={() =>
            setHp(prevStat => ({ ...prevStat, current: prevStat.current + 1 }))
          }
        >
          up
        </div>
        <div
          onClick={() =>
            setHp(prevStat => ({ ...prevStat, current: prevStat.current - 1 }))
          }
        >
          down
        </div>
        <div onClick={() => setPlacement('attacking')}>atk</div>
        <div onClick={() => setPlacement('defending')}>def</div>
        <div onClick={() => setUnlocked(prevState => !prevState)}>unlock</div>
      </div>
    </div>
  );
};

export default UpdatedCard;
