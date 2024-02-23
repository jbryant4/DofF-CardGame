import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useCollectorContext } from '~/context/CollectorContext';
import { DuelingCard } from '~/contracts/card';
import { Deck } from '~/contracts/collector';
import devDuelingCards from '../../server/utils/devDuelingCards';

export const defaultForgeDeck: Deck = {
  title: '',
  cards: { army: [], champion: [], foundation: [], resource: [] },
  duelReady: false
};

type ForgeContextType = {
  isNewDeck: boolean;
  setIsNewDeck: React.Dispatch<React.SetStateAction<boolean>>;
  isViewMode: boolean;
  setIsViewMode: React.Dispatch<React.SetStateAction<boolean>>;
  forgeDecks: Deck[];
  setForgeDecks: React.Dispatch<React.SetStateAction<Deck[]>>;
  deckInForge: Deck;
  setDeckInForge: React.Dispatch<React.SetStateAction<Deck>>;
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
  const { collector } = useCollectorContext();

  useEffect(() => {
    if (!collector) return;
    setForgeDecks(collector.decks);
  }, [collector]);

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
    [deckInForge, forgeDecks, isNewDeck, isViewMode, unlockedCards]
  );

  return (
    <ForgeContext.Provider value={value}>{children}</ForgeContext.Provider>
  );
}

export function useForgeContext() {
  return React.useContext(ForgeContext);
}
