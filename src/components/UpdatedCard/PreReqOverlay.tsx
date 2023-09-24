import classNames from 'classnames';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import AnimatedBackGround from '@/UpdatedCard/AnimatedBackGround';
import { PreReq } from '~/models/Card';
import getIconsToUse from '~/utils/getIconsToUse';
import Chain from './Chain';

type OwnProps = {
  activePreReqs?: PreReq[];
  width: number;
  left: number;
  preReqs: PreReq[];
  unlocked: boolean;
  setUnlocked: Dispatch<SetStateAction<boolean>>;
};

const PreReqOverlay = ({
  activePreReqs,
  width,
  left,
  preReqs,
  unlocked,
  setUnlocked
}: OwnProps) => {
  const svgSquareDimensions = width / 3;
  const [startBurn, setBurn] = useState(false);
  const { IconOne, IconTwo, IconThree, IconFour, IconFive } = getIconsToUse(
    preReqs,
    width
  );

  useEffect(() => {
    if (!unlocked) {
      setBurn(false);

      return; // return should be here to stop execution when not unlocked
    }

    const timeoutId = setTimeout(() => {
      setBurn(true);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [unlocked]);

  useEffect(() => {
    const allPreReqsMet = preReqs.every(prerequisite =>
      activePreReqs?.includes(prerequisite)
    );

    if (allPreReqsMet) {
      setUnlocked(true);
    }
  }, [preReqs, activePreReqs, setUnlocked]);

  return (
    <div
      className={classNames('absolute burn-bar h-3/5 overflow-hidden top-0', {
        burn: startBurn
      })}
      style={{ width, left }}
    >
      <div
        className={classNames(
          'grid grid-cols-3 h-full left-0 relative top-0 w-full',
          { 'animate-fade': startBurn }
        )}
      >
        <AnimatedBackGround />
        <Chain width={width} unlocked={unlocked} />
        <Chain width={width} clockWise unlocked={unlocked} />
        <div className="flex items-center z-[3]">
          {IconThree && (
            <div
              className={classNames(
                'duration-[1s] flex items-center justify-center rounded-full transition-all',
                { 'bg-red-500/70': activePreReqs?.includes(preReqs[2]) },
                { 'bg-black/20': !activePreReqs?.includes(preReqs[2]) }
              )}
              style={{
                width: svgSquareDimensions,
                height: svgSquareDimensions
              }}
            >
              {IconThree}
            </div>
          )}
        </div>
        <div className="grid grid-rows-2 z-[3]">
          <div>
            {IconOne && (
              <div
                className={classNames(
                  'duration-[1s] flex items-center justify-center rounded-full transition-all',
                  { 'bg-red-500/70': activePreReqs?.includes(preReqs[0]) },
                  { 'bg-black/20': !activePreReqs?.includes(preReqs[0]) }
                )}
                style={{
                  width: svgSquareDimensions,
                  height: svgSquareDimensions
                }}
              >
                {IconOne}
              </div>
            )}
          </div>
          <div className="flex items-end">
            {IconTwo && (
              <div
                className={classNames(
                  'duration-[1s] flex items-center justify-center rounded-full transition-all',
                  { 'bg-red-500/70': activePreReqs?.includes(preReqs[1]) },

                  { 'bg-black/20': !activePreReqs?.includes(preReqs[1]) }
                )}
                style={{
                  width: svgSquareDimensions,
                  height: svgSquareDimensions
                }}
              >
                {IconTwo}
              </div>
            )}
          </div>
        </div>
        <div
          className={classNames(
            'flex flex-col z-[3]',
            { 'justify-center': preReqs.length !== 5 },
            { 'justify-around': preReqs.length === 5 }
          )}
        >
          {IconFour && (
            <div
              className={classNames(
                'duration-[1s] flex items-center justify-center rounded-full transition-all',
                { 'bg-red-500/70': activePreReqs?.includes(preReqs[3]) },
                { 'bg-black/20': !activePreReqs?.includes(preReqs[3]) }
              )}
              style={{
                width: svgSquareDimensions,
                height: svgSquareDimensions
              }}
            >
              {IconFour}
            </div>
          )}
          {IconFive && (
            <div
              className={classNames(
                'duration-[1s] flex items-center justify-center rounded-full transition-all',
                { 'bg-red-500/70': activePreReqs?.includes(preReqs[4]) },
                { 'bg-black/20': !activePreReqs?.includes(preReqs[4]) }
              )}
              style={{
                width: svgSquareDimensions,
                height: svgSquareDimensions
              }}
            >
              {IconFive}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreReqOverlay;
