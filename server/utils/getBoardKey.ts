import { CardType } from '~/contracts/card';

export function getBoardKey(cardType: CardType): string {
  return cardType === 'army' ? `${cardType}` : `${cardType}s`;
}
