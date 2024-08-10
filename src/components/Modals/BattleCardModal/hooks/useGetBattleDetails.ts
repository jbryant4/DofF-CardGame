import { useMemo } from 'react';
import { DuelingCard } from '@shared/cardTypes';
import { FighterSlotsType, isEmptySlot } from '@shared/gameTypes';
import { useBoardContext } from '~/context/BoardContext';
import { useGameContext } from '~/context/GameContext';

const defaultData = {
  canAttack: false,
  canAttackPlayer: false,
  canFlip: false,
  canSwitch: false,
  cardsToAttack: {
    slot1: 'emptySlot',
    slot2: 'emptySlot',
    slot3: 'emptySlot'
  },
  hasDetailsToShow: false,
  showActions: false
};

export default function useGetBattleDetails(
  card: DuelingCard | 'emptySlot',
  isEnemy: boolean
) {
  const {
    dynamicGameData: {
      data: { battleStage, battleTurn }
    },
    localPlayer: { data: localPlayer }
  } = useGameContext();
  const { enemyBoard, directHitThisRound, attackedThisRound } =
    useBoardContext();

  return useMemo(() => {
    if (card === 'emptySlot') return defaultData;

    const isLocalTurn = localPlayer === battleTurn;
    const isLocalCard = !isEnemy;
    const showActions = isLocalCard && isLocalTurn;
    const isCombatCard = card.type === 'army' || card.type === 'champion';
    const canSwitch = battleStage === 'plan' && isCombatCard;

    let cardsToAttack: FighterSlotsType = {
      slot1: 'emptySlot',
      slot2: 'emptySlot',
      slot3: 'emptySlot'
    };
    let canAttackPlayer = false;

    if (card.type === 'army') {
      cardsToAttack = enemyBoard.army;
    }

    if (card.type === 'champion') {
      cardsToAttack = enemyBoard.champions;
      canAttackPlayer =
        Object.values(cardsToAttack).every(isEmptySlot) &&
        battleStage === 'duel' &&
        !directHitThisRound;
    }

    const hasAlreadyAttacked = attackedThisRound.includes(card.id);
    const canAttack =
      isCombatCard &&
      battleStage === 'duel' &&
      !Object.values(cardsToAttack).every(isEmptySlot) &&
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
