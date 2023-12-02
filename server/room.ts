import {
  BattleStage,
  defaultDuelist,
  defaultPlayerField,
  Duelist,
  PlayerField,
  Players
} from '../src/constants/common/gameTypes';

export type Player = Duelist & {
  active: boolean;
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
  player1: { ...defaultDuelist, active: false },
  player2: { ...defaultDuelist, active: false },
  playerOneBoard: defaultPlayerField,
  playerTwoBoard: defaultPlayerField,
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
