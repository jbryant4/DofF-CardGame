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

export type GameRoom = {
  player1: Player;
  player2: Player;
  playerOneBoard: PlayerField;
  playerTwoBoard: PlayerField;
  gameState: 'AdminLobby' | 'Lobby' | 'Battle' | 'Stats';
  battleStage: BattleStage;
  battleTurn: Players;
  victor: Players;
};

const defaultRoom: GameRoom = {
  player1: { ...defaultDuelist, active: false },
  player2: { ...defaultDuelist, active: false },
  playerOneBoard: defaultPlayerField,
  playerTwoBoard: defaultPlayerField,
  gameState: 'Lobby',
  battleStage: null,
  battleTurn: '',
  victor: ''
};

export default defaultRoom;
