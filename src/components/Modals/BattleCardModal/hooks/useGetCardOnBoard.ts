import { useMemo } from 'react';
import { CardType, DuelingCard } from '@shared/cardTypes';

import { useBoardContext } from '~/context/BoardContext';
import { ModalInfo } from '~/context/ModalContext';

function getBoardKey(cardType: CardType): string {
  return cardType === 'army' ? `${cardType}` : `${cardType}s`;
}

export default function useGetCardOnBoard(
  card: ModalInfo
): DuelingCard | 'emptySlot' {
  const { localBoard, enemyBoard } = useBoardContext();
  const boardToUse = card?.isEnemy ? enemyBoard : localBoard;

  return useMemo(() => {
    return card
      ? boardToUse[getBoardKey(card.type)].find(c => c.id === card.id)
      : 'emptySlot';
  }, [boardToUse, card]);
}
