import { DuelingCard } from '@shared/cardTypes';
import { devCards } from '~/constants/developmentCards';

const desiredKeys: (keyof DuelingCard)[] = [
  'blankUrl',
  'class',
  'effectText',
  'foundation',
  'primaryClass',
  'secondaryClass',
  'preReqs',
  'hp',
  'atk',
  'def',
  'title',
  'type',
  'id',
  'faceUp',
  'position'
];

const devDuelingCards = devCards.map(card => {
  const newCard = desiredKeys.reduce<DuelingCard>((result, key) => {
    if (key in card) {
      // @ts-ignore
      result[key] = card[key];
    }

    return result;
  }, {} as DuelingCard);

  // Set default values for faceUp and position if they aren't provided
  newCard.faceUp = true;
  newCard.position = 'attack';

  return newCard;
});

export default devDuelingCards;
