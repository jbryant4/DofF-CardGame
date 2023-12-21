import DuelingCard from '~/constants/DuelingCard';
import { useBoardContext } from '~/context/BoardContext';
import { useGameContext } from '~/context/GameContext';
import { ModalCard } from '~/context/ModalContext';

const defaultData = {
  canAttack: false,
  canAttackPlayer: false,
  canFlip: false,
  canSwitch: false,
  cardsToAttack: [],
  hasDetailsToShow: false,
  showActions: false
};

export default function useGetBattleDetails(card: ModalCard | null) {
  const { battleStage, battleTurn, localPlayer } = useGameContext();
  const { enemyBoard } = useBoardContext();

  if (!card) return defaultData;

  const isLocalTurn = localPlayer === battleTurn;
  const isLocalCard = !card?.isEnemy ?? false;
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
      cardsToAttack.every(c => c === null) && battleStage === 'duel';
  }

  const canAttack =
    isCombatCard &&
    battleStage === 'duel' &&
    !cardsToAttack.every(c => c === null) &&
    card.position === 'attack';

  return {
    canAttack,
    canAttackPlayer,
    canFlip: !card.faceUp && battleStage === 'plan',
    canSwitch,
    cardsToAttack,
    hasDetailsToShow: Boolean(card.effectText),
    showActions
  };
}
