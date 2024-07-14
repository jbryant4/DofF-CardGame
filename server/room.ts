import {
  BattleStage,
  createDefaultPlayerField,
  defaultDuelist,
  Duelist,
  PlayerField,
  Players
} from '../shared/gameTypes';

export type Player = Duelist & {
  active: boolean;
  hitPoints: number;
};

export type MiniGame = {
  winner: Players[];
  playerOneSelection: string;
  playerTwoSelection: string;
};

export type GameRoom = {
  player1: Player;
  player2: Player;
  playerOneBoard: PlayerField;
  playerTwoBoard: PlayerField;
  gameState: 'Lobby' | 'SetUp' | 'Battle' | 'Stats';
  battleStage: BattleStage;
  battleTurn: Players;
  victor: Players;
  miniGame: MiniGame;
};

const defaultRoom: GameRoom = {
  player1: { ...defaultDuelist, active: false, hitPoints: 1 },
  player2: { ...defaultDuelist, active: false, hitPoints: 1 },
  playerOneBoard: { ...createDefaultPlayerField() },
  playerTwoBoard: { ...createDefaultPlayerField() },
  gameState: 'Lobby',
  battleStage: null,
  battleTurn: '',
  victor: '',
  miniGame: {
    winner: [],
    playerOneSelection: '',
    playerTwoSelection: ''
  }
};

export default defaultRoom;
