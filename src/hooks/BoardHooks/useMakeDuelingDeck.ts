import { useCallback, useContext } from 'react';
import DuelingCard from '~/constants/DuelingCard';
import { desiredKeys } from '~/constants/DuelingCard';
import { CardContext } from '~/context/CardContext';

export const useMakeDuelingDeck = () => {
  const { cards } = useContext(CardContext);
  console.log('out out of return', cards.length);

  return useCallback(
    (cardIds: string[]): DuelingCard[] => {
      if (cards.length === 0) return [];
      // Use a Set for O(1) lookup times
      const idSet = new Set(cardIds);
      console.log(cards.length, idSet);

      // Filter the cards array directly and then map to desired structure
      return cards
        .filter(card => idSet.has(card._id))
        .map(card => {
          const newCard = desiredKeys.reduce<DuelingCard>((result, key) => {
            if (key in card) {
              // @ts-ignore
              result[key] = card[key];
            }

            return result;
          }, {} as DuelingCard);

          newCard.id = card._id; // Assign new ID format

          // Set default values for faceUp and position if they aren't provided
          newCard.faceUp = false;
          newCard.position = 'attack';

          return newCard;
        });
    },
    [cards]
  );
};
