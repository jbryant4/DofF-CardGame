import { useCallback } from 'react';
import { useBoardContext } from '~/context/BoardContext';
import { useGameContext } from '~/context/GameContext';

export default function useHandleCardAttack() {
  const { localPlayer, roomId } = useGameContext();
  const { localBoard, enemyBoard, setPlayerOneBoard, setPlayerTwoBoard } =
    useBoardContext();
  const updateEnemyBoard =
    localPlayer === 'playerOne' ? setPlayerTwoBoard : setPlayerOneBoard;
  const updateLocalBoard =
    localPlayer === 'playerOne' ? setPlayerOneBoard : setPlayerTwoBoard;

  const handleAttack = useCallback(
    (attackingCardId: string, attackedCardId: string, champAttack: boolean) => {
      const attackingCard =
        localBoard[champAttack ? 'champions' : 'army'].find(
          c => c?.id === attackingCardId
        ) ?? null;
      const attackedCard =
        enemyBoard[champAttack ? 'champions' : 'army'].find(
          c => c?.id === attackedCardId
        ) ?? null;
      //so no null nullish checks but the cards will be selected from the field so the type will be there
      if (!attackingCard || !attackedCard) return;

      //TODO firebase functionality

      let damage = 0;

      if (attackedCard.position === 'attack') {
        // @ts-ignore
        damage = attackingCard.atk - attackedCard.atk;
      } else if (attackedCard.position === 'defense') {
        // @ts-ignore
        damage = attackingCard.atk - attackedCard.def;
      }

      if (attackedCard.position === 'attack') {
        // @ts-ignore
        damage = attackingCard.atk - attackedCard.atk;
        if (damage < 0) {
          // @ts-ignore
          attackingCard.hp -= 1;
          // @ts-ignore
          attackedCard.hp -= 1;
        } else if (damage === 0) {
          // @ts-ignore
          attackedCard.hp -= 1;
        } else {
          // @ts-ignore
          attackedCard.hp -= damage;
        }
      } else if (attackedCard.position === 'defense') {
        // @ts-ignore
        damage = attackingCard.atk - attackedCard.def;
        if (damage <= 0) {
          // @ts-ignore
          attackingCard.hp -= 1;
          // @ts-ignore
          attackedCard.hp -= 1;
        } else {
          // @ts-ignore
          attackedCard.hp -= damage;
        }
      }

      // Update the cards in their respective positions
      const updatedLocalBoard = { ...localBoard };
      const updatedEnemyBoard = { ...enemyBoard };

      const localCardType = champAttack ? 'champions' : 'army';
      const enemyCardType = champAttack ? 'champions' : 'army';

      updatedLocalBoard[localCardType] = updatedLocalBoard[localCardType].map(
        card => (card?.id === attackingCardId ? attackingCard : card)
      );

      updatedEnemyBoard[enemyCardType] = updatedEnemyBoard[enemyCardType].map(
        card => (card?.id === attackedCardId ? attackedCard : card)
      );

      updateLocalBoard(updatedLocalBoard);
      updateEnemyBoard(updatedEnemyBoard);
    },
    [localBoard, enemyBoard, updateLocalBoard, updateEnemyBoard]
  );

  return handleAttack;
}
