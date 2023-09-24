import { useCallback } from 'react';
import DuelingCard from '~/constants/DuelingCard';
import { BoardContextType } from '~/context/BoardContext';
import { Players } from '~/context/GameContext';

type OwnProps = Pick<BoardContextType, 'playerOneBoard' | 'playerTwoBoard'> & {
  localPlayer: Players;
};

const useGetIsCardSlotsFull = ({
  playerOneBoard,
  playerTwoBoard,
  localPlayer
}: OwnProps) => {
  const getIsBoardSlotFull = useCallback(
    (card: DuelingCard) => {
      const boardToUse =
        localPlayer === 'playerOne' ? playerOneBoard : playerTwoBoard;

      switch (card.type) {
        case 'resource':
          return boardToUse.resources.every(c => Boolean(c));

        case 'foundation':
          return boardToUse.foundations.every(c => Boolean(c));

        case 'army':
          return boardToUse.army.every(c => Boolean(c));

        case 'champion':
          return boardToUse.champions.every(c => Boolean(c));

        default:
          return false;
      }
    },
    [localPlayer, playerOneBoard, playerTwoBoard]
  );

  return { getIsBoardSlotFull };
};

export default useGetIsCardSlotsFull;
