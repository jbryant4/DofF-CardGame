import classNames from 'classnames';
import { getIsEven } from '~/utils/getIsEven';

type OwnProps = {
  width: number;
  clockWise?: boolean;
  unlocked: boolean;
};

const Chain = ({ width, clockWise = false, unlocked }: OwnProps) => {
  const smallChains = width <= 200;
  const numberOfLinks = smallChains
    ? Math.floor(width / 10)
    : Math.floor(width / 20);
  const numberToOpenLinks =
    numberOfLinks % 2 === 0 ? numberOfLinks + 7 : numberOfLinks + 4;

  return (
    <div
      style={{ width }}
      className="absolute flex h-full items-center justify-center left-0 z-[2]"
    >
      <div
        className={classNames(
          'flex h-fit items-center w-auto',
          { 'rotate-[40deg]': clockWise },
          { '-rotate-[40deg]': !clockWise },
          { 'slide-off-clockwise': unlocked && clockWise },
          { 'slide-off-counter-clockwise': unlocked && !clockWise }
        )}
      >
        {Array.from({ length: numberToOpenLinks }).map((_, index) =>
          !smallChains ? (
            <div
              key={index}
              className={classNames(
                ' h-16 rounded-full w-28',
                {
                  'border-[4px] border-black border -solid ': !getIsEven(
                    index + 1
                  )
                },
                {
                  '-mx-8 bg-black h-8': getIsEven(index + 1)
                }
              )}
            />
          ) : (
            <div
              key={index}
              className={classNames(
                ' h-8 rounded-full w-[14px]',
                {
                  'border-[2px] border-black border-solid ': !getIsEven(
                    index + 1
                  )
                },
                {
                  '-mx-4 bg-black h-4': getIsEven(index + 1)
                }
              )}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Chain;
