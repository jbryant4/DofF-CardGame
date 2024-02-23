import { useMemo } from 'react';
import { useCardContext } from '~/context/CardContext';
import { useForgeContext } from '~/context/ForgeContext';
import { Card } from '~/contracts/card';

//TODO let defaultArray = [''];
export default function useGetCardsToShow() {
  const { filter, displayCards } = useCardContext();
  const { deckInForge } = useForgeContext();
  //TODO const unlockedCards = useUnlockedCards() ?? defaultArray;

  const cardIdsInDeck = deckInForge.cards[filter];

  const deckCardsToShow = useMemo(
    () =>
      cardIdsInDeck
        .map(id => displayCards.find(c => c.id === id))
        .filter(Boolean) as Card[],
    [cardIdsInDeck, displayCards]
  );

  const unlockedNotInDeck = useMemo(
    () =>
      //TODO replace this with unlockedCards above when we are no longer play testing
      displayCards.filter(
        unlockedCard =>
          !cardIdsInDeck.some(cardId => cardId === unlockedCard.id)
      ),
    [displayCards, cardIdsInDeck]
  );

  return { deckCards: deckCardsToShow, unlockedCards: unlockedNotInDeck };
}
