import { number } from 'prop-types';
import { CardType, DuelingCard, RTCard } from './cardTypes';

type DeckCards = Record<CardType, string[]>;

export type Deck = {
  title: string;
  cards: DeckCards;
  duelReady: boolean;
};

export type RTDeck = Array<RTCard>;

export const defaultForgeDeck: Deck = {
  title: '',
  cards: { army: [], champion: [], foundation: [], resource: [] },
  duelReady: false
};

export type Duelist = {
  id: string;
  userName: string;
  deck: Deck;
};

export const defaultDuelist: Duelist = {
  id: '',
  userName: '',
  deck: { title: '', cards: { ...defaultForgeDeck.cards }, duelReady: false }
};

export type PlayerFieldKey =
  | 'mainDeck'
  | 'foundationDeck'
  | 'hand'
  | 'graveyard'
  | 'army'
  | 'champions'
  | 'foundations'
  | 'resources';

export type Players = '' | 'player1' | 'player2';
export type BattleStage = 'plan' | 'place' | 'duel' | 'respite' | 'draw';

export enum GameState {
  Lobby = 'Lobby',
  SetUp = 'SetUp',
  Battle = 'Battle',
  Stats = 'Stats',
  PreLobby = 'PreLobby'
}

export type RTgameStatic = {
  player1Id: string;
  player1UserName: string;
  player1Deck: string[] | null;
  player2Id: string;
  player2UserName: string;
  player2Deck: string[] | null;
};

export type RTgameDynamic = {
  player1Active: boolean;
  player1Hp: number;
  player2Active: boolean;
  player2Hp: number;
  gameState: GameState;
  battleStage: BattleStage;
  battleTurn: Players;
  victor: Players;
};

export type RTgame = {
  static: RTgameStatic;
  dynamic: RTgameDynamic;
};

export const defaultRTGameStatic: RTgameStatic = {
  player1Id: '',
  player1Deck: null,
  player1UserName: '',
  player2Id: '',
  player2Deck: null,
  player2UserName: ''
};

export const defaultRTgameDynamic: RTgameDynamic = {
  player1Active: false,
  player1Hp: 10,
  player2Active: false,
  player2Hp: 10,
  gameState: GameState.PreLobby,
  battleTurn: '',
  battleStage: 'plan',
  victor: ''
};

export type RTplayer = Duelist & {
  currentGameId: string;
};

type FighterSlot = 'slot1' | 'slot2' | 'slot3';
type ResourceSlot = 'slot1' | 'slot2';
type FoundationSlot = 'slot1' | 'slot2' | 'slot3' | 'slot4';

type IsEmpty = 'emptySlot';
export type FighterSlotsType = {
  [slot in FighterSlot]: DuelingCard | IsEmpty;
};

type ResourceSlotsType = {
  [slot in ResourceSlot]: DuelingCard | IsEmpty;
};

type FoundationSlotsType = {
  [slot in FoundationSlot]: DuelingCard | IsEmpty;
};

export type RTBoard = {
  p1MainDeck: DuelingCard[];
  p1FoundationDeck: DuelingCard[];
  p1Hand: DuelingCard[];
  p1Graveyard: DuelingCard[];
  p1Army: FighterSlotsType;
  p1Champions: FighterSlotsType;
  p1Foundations: FoundationSlotsType;
  p1Resources: ResourceSlotsType;
  p2MainDeck: DuelingCard[];
  p2FoundationDeck: DuelingCard[];
  p2Hand: DuelingCard[];
  p2Graveyard: DuelingCard[];
  p2Army: FighterSlotsType;
  p2Champions: FighterSlotsType;
  p2Foundations: FoundationSlotsType;
  p2Resources: ResourceSlotsType;
};

export const defaultRTBoard: RTBoard = {
  p1MainDeck: [],
  p1FoundationDeck: [],
  p1Hand: [],
  p1Graveyard: [],
  p1Army: { slot1: 'emptySlot', slot2: 'emptySlot', slot3: 'emptySlot' },
  p1Champions: { slot1: 'emptySlot', slot2: 'emptySlot', slot3: 'emptySlot' },
  p1Foundations: {
    slot1: 'emptySlot',
    slot2: 'emptySlot',
    slot3: 'emptySlot',
    slot4: 'emptySlot'
  },
  p1Resources: { slot1: 'emptySlot', slot2: 'emptySlot' },
  p2MainDeck: [],
  p2FoundationDeck: [],
  p2Hand: [],
  p2Graveyard: [],
  p2Army: { slot1: 'emptySlot', slot2: 'emptySlot', slot3: 'emptySlot' },
  p2Champions: { slot1: 'emptySlot', slot2: 'emptySlot', slot3: 'emptySlot' },
  p2Foundations: {
    slot1: 'emptySlot',
    slot2: 'emptySlot',
    slot3: 'emptySlot',
    slot4: 'emptySlot'
  },
  p2Resources: { slot1: 'emptySlot', slot2: 'emptySlot' }
};

export type PlayerField = {
  mainDeck: DuelingCard[];
  foundationDeck: DuelingCard[];
  hand: DuelingCard[];
  graveyard: DuelingCard[];
  army: FighterSlotsType;
  champions: FighterSlotsType;
  foundations: FoundationSlotsType;
  resources: ResourceSlotsType;
};

export function createDefaultPlayerField(): PlayerField {
  return {
    mainDeck: [],
    foundationDeck: [],
    hand: [],
    graveyard: [],
    army: { slot1: 'emptySlot', slot2: 'emptySlot', slot3: 'emptySlot' },
    champions: { slot1: 'emptySlot', slot2: 'emptySlot', slot3: 'emptySlot' },
    foundations: {
      slot1: 'emptySlot',
      slot2: 'emptySlot',
      slot3: 'emptySlot',
      slot4: 'emptySlot'
    },
    resources: { slot1: 'emptySlot', slot2: 'emptySlot' }
  };
}

export type PlayerSelection = 'rock' | 'paper' | 'scissors';

export type RPSGame = {
  player1Choice: PlayerSelection | null;
  player2Choice: PlayerSelection | null;
  player1Score: number;
  player2Score: number;
  roundWinner: 'player1' | 'player2' | 'tie' | null;
};

export const defaultRpsGame: RPSGame = {
  player1Choice: null,
  player2Choice: null,
  player1Score: 0,
  player2Score: 0,
  roundWinner: null
};

export function convertDeckToCardArray(deckCards: DeckCards): string[] {
  return Object.values(deckCards).reduce((acc, cardArray) => {
    return acc.concat(cardArray);
  }, []);
}

export function isEmptySlot(slot: DuelingCard | 'emptySlot'): boolean {
  return slot === 'emptySlot';
}
