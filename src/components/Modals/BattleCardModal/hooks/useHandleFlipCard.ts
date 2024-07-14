import { useCallback } from 'react';
import { getBoardKey } from '@/Modals/BattleCardModal/modalUtils';
import { DuelingCard } from '@shared/cardTypes';
import { useBoardContext } from '~/context/BoardContext';
import { useGameContext } from '~/context/GameContext';

export default function useHandleFlipCard(card: DuelingCard | null) {
  const { localBoard, setPlayerTwoBoard, setPlayerOneBoard } =
    useBoardContext();
  const { roomId, localPlayer } = useGameContext();

  const handleCardFlip = useCallback(() => {
    // Check if card is null
    if (!card) return;

    //TODO firebase functionality

    // Calculate the board key
    const boardKey = getBoardKey(card.type);

    // Update the board
    const newCards = localBoard[boardKey].map(boardCard =>
      boardCard && boardCard.id === card.id
        ? { ...boardCard, faceUp: true }
        : boardCard
    );

    if (localPlayer === 'playerOne') {
      setPlayerOneBoard(prevBoard => ({
        ...prevBoard,
        [boardKey]: newCards
      }));
    } else {
      setPlayerTwoBoard(prevBoard => ({
        ...prevBoard,
        [boardKey]: newCards
      }));
    }
  }, [card, localPlayer, setPlayerOneBoard, setPlayerTwoBoard, localBoard]);

  return handleCardFlip;
}
