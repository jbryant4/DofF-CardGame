import DuelingCard from '~/constants/DuelingCard';
import devDuelingCards from '../../../server/utils/devDuelingCards';

export const makeForgeDeck = (
  cardIds: string[]
): {
  army: DuelingCard[];
  champion: DuelingCard[];
  foundation: DuelingCard[];
  resource: DuelingCard[];
} => {
  const deck = devDuelingCards.filter(card => cardIds.includes(card.id));

  return {
    army: deck.filter(card => card.type === 'army'),
    champion: deck.filter(card => card.type === 'champion'),
    foundation: deck.filter(card => card.type === 'foundation'),
    resource: deck.filter(card => card.type === 'resource')
  };
};
