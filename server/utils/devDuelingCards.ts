import { devCards } from '../../src/constants/developmentCards';
import DuelingCard, { desiredKeys } from '../../src/constants/DuelingCard';

const devDuelingCards = devCards.map(card => {
  const newCard = desiredKeys.reduce<DuelingCard>((result, key) => {
    if (key in card) {
      // @ts-ignore
      result[key] = card[key];
    }

    return result;
  }, {} as DuelingCard);

  newCard.id = card._id; // Assign new ID format

  // Set default values for faceUp and position if they aren't provided
  newCard.faceUp = true;
  newCard.position = 'attack';

  return newCard;
});

export default devDuelingCards;
