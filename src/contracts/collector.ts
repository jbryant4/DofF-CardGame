import { CardType } from '~/contracts/card';

type DeckCards = Record<CardType, string[]>;

export type Deck = {
  title: string;
  cards: DeckCards;
  duelReady: boolean;
};

export type Collector = {
  userName: string;
  id: string;
  cards: string[];
  decks: Deck[];
  isAdmin: boolean;
};

export type ContextCollector = Omit<Collector, 'id'>;
