import { Dispatch, Fragment, SetStateAction } from 'react';
import { Overlay } from '@/DuelOfFates/Battle/Overlays/Overlays';
import { useBoardContext } from '~/context/BoardContext';
import { useDimensionsContext } from '~/context/DimensionsContext';

type OwnProps = { show: boolean; setShow: Dispatch<SetStateAction<Overlay>> };

export default function EnemyHand({ show, setShow }: OwnProps) {
  const {
    enemyBoard: { hand }
  } = useBoardContext();
  const { cardWidth, cardHeight } = useDimensionsContext();
  const numberofCards = hand.length;
  const numberArray = Array.from(
    { length: numberofCards },
    (_, index) => index + 1
  );

  return (
    <div
      className="-translate-x-1/2 absolute duration-300 flex left-1/2 transition-all z-[4]"
      style={{
        height: cardHeight,
        top: show ? -cardHeight / 2 : -cardHeight
      }}
    >
      {numberArray.map(num => (
        <Fragment key={`enemy-card-${num}`}>
          <img
            src="/card-back.png"
            alt="enemy-card"
            style={{ marginLeft: num === 1 ? 0 : -cardWidth / 2 }}
          />
        </Fragment>
      ))}
    </div>
  );
}
