import classNames from 'classnames';
import { className } from 'postcss-selector-parser';
import { useState } from 'react';
import src from 'sift/src/index';
import { transform } from 'sucrase';
import DuelingCard from '~/constants/DuelingCard';

type OwnProps = {
  duelingCard: DuelingCard | null;
  location: string;
  index?: number;
  inStack?: boolean;
  layout: 'pile' | 'horizontal' | 'vertical' | 'hand';
  cardWidth: number;
};

const DuelCard = ({
  duelingCard,
  location,
  index = 0,
  inStack = false,
  layout,
  cardWidth
}: OwnProps) => {
  const cardHeight = cardWidth * (4 / 3);
  const [hover, setHover] = useState(false);
  const CardSkeleton = () => (
    <div
      className="border border-black border-solid flex items-center justify-center rounded-sm"
      style={{ width: cardWidth, height: cardHeight }}
    >
      {location} {index && index}
    </div>
  );

  if (!duelingCard) {
    return <CardSkeleton />;
  }

  if (layout === 'pile') {
    return (
      <div
        style={{
          marginTop: index !== 0 ? -cardHeight : 0
        }}
        className="flex items-center justify-center"
      >
        <img
          id={duelingCard.title}
          src={duelingCard.blankUrl}
          style={{
            width: cardWidth,
            height: cardHeight,
            transform: `translateX(${index * 2}px)`,
            zIndex: 10 - index
          }}
        />
      </div>
    );
  }

  if (layout === 'hand') {
    return (
      <div
        style={{
          left: `${index * (cardWidth / 2)}px`, // Position each card half its width to the right of the previous
          zIndex: hover ? 8 - index : 7 - index,
          top: 10
        }}
        className="absolute duration-[800ms] hover:-translate-y-[75%] transition-all"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img
          id={duelingCard.title}
          src={duelingCard.blankUrl}
          style={{
            width: cardWidth,
            height: cardHeight,
            backgroundColor: 'black'
          }}
        />
      </div>
    );
  }

  return <div>no layout was given </div>;
};

export default DuelCard;
