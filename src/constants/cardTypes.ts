//Types
type PreReq = '1A' | '1C' | '2A' | '2C' | '3A' | Foundation;
type Foundation = 'desert' | 'earth' | 'ocean';
type Trait =
  | 'divine'
  | 'explorer'
  | 'fighter'
  | 'nobility'
  | 'revolutionist'
  | 'scholar';

type CardType = 'resource' | 'foundation' | 'army' | 'champion';

type Card = {
  class?: [Trait];
  foundation?: Foundation;
  preReqs?: string[];
  hp?: number;
  att?: number;
  def?: number;
  title: string;
  type: CardType;
};

type User = {
  cards: Card[];
  decks: [Card[]];
  email: string;
  id: number;
  losses: number;
  name: string;
  password: string;
  wins: number;
};

type Board = {
  pickup: {
    cards?: Card[];
    active: false;
  };
  discard: {
    cards?: Card[];
    active: true;
  };
  resource: {
    slot1: {
      card?: Card;
      active: boolean;
    };
    slot2: {
      card?: Card;
      active: boolean;
    };
  };
  foundation: {
    slot1: {
      card?: Card;
      active: boolean;
    };
    slot2: {
      card?: Card;
      active: boolean;
    };
    slot3: {
      card?: Card;
      active: boolean;
    };
    slot4: {
      card?: Card;
      active: boolean;
    };
  };
  army: {
    slot1: {
      card?: Card;
      attack: boolean;
    };
    slot2: {
      card?: Card;
      attack: boolean;
    };
    slot3: {
      card?: Card;
      attack: boolean;
    };
  };
  champion: {
    slot1: {
      card?: Card;
      attack: boolean;
    };
    slot2: {
      card?: Card;
      attack: boolean;
    };
    slot3: {
      card?: Card;
      attack: boolean;
    };
  };
  hand: {
    cards: Card[];
    maxCards: number;
  };
};

type Game = {
  player1: {
    board: Board;
    player: User;
    health: number;
  };
  player2: {
    board: Board;
    player: User;
    health: number;
  };
  vacant: boolean;
  turn: User['name'];
};

export {};
