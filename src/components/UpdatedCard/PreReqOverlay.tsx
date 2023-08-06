import classNames from 'classnames';
import { useEffect, useState } from 'react';
import AnimatedBackGround from '@/UpdatedCard/AnimatedBackGround';
import EarthFoundationIcon from '~/icons/EarthFoundationIcon';
import OneArmyIcon from '~/icons/OneArmyIcon';
import { PreReq } from '~/models/Card';
import getIconsToUse, { getIconToUse } from '~/utils/getIconsToUse';
import Chain from './Chain';

type OwnProps = {
  width: number;
  left: number;
  preReqs: PreReq[];
  unlocked: boolean;
};

const PreReqOverlay = ({ width, left, preReqs, unlocked }: OwnProps) => {
  const totalCount = preReqs.length;
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
                { 'bg-red-500/70': unlocked },
                { 'bg-black/20': !unlocked }
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
                  { 'bg-red-500/70': unlocked },
                  { 'bg-black/20': !unlocked }
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
                  { 'bg-red-500/70': unlocked },
                  { 'bg-black/20': !unlocked }
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
                { 'bg-red-500/70': unlocked },
                { 'bg-black/20': !unlocked }
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
                { 'bg-red-500/70': unlocked },
                { 'bg-black/20': !unlocked }
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
