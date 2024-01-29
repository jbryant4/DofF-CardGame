import { useCallback } from 'react';
import { useCollector } from '~/context/CollectorContext';
import { defaultForgeDeck, useForgeContext } from '~/context/ForgeContext';
import { Deck } from '~/models/Collector';
import addDeck from '~/services/addDeck';
import deleteDeck from '~/services/deleteDeck';
import updateDeck from '~/services/updateDeck';

type Method = 'create' | 'update' | 'delete';

export default function useDeckServices(duelReady: boolean) {
  const { setIsNewDeck, setDeckInForge, setIsViewMode, deckInForge } =
    useForgeContext();
  const { setCollector } = useCollector();

  return useCallback(
    async (method: Method) => {
      const cardIds = Object.values(deckInForge.cards)
        .flat()
        .map(c => c.id);

      const payload: Deck = {
        title: deckInForge.title,
        cards: cardIds,
        duelReady
      };

      let updatedCollector;

      try {
        if (method === 'create') {
          updatedCollector = await addDeck(payload);
        }
        if (method === 'update') {
          updatedCollector = await updateDeck(payload);
        }
        if (method === 'delete') {
          updatedCollector = await deleteDeck(payload);
        }

        console.log(updatedCollector);

        setCollector(updatedCollector);
        setIsViewMode(true);
        setIsNewDeck(false);
        setDeckInForge({ ...defaultForgeDeck });
      } catch (error) {
        throw new Error(`Error in useDeckService hook ${error}`);
      }
    },
    [
      deckInForge.cards,
      deckInForge.title,
      duelReady,
      setCollector,
      setDeckInForge,
      setIsNewDeck,
      setIsViewMode
    ]
  );
}
