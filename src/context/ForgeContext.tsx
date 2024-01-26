import React, { createContext, useMemo, useState } from 'react';
import DuelingCard from '~/constants/DuelingCard';
import devDuelingCards from '../../server/utils/devDuelingCards';

export type ForgeDeck = {
  title: string;
  cards: {
    army: DuelingCard[];
    champion: DuelingCard[];
    foundation: DuelingCard[];
    resource: DuelingCard[];
  };
};

export const defaultForgeDeck: ForgeDeck = {
  title: '',
  cards: { army: [], champion: [], foundation: [], resource: [] }
};

type ForgeContextType = {
  isNewDeck: boolean;
  setIsNewDeck: React.Dispatch<React.SetStateAction<boolean>>;
  isViewMode: boolean;
  setIsViewMode: React.Dispatch<React.SetStateAction<boolean>>;
  forgeDecks: ForgeDeck[];
  setForgeDecks: React.Dispatch<React.SetStateAction<ForgeDeck[]>>;
  deckInForge: ForgeDeck;
  setDeckInForge: React.Dispatch<React.SetStateAction<ForgeDeck>>;
  unlockedCards: DuelingCard[];
  setUnlockedCards: React.Dispatch<React.SetStateAction<DuelingCard[]>>;
};

const defaultForgeContext: ForgeContextType = {
  isNewDeck: false,
  setIsNewDeck() {},
  isViewMode: true,
  setIsViewMode() {},
  forgeDecks: [],
  setForgeDecks() {},
  deckInForge: { ...defaultForgeDeck },
  setDeckInForge() {},
  unlockedCards: [],
  setUnlockedCards() {}
};

export const ForgeContext =
  createContext<ForgeContextType>(defaultForgeContext);

type Props = {
  children: React.ReactNode;
};

export function ForgeProvider({ children }: Props) {
  const [isViewMode, setIsViewMode] = useState(defaultForgeContext.isViewMode);
  const [isNewDeck, setIsNewDeck] = useState(defaultForgeContext.isNewDeck);
  const [forgeDecks, setForgeDecks] = useState(defaultForgeContext.forgeDecks);
  const [deckInForge, setDeckInForge] = useState(
    defaultForgeContext.deckInForge
  );
  //TODO map this to the users unlocked cards, for now it will be all cards
  const [unlockedCards, setUnlockedCards] = useState(devDuelingCards);

  const value = useMemo(
    () => ({
      isViewMode,
      isNewDeck,
      setIsNewDeck,
      setIsViewMode,
      deckInForge,
      forgeDecks,
      unlockedCards,
      setDeckInForge,
      setForgeDecks,
      setUnlockedCards
    }),
    [deckInForge, forgeDecks, isViewMode, unlockedCards]
  );

  return (
    <ForgeContext.Provider value={value}>{children}</ForgeContext.Provider>
  );
}

export function useForgeContext() {
  return React.useContext(ForgeContext);
}
