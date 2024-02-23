import { useMemo } from 'react';
import { useBoardContext } from '~/context/BoardContext';
import { useGameContext } from '~/context/GameContext';
import { DuelingCard } from '~/contracts/card';

const defaultData = {
  canAttack: false,
  canAttackPlayer: false,
  canFlip: false,
  canSwitch: false,
  cardsToAttack: [],
  hasDetailsToShow: false,
  showActions: false
};

export default function useGetBattleDetails(
  card: DuelingCard | null,
  isEnemy: boolean
) {
  const { battleStage, battleTurn, localPlayer } = useGameContext();
  const { enemyBoard, directHitThisRound, attackedThisRound } =
    useBoardContext();

  return useMemo(() => {
    if (!card) return defaultData;

    const isLocalTurn = localPlayer === battleTurn;
    const isLocalCard = !isEnemy;
    const showActions = isLocalCard && isLocalTurn;
    const isCombatCard = card.type === 'army' || card.type === 'champion';
    const canSwitch = battleStage === 'plan' && isCombatCard;

    let cardsToAttack: (DuelingCard | null)[] = [];
    let canAttackPlayer = false;

    if (card.type === 'army') {
      cardsToAttack = enemyBoard.army;
    }

    if (card.type === 'champion') {
      cardsToAttack = enemyBoard.champions;
      canAttackPlayer =
        cardsToAttack.every(c => c === null) &&
        battleStage === 'duel' &&
        !directHitThisRound;
    }

    const hasAlreadyAttacked = attackedThisRound.includes(card.id);
    const canAttack =
      isCombatCard &&
      battleStage === 'duel' &&
      !cardsToAttack.every(c => c === null) &&
      card.position === 'attack' &&
      !hasAlreadyAttacked;

    return {
      canAttack,
      canAttackPlayer,
      canFlip: !card.faceUp && battleStage === 'plan',
      canSwitch,
      cardsToAttack,
      hasDetailsToShow: Boolean(card.effectText),
      showActions
    };
  }, [
    card,
    localPlayer,
    battleTurn,
    isEnemy,
    battleStage,
    attackedThisRound,
    enemyBoard.army,
    enemyBoard.champions,
    directHitThisRound
  ]);
}
