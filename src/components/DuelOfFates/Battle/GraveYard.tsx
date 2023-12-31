import { Dispatch, SetStateAction } from 'react';
import FinalCard from '@/FinalCard';
import { useBoardContext } from '~/context/BoardContext';
import { useDimensionsContext } from '~/context/DimensionsContext';
import SkullIcon from '~/icons/SkullIcon';

type OwnProps = { show: boolean; setShow: Dispatch<SetStateAction<boolean>> };

const GraveYard = ({ show }: OwnProps) => {
  const { cardWidth, cardHeight } = useDimensionsContext();
  const {
    localBoard: { graveyard: localGraveYard },
    enemyBoard: { graveyard: enemyGraveYard }
  } = useBoardContext();

  return (
    <div
      className="-translate-y-1/2 absolute bg-gray-700 duration-300 flex flex-col gap-12 items-center left-0 p-24 top-1/2 transition-all z-[4]"
      style={{ left: show ? 0 : -(cardWidth + 48) }}
    >
      {enemyGraveYard.length > 0 ? (
        <FinalCard card={enemyGraveYard[enemyGraveYard.length - 1]} />
      ) : (
        <div
          style={{ width: cardWidth, height: cardHeight }}
          className="border border-solid flex items-center justify-center"
        >
          enemy dead
        </div>
      )}

      <SkullIcon width={cardWidth} />

      {localGraveYard.length > 0 ? (
        <FinalCard
          width={cardWidth}
          card={localGraveYard[localGraveYard.length - 1]}
        />
      ) : (
        <div
          style={{ width: cardWidth, height: cardHeight }}
          className="border border-solid flex items-center justify-center"
        >
          local dead
        </div>
      )}
    </div>
  );
};

export default GraveYard;
