import { collection, query, where, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Filters } from '@/FilterBar/Filters';
import { useCardContext } from '~/context/CardContext';
import { Card, Foundations, Trait, Foundation, Traits } from '~/contracts/card';
import { db } from '../../firebase';

function isFoundation(value: Trait | Foundation): value is Foundation {
  return Foundations.has(value as Foundation);
}

function isTrait(value: Trait | Foundation): value is Trait {
  return Traits.has(value as Trait);
}

export default function useGlobalCards() {
  const {
    globalCards,
    filter,
    subFilter,
    setDisplayCards,
    setSubFilter,
    setGlobalCards
  } = useCardContext();
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    if (globalCards[filter].length === 0) {
      setShouldFetch(true);
    } else {
      setDisplayCards(globalCards[filter]);
      setShouldFetch(false);
    }
  }, [filter, globalCards, setDisplayCards]);

  useEffect(() => {
    if (!shouldFetch) return;

    const fetchCards = async () => {
      const cardsCollection = collection(db, 'cards');
      const cardsQuery = query(cardsCollection, where('type', '==', filter));
      const querySnapshot = await getDocs(cardsQuery);
      const cards = querySnapshot.docs.map(card => card.data() as Card);
      setDisplayCards(cards);
      setGlobalCards(prevState => ({ ...prevState, [filter]: cards }));
    };
    void fetchCards();
  }, [shouldFetch, filter, setDisplayCards, setGlobalCards]);

  useEffect(() => {
    if (!subFilter) return;

    if (Filters[filter].length === 0) {
      setSubFilter(null);
    }

    if (filter === 'foundation' && isFoundation(subFilter)) {
      setDisplayCards(
        globalCards[filter].filter(card => card.foundation?.includes(subFilter))
      );
    }

    if (filter === 'champion' && isTrait(subFilter)) {
      setDisplayCards(
        globalCards[filter].filter(card => card.class?.includes(subFilter))
      );
    }
  }, [filter, globalCards, setDisplayCards, setSubFilter, subFilter]);
}
