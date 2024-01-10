import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback
} from 'react';
import Card from '~/constants/CardType';
import defaultCard from '~/constants/defaultCard';
import { devCards } from '~/constants/developmentCards';
import { CollectorContext } from '~/context/CollectorContext';
import { CardDocument, CardType } from '~/models/Card';
import { Deck } from '~/models/Collector';

type WholeDeck = {
  title: string;
  cards: CardDocument[];
};

type CardContextType = {
  cards: CardDocument[];
  localCards: CardDocument[];
  collection: CardDocument[];
  filter: CardType;
  setFilter: React.Dispatch<React.SetStateAction<CardType>>;
  subFilter: string;
  setSubFilter: React.Dispatch<React.SetStateAction<string>>;
  decks: WholeDeck[];
  isLoading: boolean;
  errorText: Error | null;
  getCard: (id: string) => Card;
  unlockCard: (id: string) => Promise<void>;
  createDeck: (deck: Deck) => Promise<void>;
  editDeck: (deck: Deck) => Promise<void>;
  deleteDeck: (deck: Deck) => Promise<void>;
  setLocalCards: React.Dispatch<React.SetStateAction<CardDocument[]>>;
  setFetchTrigger: React.Dispatch<React.SetStateAction<number>>;
};

const defaultCardContext: CardContextType = {
  cards: [],
  localCards: [],
  filter: '',
  setFilter() {},
  subFilter: '',
  setSubFilter() {},
  collection: [],
  decks: [],
  isLoading: false,
  errorText: null,
  getCard: (_value: string) => defaultCard,
  unlockCard: async (_value: string) => {},
  createDeck: async (_value: Deck) => {},
  editDeck: async (_value: Deck) => {},
  deleteDeck: async (_value: Deck) => {},
  setLocalCards: () => {},
  setFetchTrigger: () => {}
};

export const CardContext = createContext<CardContextType>(defaultCardContext);

type Props = {
  children: React.ReactNode;
};

function filterCardsById(
  cardIds: string[],
  cards: CardDocument[]
): CardDocument[] {
  return cards.filter(card => cardIds.includes(card.id));
}

function makeDecks(decks: Deck[], cards: CardDocument[]): WholeDeck[] {
  if (decks.length > 0) return [];

  return decks.map(deck => {
    const filteredCards = filterCardsById(deck.cards, cards);

    return {
      ...deck,
      cards: filteredCards
    };
  });
}

export function CardProvider({ children }: Props) {
  const [cards, setCards] = useState<CardDocument[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorText, setError] = useState<Error | null>(null);
  const [localCards, setLocalCards] = useState<CardDocument[]>([]);
  const [collection, setCollection] = useState<CardDocument[]>([]);
  const [decks, setDecks] = useState<WholeDeck[]>([]);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const { collector } = useContext(CollectorContext);
  const [filter, setFilter] = useState<CardType>('');
  const [subFilter, setSubFilter] = useState('');
  const unlockCard = useCallback(async (id: string): Promise<void> => {
    console.log(id);
  }, []);
  const createDeck = useCallback(async (deck: Deck): Promise<void> => {
    console.log(deck);
  }, []);
  const editDeck = useCallback(async (deck: Deck): Promise<void> => {
    console.log(deck);
  }, []);
  const deleteDeck = useCallback(async (deck: Deck): Promise<void> => {
    console.log(deck);
  }, []);

  const getCard = useCallback(
    (id: string): Card => {
      const data = cards.find(c => c._id === id);

      if (data) {
        return data;
      } else {
        return defaultCard;
      }
    },
    [cards]
  );

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        //TODO to save money atm make sure to recopy if you make changes
        // const data = await fetchCards();
        // @ts-ignore
        setCards(devCards);
        setError(null);
      } catch (error: any) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [fetchTrigger]);

  useEffect(() => {
    // TODO might want to put these separate and go off the collector specific changes
    console.log(collector);
    if (!collector) return;
    // const filteredCards = filterCardsById(collector.cards, cards);
    // setCollection(filteredCards);

    const madeDecks = makeDecks(collector.decks, cards);
    setDecks(madeDecks);
  }, [cards, collector]);

  const value = useMemo(
    () => ({
      cards,
      localCards,
      collection,
      decks,
      filter,
      setFilter,
      subFilter,
      setSubFilter,
      isLoading,
      errorText,
      getCard,
      unlockCard,
      createDeck,
      editDeck,
      deleteDeck,
      setLocalCards,
      setFetchTrigger
    }),
    [
      cards,
      localCards,
      collection,
      decks,
      filter,
      subFilter,
      isLoading,
      errorText,
      getCard,
      unlockCard,
      createDeck,
      editDeck,
      deleteDeck
    ]
  );

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}

export function useCardContext() {
  return React.useContext(CardContext);
}
