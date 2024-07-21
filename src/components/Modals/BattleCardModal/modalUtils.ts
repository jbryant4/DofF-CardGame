import { CardType } from '@shared/cardTypes';
import { PlayerFieldKey } from '@shared/gameTypes';

export function getBoardKey(cardType: CardType): PlayerFieldKey {
  return cardType === 'army' ? `${cardType}` : `${cardType}s`;
}
