import { update, ref } from 'firebase/database';
import { useCallback } from 'react';
import { getBoardKey } from '@/Modals/BattleCardModal/modalUtils';
import { rtdb } from '@firebaseUiConfig';
import { DuelingCard } from '@shared/cardTypes';
import { useBoardContext } from '~/context/BoardContext';
import { useGameContext } from '~/context/GameContext';

export default function useHandleFlipCard(card: DuelingCard | null) {
  const { localBoard, setLocalBoard } = useBoardContext();
  const {
    roomId,
    localPlayer: { data: localPlayer }
  } = useGameContext();

  return useCallback(async () => {
    // Check if card is null or roomId is not available
    if (!card || !roomId) return;

    // Calculate the board key
    const boardKey = getBoardKey(card.type);

    // Update the board
    const newCards = Object.values(localBoard[boardKey]).map(
      (boardCard: DuelingCard | null) =>
        boardCard && boardCard.id === card.id
          ? { ...boardCard, faceUp: true }
          : boardCard
    );

    const isPlayer1 = localPlayer === 'player1';
    const playerBoardKey = isPlayer1 ? 'p1' : 'p2';
    const updates = {
      [`board/${roomId}/${playerBoardKey}${boardKey}`]: newCards
    };

    try {
      await update(ref(rtdb), updates);

      // Update local state for immediate UI feedback
      setLocalBoard(prevState => ({
        ...prevState,
        [boardKey]: newCards
      }));
    } catch (error) {
      console.error('Error updating Firebase in flip card function:', error);
    }
  }, [card, roomId, localBoard, localPlayer, setLocalBoard]);
}
