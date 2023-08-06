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
import { CollectorContext } from '~/context/CollectorContext';
import { CardDocument } from '~/models/Card';
import { Deck } from '~/models/Collector';
import { fetchCards } from '~/services/cardServices';

type WholeDeck = {
  title: string;
  cards: CardDocument[];
};

type CardContextType = {
  cards: CardDocument[];
  localCards: CardDocument[];
  collection: CardDocument[];
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
const maxDecks = 6;
const defaultCardContext: CardContextType = {
  cards: [],
  localCards: [],
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
  const { collector, setCollector } = useContext(CollectorContext);

  const unlockCard = useCallback(async (id: string): Promise<void> => {}, []);
  const createDeck = useCallback(async (deck: Deck): Promise<void> => {}, []);
  const editDeck = useCallback(async (deck: Deck): Promise<void> => {}, []);
  const deleteDeck = useCallback(async (deck: Deck): Promise<void> => {}, []);

  const getCard = useCallback(
    (id): Card => {
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
        const data = await fetchCards();
        setCards(data);
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
    if (!collector) return;
    const filteredCards = filterCardsById(collector.cards, cards);
    setCollection(filteredCards);
    const madeDecks = makeDecks(collector.decks, cards);
    setDecks(madeDecks);
  }, [cards, collector]);

  useEffect(() => {
    if (!cards) return;
    const preReqsLengths = cards.find(card => card?.preReqs?.length === 4);
    // Find and return the maximum length
    console.log(preReqsLengths?._id);
  }, [cards]);

  const value = useMemo(
    () => ({
      cards,
      localCards,
      collection,
      decks,
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
      isLoading,
      errorText,
      getCard,
      unlockCard,
      createDeck,
      editDeck,
      deleteDeck,
      setLocalCards,
      setFetchTrigger
    ]
  );

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}
