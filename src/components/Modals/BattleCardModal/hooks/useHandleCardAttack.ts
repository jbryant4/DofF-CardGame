import { ref, update, get } from '@firebase/database';
import { useCallback } from 'react';
import { rtdb } from '@firebaseUiConfig';
import { DuelingCard } from '@shared/cardTypes';
import { useBoardContext } from '~/context/BoardContext';
import { useGameContext } from '~/context/GameContext';

export default function useHandleCardAttack() {
  const {
    localPlayer: { data: localPlayer },
    roomId
  } = useGameContext();
  const { localBoard, enemyBoard, setLocalBoard, setEnemyBoard } =
    useBoardContext();

  const handleAttack = useCallback(
    async (
      attackingCardId: string,
      attackedCardId: string,
      champAttack: boolean
    ) => {
      if (!roomId) return;

      const localCardType = champAttack ? 'champions' : 'army';
      const enemyCardType = champAttack ? 'champions' : 'army';
      const playerPrefix = localPlayer === 'player1' ? 'p1' : 'p2';
      const enemyPrefix = localPlayer === 'player1' ? 'p2' : 'p1';

      const attackingCardRef = ref(
        rtdb,
        `board/${roomId}/${playerPrefix}${localCardType}/${attackingCardId}`
      );
      const attackedCardRef = ref(
        rtdb,
        `board/${roomId}/${enemyPrefix}${enemyCardType}/${attackedCardId}`
      );

      try {
        const attackingCardSnapshot = await get(attackingCardRef);
        const attackedCardSnapshot = await get(attackedCardRef);

        const attackingCard: DuelingCard | null = attackingCardSnapshot.exists()
          ? attackingCardSnapshot.val()
          : null;
        const attackedCard: DuelingCard | null = attackedCardSnapshot.exists()
          ? attackedCardSnapshot.val()
          : null;

        if (!attackingCard || !attackedCard) return;

        let damage = 0;

        if (attackedCard.position === 'attack') {
          damage = attackingCard.atk - attackedCard.atk;
        } else if (attackedCard.position === 'defense') {
          damage = attackingCard.atk - attackedCard.def;
        }

        if (attackedCard.position === 'attack') {
          damage = attackingCard.atk - attackedCard.atk;
          if (damage < 0) {
            attackingCard.hp -= 1;
            attackedCard.hp -= 1;
          } else if (damage === 0) {
            attackedCard.hp -= 1;
          } else {
            attackedCard.hp -= damage;
          }
        } else if (attackedCard.position === 'defense') {
          damage = attackingCard.atk - attackedCard.def;
          if (damage <= 0) {
            attackingCard.hp -= 1;
            attackedCard.hp -= 1;
          } else {
            attackedCard.hp -= damage;
          }
        }

        const updates = {
          [`board/${roomId}/${playerPrefix}${localCardType}/${attackingCardId}`]:
            attackingCard,
          [`board/${roomId}/${enemyPrefix}${enemyCardType}/${attackedCardId}`]:
            attackedCard
        };

        await update(ref(rtdb), updates);
      } catch (error) {
        console.error('Error handling card attack:', error);
      }
    },
    [roomId, localPlayer]
  );

  return handleAttack;
}
