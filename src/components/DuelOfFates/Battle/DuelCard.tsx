import { useDraggable } from '@dnd-kit/core';
import { useState } from 'react';
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
  if (location === 'graveyard') {
    console.log(duelingCard);
  }
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

  return <div>no layout was given </div>;
};

export default DuelCard;
