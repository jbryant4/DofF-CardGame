import { CardType } from '@shared/cardTypes';

export function getBoardKey(cardType: CardType): string {
  return cardType === 'army' ? `${cardType}` : `${cardType}s`;
}
