import { useMemo } from 'react';
import { Filter } from '@/Forge/DeckEditor';
import DuelingCard from '~/constants/DuelingCard';
import { ForgeDeck } from '~/context/ForgeContext';

export default function useGetCardsToShow(
  filter: Filter,
  deck: Pick<ForgeDeck, 'cards'>,
  unlockedCards: DuelingCard[]
) {
  const deckFilteredCards: DuelingCard[] = useMemo(
    () => deck.cards[filter] || [],
    [deck, filter]
  );
  const filteredUnlockedCards = useMemo(
    () => unlockedCards.filter(c => c.type === filter),
    [unlockedCards, filter]
  );

  const unlockedNotInDeck = useMemo(
    () =>
      filteredUnlockedCards.filter(
        unlockedCard =>
          !deckFilteredCards.some(deckCard => deckCard.id === unlockedCard.id)
      ),
    [filteredUnlockedCards, deckFilteredCards]
  );

  return { deckCards: deckFilteredCards, unlockedCards: unlockedNotInDeck };
}
