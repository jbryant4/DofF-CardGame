import { ref, update } from '@firebase/database';
import { useCallback } from 'react';
import { rtdb } from '@firebaseUiConfig';
import { DuelingCard } from '@shared/cardTypes';
import { PlaceCardFunction, useBoardContext } from '~/context/BoardContext';
import { useGameContext } from '~/context/GameContext';

export default function usePlaceCard() {
  const { localBoard, setLocalBoard } = useBoardContext();
  const {
    roomId,
    localPlayer: { data: localPlayer }
  } = useGameContext();

  const findEmptySlot = (
    boardSection: Record<string, DuelingCard | 'emptySlot'>
  ): string | null => {
    return (
      Object.keys(boardSection).find(slot => boardSection[slot] === null) ||
      null
    );
  };

  const place: PlaceCardFunction = useCallback(
    async (card: DuelingCard) => {
      if (!roomId) return;

      const isPlayer1 = localPlayer === 'player1';
      const boardSectionKey = isPlayer1 ? 'p1' : 'p2';
      const handKey = `${boardSectionKey}Hand`;
      const updatedHand = localBoard.hand.filter(
        handCard => handCard.id !== card.id
      );

      let sectionKey = '';
      let slotKey: string | null = null;

      switch (card.type) {
        case 'resource':
          slotKey = findEmptySlot(localBoard.resources);
          sectionKey = 'resources';
          break;

        case 'foundation':
          slotKey = findEmptySlot(localBoard.foundations);
          sectionKey = 'foundations';
          break;

        case 'army':
          slotKey = findEmptySlot(localBoard.army);
          sectionKey = 'army';
          break;

        case 'champion':
          slotKey = findEmptySlot(localBoard.champions);
          sectionKey = 'champions';
          break;

        default:
          break;
      }

      if (sectionKey && slotKey != null) {
        const updates = {
          [`board/${roomId}/${boardSectionKey}${sectionKey}/${slotKey}`]: card,
          [`board/${roomId}/${handKey}`]: updatedHand
        };

        await update(ref(rtdb), updates);

        // Update local state for immediate UI feedback
        setLocalBoard(prevBoard => ({
          ...prevBoard,
          [sectionKey]: {
            ...(prevBoard[sectionKey as keyof typeof prevBoard] as Record<
              string,
              DuelingCard | null
            >),
            [slotKey as string]: card
          },
          hand: updatedHand
        }));
      } else {
        console.error('No available slot found for placing the card.');
      }
    },
    [
      localBoard.army,
      localBoard.champions,
      localBoard.foundations,
      localBoard.hand,
      localBoard.resources,
      localPlayer,
      roomId,
      setLocalBoard
    ]
  );

  return place;
}
