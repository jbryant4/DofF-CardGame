import { onValue } from '@firebase/database';
import { ref } from 'firebase/database';
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState
} from 'react';
import { rtdb } from '@firebaseUiConfig';
import { defaultRTGame, Players, RTgame } from '@shared/gameTypes';
import { useCollectorContext } from '~/context/CollectorContext';
import useLoadableState, {
  defaultLoadableState,
  LoadableState
} from '~/utils/useLoadableState';

type GameContextType = {
  // advanceBattleStage: () => void;
  localPlayer: Players;
  setLocalPLayer: Dispatch<SetStateAction<Players>>;
  roomId: string;
  gameData: LoadableState<RTgame>;
  setRoomId: Dispatch<SetStateAction<string>>;
};

const defaultGameContext: GameContextType = {
  // advanceBattleStage() {},
  localPlayer: '',
  setLocalPLayer() {},
  gameData: defaultLoadableState<RTgame>({ ...defaultRTGame }),
  roomId: '',
  setRoomId() {}
};

export const GameContext = createContext<GameContextType>(defaultGameContext);

type Props = {
  children: React.ReactNode;
};

export function GameProvider({ children }: Props) {
  const gameData = useLoadableState<RTgame>({
    ...defaultGameContext.gameData.data
  });
  const [localPlayer, setLocalPLayer] = useState<Players>('');
  const [roomId, setRoomId] = useState(defaultGameContext.roomId);
  const {
    collector: { data: collector }
  } = useCollectorContext();

  useEffect(() => {
    if (!roomId) return; // Guard clause to ensure roomId is present
    gameData.setLoading();
    const boardRef = ref(rtdb, `games/${roomId}`);

    // Subscribe to Firebase and handle data updates
    const unsubscribe = onValue(
      boardRef,
      snapshot => {
        if (snapshot.exists()) {
          gameData.setData(prevState => ({
            ...prevState,
            ...(snapshot.val() as RTgame)
          }));
        }
      },
      error => {
        console.error('Firebase subscription error:', error);
        gameData.setError(error);
      }
    );

    // Cleanup function to unsubscribe from Firebase updates
    return () => unsubscribe();
  }, [gameData, roomId]); // Dependencies include gameData and roomId

  useEffect(() => {
    if (collector === null) return;
    if (!gameData.isLoaded) return;

    if (collector.id === gameData.data.player1Id) {
      setLocalPLayer('playerOne');
    }

    if (collector.id === gameData.data.player2Id) {
      setLocalPLayer('playerTwo');
    }
  }, [
    collector,
    gameData.data.player1Id,
    gameData.data.player2Id,
    gameData.isLoaded
  ]);
  // const advanceBattleStage = useCallback(() => {
  //   const stagesInOrder: BattleStage[] = [
  //     'plan',
  //     'place',
  //     'duel',
  //     'respite',
  //     'draw'
  //   ];
  //   const currentIndex = stagesInOrder.indexOf(battleStage);
  //
  //   // If we're at the last stage ('respite'), swap the turn and reset stage to 'plan'.
  //   if (currentIndex === stagesInOrder.length - 1) {
  //     setBattleStage(stagesInOrder[0]);
  //
  //     if (battleTurn === 'playerOne') {
  //       setBattleTurn('playerTwo');
  //     } else if (battleTurn === 'playerTwo') {
  //       setBattleTurn('playerOne');
  //     }
  //   } else {
  //     // Otherwise, just move to the next stage.
  //     setBattleStage(stagesInOrder[currentIndex + 1]);
  //   }
  // }, [battleStage, battleTurn]);

  const value = useMemo(
    () => ({
      localPlayer,
      setLocalPLayer,
      gameData,
      roomId,
      setRoomId
    }),
    [gameData, localPlayer, roomId]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGameContext() {
  return React.useContext(GameContext);
}
