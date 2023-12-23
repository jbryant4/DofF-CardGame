import { useMemo } from 'react';
import DuelingCard from '~/constants/DuelingCard';
import { useBoardContext } from '~/context/BoardContext';
import { ModalInfo } from '~/context/ModalContext';
import { CardType } from '~/models/Card';

function getBoardKey(cardType: Omit<CardType, ''>): string {
  return cardType === 'army' ? `${cardType}` : `${cardType}s`;
}

export default function useGetCardOnBoard(card: ModalInfo): DuelingCard | null {
  const { localBoard, enemyBoard } = useBoardContext();
  const boardToUse = card?.isEnemy ? enemyBoard : localBoard;

  return useMemo(() => {
    return card
      ? boardToUse[getBoardKey(card.type)].find(c => c.id === card.id)
      : null;
  }, [boardToUse, card]);
}
