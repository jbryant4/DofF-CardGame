import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
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
export type Players = '' | 'playerOne' | 'playerTwo';
type BattleStage = 'plan' | 'place' | 'duel' | 'respite' | null;
type GameContextType = {
  advanceBattleStage: () => void;
  localPlayer: Players;
  setLocalPLayer: Dispatch<SetStateAction<Players>>;
  gameState: 'Lobby' | 'Battle' | 'Stats';
  setGameState: Dispatch<SetStateAction<'Lobby' | 'Battle' | 'Stats'>>;
  playerOne: Duelist;
  updatePlayerOne: Dispatch<SetStateAction<Duelist>>;
  playerTwo: Duelist;
  updatePlayerTwo: Dispatch<SetStateAction<Duelist>>;
  battleStage: BattleStage;
  setBattleStage: Dispatch<SetStateAction<BattleStage>>;
  battleTurn: Players;
  setBattleTurn: Dispatch<SetStateAction<Players>>;
  victor: Players;
};

const defaultGameContext: GameContextType = {
  advanceBattleStage() {},
  localPlayer: '',
  setLocalPLayer() {},
  gameState: 'Lobby',
  setGameState() {},
  playerOne: defaultDuelist,
  updatePlayerOne() {},
  playerTwo: defaultDuelist,
  updatePlayerTwo() {},
  battleStage: null,
  setBattleStage() {},
  battleTurn: '',
  setBattleTurn() {},
  victor: ''
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
  const [localPlayer, setLocalPLayer] = useState<Players>('');

  const advanceBattleStage = useCallback(() => {
    const stagesInOrder: BattleStage[] = ['plan', 'place', 'duel', 'respite'];
    const currentIndex = stagesInOrder.indexOf(battleStage);

    // If we're at the last stage ('respite'), swap the turn and reset stage to 'plan'.
    if (currentIndex === stagesInOrder.length - 1) {
      setBattleStage(stagesInOrder[0]);

      if (battleTurn === 'playerOne') {
        setBattleTurn('playerTwo');
      } else if (battleTurn === 'playerTwo') {
        setBattleTurn('playerOne');
      }
    } else {
      // Otherwise, just move to the next stage.
      setBattleStage(stagesInOrder[currentIndex + 1]);
    }
  }, [battleStage, battleTurn]);

  const value = useMemo(
    () => ({
      advanceBattleStage,
      localPlayer,
      setLocalPLayer,
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
    [
      advanceBattleStage,
      battleStage,
      battleTurn,
      gameState,
      localPlayer,
      playerOne,
      playerTwo,
      victor
    ]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
