import cx from 'classnames';
import { useEffect, useState } from 'react';
import DuelingCard from '~/constants/DuelingCard';
import Hex from '~/icons/Hex';
import { PreReq } from '~/models/Card';
import CardBorders from './CardBorders';
import {
  getHexIconKeys,
  getBorderToUse,
  getBackGroundToUse
} from './cardUtils';
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
      : 'border-black';

  const backGroundToUse =
    foundation && foundation.length > 0
      ? getBackGroundToUse(unlocked, foundation[0])
      : 'bg-black';

  useEffect(() => {
    if (preReqs && preReqs.length > 0) return;
    setUnlocked(true);
  }, [preReqs]);

  return (
    <div className="card-container">
      <div
        id="card"
        className={cx(`border-solid ${borderToUse} card relative`, {
          'card-flip': !(faceUp || forceFaceUp)
        })}
        style={{
          width: width,
          height: cardHeight
        }}
      >
        <div
          className={`border-solid ${borderToUse} card-face flex flex-col rounded-sm h-fit`}
          style={{
            borderWidth: borderThickness
          }}
        >
          {hexIconKeys && (
            <div
              className="absolute flex flex-col w-fit"
              style={{
                left: -borderThickness / 3,
                top: -borderThickness / 3,
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

          <div className="overflow-hidden relative w-full">
            <img
              alt="card image"
              src={blankUrl}
              style={{
                width: width,
                height: cardHeight
              }}
              className=""
            />

            {showPreReqOverlay && (
              <PreReqOverlay
                activePreReqs={activePreReqs}
                width={innerWidth}
                preReqs={preReqs}
                unlocked={unlocked}
                setUnlocked={setUnlocked}
                height={overlayHeight}
              />
            )}

            <div
              id="bottom-cover"
              className="absolute bottom-0 flex flex-col w-full"
              style={{
                height: combatHeight + titleHeight
              }}
            >
              <div
                id="title"
                className={`${backGroundToUse} flex items-center truncate text-white w-full justify-center`}
                style={{
                  height: titleHeight,
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
            className="h-full object-cover rounded"
            alt="card-back"
            src="/card-back.png"
          />
        </div>
      </div>
    </div>
  );
};

export default FinalCard;
