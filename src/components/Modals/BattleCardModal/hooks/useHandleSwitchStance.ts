import { useCallback } from 'react';
import { getBoardKey } from '@/Modals/BattleCardModal/modalUtils';

import { useBoardContext } from '~/context/BoardContext';
import { useGameContext } from '~/context/GameContext';
import { useSocket } from '~/context/SocketContext';
import { DuelingCard } from '~/contracts/card';
import { BoardMessages } from '../../../../../server/boardHandlers/boardHandlers';

export default function useHandleSwitchStance(card: DuelingCard | null) {
  const socket = useSocket();
  const { localBoard, setPlayerTwoBoard, setPlayerOneBoard } =
    useBoardContext();
  const { roomId, localPlayer } = useGameContext();

  const handleSwitchStance = useCallback(() => {
    // Check if card is null
    if (!card) return;
    const isInAttack = card.position === 'attack';

    // Check if socket is available
    if (socket) {
      socket.emit(
        BoardMessages.Switch,
        roomId,
        localPlayer,
        card.id,
        isInAttack,
        card.type === 'champion'
      );
    } else {
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
    }
  }, [
    card,
    localPlayer,
    setPlayerOneBoard,
    setPlayerTwoBoard,
    socket,
    roomId,
    localBoard
  ]);

  return handleSwitchStance;
}
