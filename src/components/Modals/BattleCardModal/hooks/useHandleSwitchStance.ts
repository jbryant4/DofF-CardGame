import { useCallback } from 'react';
import { getBoardKey } from '@/Modals/BattleCardModal/modalUtils';
import { DuelingCard } from '@shared/cardTypes';

import { useBoardContext } from '~/context/BoardContext';
import { useGameContext } from '~/context/GameContext';

export default function useHandleSwitchStance(card: DuelingCard | null) {
  const { localBoard, setPlayerTwoBoard, setPlayerOneBoard } =
    useBoardContext();
  const { roomId, localPlayer } = useGameContext();

  const handleSwitchStance = useCallback(() => {
    // Check if card is null
    if (!card) return;
    const isInAttack = card.position === 'attack';

    // Check if socket is available
    //TODO firebase functionality
    // Calculate the board key
    const boardKey = getBoardKey(card.type);

    // Update the board
    const newCards = localBoard[boardKey].map((boardCard: DuelingCard) =>
      boardCard && boardCard.id === card.id
        ? { ...boardCard, position: isInAttack ? 'defence' : 'attack' }
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

  return handleSwitchStance;
}
