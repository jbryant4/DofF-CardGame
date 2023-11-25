import DuelingCard from '~/constants/DuelingCard';
import { Deck } from '~/models/Collector';

export type Duelist = {
  id: string;
  userName: string;
  deck: Deck;
  hitPoints: number;
};

export const defaultDuelist = {
  id: '',
  userName: '',
  deck: { title: '', cards: [''] },
  hitPoints: 10
};

export type PlayerField = {
  mainDeck: DuelingCard[];
  foundationDeck: DuelingCard[];
  hand: DuelingCard[];
  graveyard: DuelingCard[];
  army: Array<DuelingCard | null>;
  champions: Array<DuelingCard | null>;
  foundations: Array<DuelingCard | null>;
  resources: Array<DuelingCard | null>;
};

export const defaultPlayerField = {
  mainDeck: [],
  foundationDeck: [],
  hand: [],
  graveyard: [],
  army: [null, null, null],
  champions: [null, null, null],
  foundations: [null, null, null, null],
  resources: [null, null]
};

export type Players = '' | 'playerOne' | 'playerTwo';
export type BattleStage = 'plan' | 'place' | 'duel' | 'respite' | null;
