import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState
} from 'react';
import { CardType, Card, Trait, Foundation } from '~/contracts/card';

type GlobalCards = Record<CardType, Card[]>;

const defaultGlobalCards: GlobalCards = {
  resource: [],
  army: [],
  foundation: [],
  champion: []
};

type CardContextType = {
  globalCards: GlobalCards;
  setGlobalCards: Dispatch<SetStateAction<GlobalCards>>;
  displayCards: Card[];
  filter: CardType;
  setFilter: Dispatch<SetStateAction<CardType>>;
  subFilter: Trait | Foundation | null;
  setSubFilter: Dispatch<SetStateAction<Trait | Foundation | null>>;
  setDisplayCards: Dispatch<SetStateAction<Card[]>>;
};

const defaultCardContext: CardContextType = {
  globalCards: defaultGlobalCards,
  setGlobalCards() {},
  displayCards: [],
  filter: 'champion',
  setFilter() {},
  subFilter: null,
  setSubFilter() {},
  setDisplayCards() {}
};

export const CardContext = createContext<CardContextType>(defaultCardContext);

type Props = {
  children: React.ReactNode;
};

export function CardProvider({ children }: Props) {
  const [globalCards, setGlobalCards] = useState<GlobalCards>(
    defaultCardContext.globalCards
  );
  const [displayCards, setDisplayCards] = useState(
    defaultCardContext.displayCards
  );
  const [filter, setFilter] = useState(defaultCardContext.filter);
  const [subFilter, setSubFilter] = useState(defaultCardContext.subFilter);

  const value = useMemo(
    () => ({
      globalCards,
      displayCards,
      filter,
      setFilter,
      subFilter,
      setSubFilter,
      setDisplayCards,
      setGlobalCards
    }),
    [globalCards, displayCards, filter, subFilter]
  );

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}

export function useCardContext() {
  return React.useContext(CardContext);
}
