import { Deck } from '@shared/gameTypes';

export type Collector = {
  userName: string;
  id: string;
  cards: string[];
  decks: Deck[];
  isAdmin: boolean;
};

export const defaultCollector: Collector = {
  userName: '',
  id: '',
  cards: [],
  decks: [],
  isAdmin: false
};

export type ContextCollector = Omit<Collector, 'id'>;
