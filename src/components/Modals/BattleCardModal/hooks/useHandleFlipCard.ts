import { useCallback } from 'react';
import { getBoardKey } from '@/Modals/BattleCardModal/modalUtils';
import { useBoardContext } from '~/context/BoardContext';
import { useGameContext } from '~/context/GameContext';
import { ModalCard } from '~/context/ModalContext';
import { useSocket } from '~/context/SocketContext';
import { CardType } from '~/models/Card';
import { BoardMessages } from '../../../../../server/boardHandlers/boardHandlers';

export default function useHandleFlipCard(card: ModalCard | null) {
  const socket = useSocket();
  const { localBoard, setPlayerTwoBoard, setPlayerOneBoard } =
    useBoardContext();
  const { roomId, localPlayer } = useGameContext();

  const handleCardFlip = useCallback(() => {
    // Check if card is null
    if (!card) return;

    // Check if socket is available
    if (socket) {
      socket.emit(BoardMessages.Flip, roomId, localPlayer, card.type, card.id);
    } else {
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

  return handleCardFlip;
}
