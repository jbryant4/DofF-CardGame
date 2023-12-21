import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import {
  BattleStage,
  defaultDuelist,
  Duelist,
  Players
} from '~/constants/common/gameTypes';
import { useSocket } from '~/context/SocketContext';
import { GameMessages } from '../../server/gameHandlers/gameHandlers';
import { PreGameMessages } from '../../server/preGameHandlers/preGameHandlers';
import { GameRoom } from '../../server/room';

type GameContextType = {
  advanceBattleStage: () => void;
  localPlayer: Players;
  setLocalPLayer: Dispatch<SetStateAction<Players>>;
  gameState: 'Lobby' | 'SetUp' | 'Battle' | 'Stats' | 'PreLobby';
  setGameState: Dispatch<
    SetStateAction<'Lobby' | 'SetUp' | 'Battle' | 'Stats' | 'PreLobby'>
  >;
  playerOne: Duelist;
  updatePlayerOne: Dispatch<SetStateAction<Duelist>>;
  playerTwo: Duelist;
  updatePlayerTwo: Dispatch<SetStateAction<Duelist>>;
  battleStage: BattleStage;
  setBattleStage: Dispatch<SetStateAction<BattleStage>>;
  battleTurn: Players;
  setBattleTurn: Dispatch<SetStateAction<Players>>;
  victor: Players;
  roomId: string;
  setRoomId: Dispatch<SetStateAction<string>>;
};

const defaultGameContext: GameContextType = {
  advanceBattleStage() {},
  localPlayer: '',
  setLocalPLayer() {},
  gameState: 'PreLobby',
  setGameState() {},
  playerOne: defaultDuelist,
  updatePlayerOne() {},
  playerTwo: defaultDuelist,
  updatePlayerTwo() {},
  battleStage: null,
  setBattleStage() {},
  battleTurn: '',
  setBattleTurn() {},
  victor: '',
  roomId: '',
  setRoomId() {}
};

export const GameContext = createContext<GameContextType>(defaultGameContext);

type Props = {
  children: React.ReactNode;
};

export function GameProvider({ children }: Props) {
  // console.log(gameId);
  const [playerOne, updatePlayerOne] = useState(defaultGameContext.playerOne);
  const [playerTwo, updatePlayerTwo] = useState(defaultGameContext.playerTwo);
  const [gameState, setGameState] = useState(defaultGameContext.gameState);
  const [battleStage, setBattleStage] = useState(
    defaultGameContext.battleStage
  );
  const [battleTurn, setBattleTurn] = useState(defaultGameContext.battleTurn);
  const [victor] = useState(defaultGameContext.victor);
  const [localPlayer, setLocalPLayer] = useState<Players>('');
  const socket = useSocket();
  const [roomId, setRoomId] = useState(defaultGameContext.roomId);

  useEffect(() => {
    if (!socket) return;

    // Subscribe to the event
    socket.on(PreGameMessages.RPSShoot, () => {
      setGameState('Lobby');
    });

    socket.on(PreGameMessages.StartDuel, (data: GameRoom) => {
      updatePlayerOne({ ...data.player1 });
      updatePlayerTwo({ ...data.player2 });
      setBattleTurn(data.battleTurn);
      setGameState(data.gameState);
      setBattleStage(data.battleStage);
    });

    socket.on(GameMessages.AdvanceCompete, data => {
      setBattleStage(data.battleStage);
      setBattleTurn(data.battleTurn);
    });

    socket.on(GameMessages.HealthUpdate, data => {
      updatePlayerOne(prevState => ({
        ...prevState,
        hitPoints: data.player1Health
      }));
      updatePlayerTwo(prevState => ({
        ...prevState,
        hitPoints: data.player2Health
      }));
    });
    // Cleanup function to unsubscribe when the component unmounts
  }, [socket]);

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
      victor,
      roomId,
      setRoomId
    }),
    [
      advanceBattleStage,
      battleStage,
      battleTurn,
      gameState,
      localPlayer,
      playerOne,
      playerTwo,
      roomId,
      victor
    ]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGameContext() {
  return React.useContext(GameContext);
}
