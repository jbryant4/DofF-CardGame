import classNames from 'classnames';
import { useEffect, useState } from 'react';
import CardBorders from '@/UpdatedCard/CardBorders';
import PreReqOverlay from '@/UpdatedCard/PreReqOverlay';
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
const UpdatedCard = ({ card, width = 255 }: OwnProps) => {
  const {
    title,
    preReqs,
    effectText,
    // foundation, // will be using for border color
    hp,
    def,
    atk,
    blankUrl
  } = card;
  const hexIconKeys = getHexIconKeys(card);
  const showPreReqOverlay = preReqs && preReqs.length > 0;
  const [combatHp, setHp] = useState(defaultCombatStat);
  const [combatDef, setDef] = useState(defaultCombatStat);
  const [combatAtk, setAtk] = useState(defaultCombatStat);
  const [placement, setPlacement] = useState<CardPlacement>('attacking');
  const [unlocked, setUnlocked] = useState(false);

  const { borderThickness, innerCardWidth, combatCircleRadius, imageHeight } =
    useGetCardDimensions(width);

  const showStatOverlay = Boolean((atk && def && hp) || effectText);
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
              stroke="blue"
              icon={hexIconKeys[0]}
              className="z-20"
            />
            <Hex
              size={width / 6}
              className="z-20"
              stroke="blue"
              icon={hexIconKeys[1]}
              style={{ marginTop: -(width * 0.25 * 0.06) }}
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
        />

        {showPreReqOverlay && (
          <PreReqOverlay
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
                <>
                  <div
                    id="attack-defense"
                    className="flex items-center relative"
                  >
                    <div
                      className="flex items-center justify-center overflow-hidden relative rounded-full text-white z-[2]"
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
                      className="flex items-center justify-center overflow-hidden relative rounded-full text-white z-[2]"
                      style={{
                        width: combatCircleRadius / 2,
                        height: combatCircleRadius / 2,
                        fontSize: Math.floor(combatCircleRadius / 2) - 10,
                        marginBottom: combatCircleRadius / 4
                      }}
                    >
                      {placement.includes('attack')
                        ? combatDef.current
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
                </>
              )}
              {effectText && (
                <div className="h-full overflow-y-auto pl-4 py-4 text-[10px] text-center lg:text-12">
                  {effectText}
                </div>
              )}
            </div>
            {hasBattleStats && (
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
            )}
          </div>
        )}
      </div>
      <div id="showcase-btn" className="hidden">
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
