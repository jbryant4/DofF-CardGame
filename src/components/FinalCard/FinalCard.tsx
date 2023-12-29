import cx from 'classnames';
import { useEffect, useState } from 'react';
import DuelingCard from '~/constants/DuelingCard';
import Hex from '~/icons/Hex';
import { PreReq } from '~/models/Card';
import CardBorders from './CardBorders';
import { getHexIconKeys, getBorderToUse } from './cardUtils';
import CombatStats from './CombatStats';
import PreReqOverlay from './PreReqOverlay';
import useGetCardDimensions from './useGetCardDimensions';

type OwnProps = {
  card: DuelingCard;
  width?: number;
  activePreReqs?: PreReq[];
  inHand?: boolean;
  forceFaceUp?: boolean;
};

// If it comes from any of the contexts wrapping the game it needs to be passed in as a prop
const FinalCard = ({
  card,
  forceFaceUp = false,
  width = 225,
  activePreReqs = [],
  inHand = false
}: OwnProps) => {
  const {
    title,
    preReqs,
    effectText,
    foundation,
    hp,
    def,
    atk,
    blankUrl,
    position,
    faceUp
  } = card;
  const hexIconKeys = getHexIconKeys(card);
  const showPreReqOverlay = preReqs && preReqs.length > 0 && inHand;
  const [unlocked, setUnlocked] = useState(false);

  const {
    borderThickness,
    combatCircleRadius,
    topIconTop,
    bottomIconTop,
    titleHeight,
    cardHeight,
    innerWidth,
    combatHeight,
    overlayHeight
  } = useGetCardDimensions(width);

  //once we have effect syymbols add to this check as well
  const showStatOverlay = Boolean(atk && def && hp);
  const hasBattleStats =
    atk !== undefined && def !== undefined && hp !== undefined;

  const borderToUse =
    foundation && foundation.length > 0
      ? getBorderToUse(unlocked, foundation[0])
      : 'bg-black';

  useEffect(() => {
    if (preReqs && preReqs.length > 0) return;
    setUnlocked(true);
  }, [preReqs]);

  return (
    <div className="card-container">
      <div
        id="card"
        className={cx('card relative', {
          'card-flip': !(faceUp || forceFaceUp)
        })}
        style={{
          width: width,
          height: width * (4 / 3)
        }}
      >
        <div className="card-face flex flex-col h-fit">
          {hexIconKeys && (
            <div
              className="absolute flex flex-col w-fit"
              style={{
                left: borderThickness / 2,
                top: topIconTop,
                zIndex: inHand ? 5 : 2
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
                style={{ marginTop: bottomIconTop }}
                className="self-start"
                foundation={foundation}
                canPlace={unlocked}
              />
            </div>
          )}

          <div className="flex flex-col overflow-hidden relative w-fit">
            <img
              alt="card image"
              src={blankUrl}
              className="object-cover"
              style={{
                width: width,
                height: (width * 4) / 3
              }}
            />
            <CardBorders
              borderThickness={borderThickness}
              innerCardWidth={innerWidth}
              borderToUse={borderToUse}
              isPlaceable={unlocked}
              sideHeight={cardHeight}
            />

            {showPreReqOverlay && (
              <PreReqOverlay
                activePreReqs={activePreReqs}
                width={innerWidth}
                left={borderThickness}
                preReqs={preReqs}
                unlocked={false}
                setUnlocked={setUnlocked}
                height={overlayHeight}
              />
            )}

            <div
              className="absolute flex flex-col"
              style={{
                width: innerWidth,
                height: combatHeight + titleHeight,
                left: borderThickness,
                bottom: borderThickness
              }}
            >
              <div
                id="title"
                className={`${borderToUse} flex items-center truncate  text-white w-full justify-center`}
                style={{
                  height: titleHeight,
                  paddingRight: borderThickness,
                  paddingLeft: borderThickness,
                  fontSize: width * 0.25 * 0.4 - 4
                }}
              >
                {title}
              </div>
              {showStatOverlay && (
                <div className="bg-gray-500/60 flex flex-grow overflow-y-hidden">
                  {hasBattleStats && (
                    <CombatStats
                      combatCircleRadius={combatCircleRadius}
                      atk={atk}
                      hp={hp}
                      def={def}
                      position={position}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="card-back card-face">
          <img
            width={width}
            className="h-full object-cover"
            alt="card-back"
            src="/card-back.png"
          />
        </div>
      </div>
    </div>
  );
};

export default FinalCard;
