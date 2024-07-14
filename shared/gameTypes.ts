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

export function createDefaultPlayerField(): PlayerField {
  return {
    mainDeck: [],
    foundationDeck: [],
    hand: [],
    graveyard: [],
    army: [null, null, null],
    champions: [null, null, null],
    foundations: [null, null, null, null],
    resources: [null, null]
  };
}

export type Players = '' | 'playerOne' | 'playerTwo';
export type BattleStage = 'plan' | 'place' | 'duel' | 'respite' | 'draw' | null;

export enum GameState {
  Lobby = 'Lobby',
  SetUp = 'SetUp',
  Battle = 'Battle',
  Stats = 'Stats',
  PreLobby = 'PreLobby'
}

export type RTgame = {
  player1Id: string;
  player1Active: boolean;
  player1Hp: number;
  player1Deck: Deck | null;
  player1UserName: string;
  player2Id: string;
  player2Active: boolean;
  player2Hp: number;
  player2Deck: Deck | null;
  player2UserName: string;
  gameState: GameState;
  battleStage: BattleStage;
  battleTurn: Players;
  victor: Players;
};

export const defaultRTGame: RTgame = {
  player1Id: '',
  player1Active: false,
  player1Hp: 10,
  player1Deck: null,
  player1UserName: '',
  player2Id: '',
  player2Active: false,
  player2Hp: 10,
  player2Deck: null,
  player2UserName: '',
  gameState: GameState.PreLobby,
  battleStage: null,
  battleTurn: '',
  victor: ''
};

export type RTplayer = Duelist & {
  currentGameId: string;
};

export type RTBoard = {
  p1MainDeck: DuelingCard[];
  p1FoundationDeck: DuelingCard[];
  p1Hand: DuelingCard[];
  p1Graveyard: DuelingCard[];
  p1Army: Array<DuelingCard | null>;
  p1Champions: Array<DuelingCard | null>;
  p1Foundations: Array<DuelingCard | null>;
  p1Resources: Array<DuelingCard | null>;
  p2MainDeck: DuelingCard[];
  p2FoundationDeck: DuelingCard[];
  p2Hand: DuelingCard[];
  p2Graveyard: DuelingCard[];
  p2Army: Array<DuelingCard | null>;
  p2Champions: Array<DuelingCard | null>;
  p2Foundations: Array<DuelingCard | null>;
  p2Resources: Array<DuelingCard | null>;
};

export type PlayerSelection = 'rock' | 'paper' | 'scissors';

export type RPSGame = {
  player1Choice: PlayerSelection | null;
  player2Choice: PlayerSelection | null;
  player1Score: number;
  player2Score: number;
  roundWinner: 'player1' | 'player2' | 'tie' | null;
};
