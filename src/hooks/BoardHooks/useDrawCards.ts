import { get, ref, update } from '@firebase/database';
import { useCallback } from 'react';
import { rtdb } from '@firebaseUiConfig';
import { DuelingCard } from '@shared/cardTypes';
import { useBoardContext } from '~/context/BoardContext';
import { useGameContext } from '~/context/GameContext';

export default function useHandleDrawFromDeck() {
  const { localBoard, setLocalBoard } = useBoardContext();
  const {
    roomId,
    localPlayer: { data: localPlayer }
  } = useGameContext();

  return useCallback(
    async (fromDeck: 'foundation' | 'main') => {
      if (!roomId) return;

      const isPlayer1 = localPlayer === 'player1';
      const playerBoardKey = isPlayer1 ? 'p1' : 'p2';
      const mainDeckKey = `${playerBoardKey}MainDeck`;
      const foundationDeckKey = `${playerBoardKey}FoundationDeck`;
      const handKey = `${playerBoardKey}Hand`;

      const deckKey = fromDeck === 'main' ? mainDeckKey : foundationDeckKey;

      try {
        const deckRef = ref(rtdb, `board/${roomId}/${deckKey}`);
        const handRef = ref(rtdb, `board/${roomId}/${handKey}`);

        const deckSnapshot = await get(deckRef);
        const handSnapshot = await get(handRef);

        if (deckSnapshot.exists() && handSnapshot.exists()) {
          const deck: DuelingCard[] = deckSnapshot.val();
          const hand: DuelingCard[] = handSnapshot.val();

          const cardsToDraw = fromDeck === 'main' ? 7 - hand.length : 1;
          const drawnCards = deck.slice(0, cardsToDraw);
          const remainingDeck = deck.slice(cardsToDraw);

          const updatedHand = [...hand, ...drawnCards];

          const updates = {
            [`board/${roomId}/${deckKey}`]: remainingDeck,
            [`board/${roomId}/${handKey}`]: updatedHand
          };

          await update(ref(rtdb), updates);

          // Update local state for immediate UI feedback
          setLocalBoard(prevState => ({
            ...prevState,
            [deckKey]: remainingDeck,
            [handKey]: updatedHand
          }));

          // advanceBattleStage();
        }
      } catch (error) {
        console.error('Error drawing cards from deck:', error);
      }
    },
    [localPlayer, roomId, setLocalBoard]
  );
}
