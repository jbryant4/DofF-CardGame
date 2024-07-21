import { useCallback } from 'react';
import { DuelingCard } from '@shared/cardTypes';
import { PlayerField } from '@shared/gameTypes';

const useGetIsCardSlotsFull = (localBoard: PlayerField) => {
  const getIsBoardSlotFull = useCallback(
    (card: DuelingCard) => {
      switch (card.type) {
        case 'resource':
          return Object.values(localBoard.resources).every(c => Boolean(c));

        case 'foundation':
          return Object.values(localBoard.foundations).every(c => Boolean(c));

        case 'army':
          return Object.values(localBoard.army).every(c => Boolean(c));

        case 'champion':
          return Object.values(localBoard.champions).every(c => Boolean(c));

        default:
          return false;
      }
    },
    [
      localBoard.army,
      localBoard.champions,
      localBoard.foundations,
      localBoard.resources
    ]
  );

  return { getIsBoardSlotFull };
};

export default useGetIsCardSlotsFull;
