import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState
} from 'react';
import { Deck } from '~/models/Collector';

export type Duelist = {
  id: string;
  userName: string;
  deck: Deck;
  hitPoints: number;
};

const defaultDuelist = {
  id: '',
  userName: '',
  deck: { title: '', cards: [''] },
  hitPoints: 10
};

type BattleStage = 'plan' | 'place' | 'duel' | 'respite' | null;
type GameContextType = {
  gameState: 'Lobby' | 'Battle' | 'Stats';
  setGameState: Dispatch<SetStateAction<'Lobby' | 'Battle' | 'Stats'>>;
  playerOne: Duelist;
  updatePlayerOne: Dispatch<SetStateAction<Duelist>>;
  playerTwo: Duelist;
  updatePlayerTwo: Dispatch<SetStateAction<Duelist>>;
  battleStage: BattleStage;
  setBattleStage: Dispatch<SetStateAction<BattleStage>>;
  battleTurn: 'player1' | 'player2' | null;
  setBattleTurn: Dispatch<SetStateAction<'player1' | 'player2' | null>>;
  victor: null | 'player1' | 'player2';
};

const defaultGameContext: GameContextType = {
  gameState: 'Lobby',
  setGameState() {},
  playerOne: defaultDuelist,
  updatePlayerOne() {},
  playerTwo: defaultDuelist,
  updatePlayerTwo() {},
  battleStage: null,
  setBattleStage() {},
  battleTurn: null,
  setBattleTurn() {},
  victor: null
};

export const GameContext = createContext<GameContextType>(defaultGameContext);

type Props = {
  gameId: string;
  children: React.ReactNode;
};

export function GameProvider({ gameId, children }: Props) {
  const [playerOne, updatePlayerOne] = useState(defaultGameContext.playerOne);
  const [playerTwo, updatePlayerTwo] = useState(defaultGameContext.playerTwo);
  const [gameState, setGameState] = useState(defaultGameContext.gameState);
  const [battleStage, setBattleStage] = useState(
    defaultGameContext.battleStage
  );
  const [battleTurn, setBattleTurn] = useState(defaultGameContext.battleTurn);
  const [victor, setVictor] = useState(defaultGameContext.victor);

  const value = useMemo(
    () => ({
      gameState,
      setGameState,
      playerOne,
      updatePlayerOne,
      playerTwo,
      updatePlayerTwo,
      battleStage,
      setBattleStage,
      battleTurn,
      setBattleTurn,
      victor
    }),
    [battleStage, battleTurn, gameState, playerOne, playerTwo, victor]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
