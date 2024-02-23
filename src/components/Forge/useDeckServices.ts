import { doc, arrayUnion, getDoc, updateDoc } from 'firebase/firestore';
import { useCallback } from 'react';
import { useCollectorContext } from '~/context/CollectorContext';
import { defaultForgeDeck, useForgeContext } from '~/context/ForgeContext';
import { Deck } from '~/contracts/collector';
import { auth, Collections, db } from '../../../firebase';

type Method = 'create' | 'update' | 'delete';

export default function useDeckServices(duelReady: boolean) {
  const { setIsNewDeck, setDeckInForge, setIsViewMode, deckInForge } =
    useForgeContext();
  const { setCollector } = useCollectorContext();

  return useCallback(
    async (method: Method) => {
      const payload: Deck = {
        ...deckInForge,
        duelReady
      };
      const user = auth.currentUser;

      if (!user) {
        console.error(['no user']);

        return;
      }

      const collectorRef = doc(db, Collections.Collectors, user.uid);
      const collectorSnapshot = await getDoc(collectorRef);
      const collectorData = collectorSnapshot.data();

      if (!collectorData) {
        throw new Error('Collector document does not exist.');
      }
      try {
        let updatedCollector = {};

        if (method === 'create') {
          updatedCollector = {
            decks: arrayUnion(payload)
          };
        }

        if (method === 'update') {
          const indexToUpdate = collectorData.decks.findIndex(
            (deck: Deck) => deck.title === payload.title
          );

          if (indexToUpdate === -1) {
            throw new Error('Deck not found in the collector.');
          }

          // Update the deck object within the array
          const updatedDecks = [...collectorData.decks];
          updatedDecks[indexToUpdate] = payload;

          // Prepare the updatedCollector object
          updatedCollector = { decks: updatedDecks };
        }
        if (method === 'delete') {
          const updatedDecks = collectorData.decks.filter(
            (deck: Deck) => deck.title !== payload.title
          );
          updatedCollector = { decks: updatedDecks };
        }

        await updateDoc(collectorRef, updatedCollector);
        setCollector(prevState => {
          if (!prevState) return null;

          if (method === 'create') {
            return {
              ...prevState,
              decks: [
                ...prevState.decks.filter(d => d.title !== payload.title),
                payload
              ]
            };
          }

          if (method === 'update') {
            return {
              ...prevState,
              decks: [
                ...prevState.decks.filter(d => d.title !== payload.title),
                payload
              ]
            };
          }

          if (method === 'delete') {
            return {
              ...prevState,
              decks: [...prevState.decks.filter(d => d.title !== payload.title)]
            };
          }

          return null;
        });
        setIsViewMode(true);
        setIsNewDeck(false);
        setDeckInForge({ ...defaultForgeDeck });
      } catch (error) {
        throw new Error(`Error in ${method} hook ${error}`);
      }
    },
    [deckInForge, duelReady, setDeckInForge, setIsNewDeck, setIsViewMode]
  );
}
