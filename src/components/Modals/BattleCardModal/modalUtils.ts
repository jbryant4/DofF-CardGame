import { CardType } from '~/models/Card';

export function getBoardKey(cardType: Omit<CardType, ''>): string {
  return cardType === 'army' ? `${cardType}` : `${cardType}s`;
}
