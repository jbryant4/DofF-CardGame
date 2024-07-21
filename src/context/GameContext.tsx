import { onValue } from '@firebase/database';
import { get, ref } from 'firebase/database';
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState
} from 'react';
import { rtdb } from '@firebaseUiConfig';
import {
  defaultRTgameDynamic,
  defaultRTGameStatic,
  GameState,
  Players,
  RTgame,
  RTgameDynamic,
  RTgameStatic
} from '@shared/gameTypes';
import { useCollectorContext } from '~/context/CollectorContext';
import useLoadableState, {
  defaultLoadableState,
  LoadableState
} from '~/utils/useLoadableState';

type GameContextType = {
  // advanceBattleStage: () => void;
  dynamicGameData: LoadableState<RTgameDynamic>;
  localPlayer: LoadableState<Players>;
  roomId: string;
  setRoomId: Dispatch<SetStateAction<string>>;
  staticGameData: LoadableState<RTgameStatic>;
};

const defaultGameContext: GameContextType = {
  // advanceBattleStage() {},
  dynamicGameData: defaultLoadableState({ ...defaultRTgameDynamic }),
  localPlayer: defaultLoadableState<Players>(''),
  roomId: '',
  setRoomId() {},
  staticGameData: defaultLoadableState({ ...defaultRTGameStatic })
};

export const GameContext = createContext<GameContextType>(defaultGameContext);

type Props = {
  children: React.ReactNode;
};

export function GameProvider({ children }: Props) {
  const dynamicGameData = useLoadableState<RTgameDynamic>({
    ...defaultGameContext.dynamicGameData.data
  });
  const staticGameData = useLoadableState<RTgameStatic>({
    ...defaultGameContext.staticGameData.data
  });
  const localPlayer = useLoadableState<Players>('');
  const [roomId, setRoomId] = useState(defaultGameContext.roomId);
  const {
    collector: { data: collector }
  } = useCollectorContext();

  useEffect(() => {
    if (!roomId) return; // Guard clause to ensure roomId is present
    dynamicGameData.setLoading();
    const dynamicDataRef = ref(rtdb, `games/${roomId}/dynamic`);

    // Subscribe to Firebase and handle data updates
    const unsubscribe = onValue(
      dynamicDataRef,
      snapshot => {
        if (snapshot.exists()) {
          dynamicGameData.setData(prevState => ({
            ...prevState,
            ...(snapshot.val() as RTgameDynamic)
          }));
        }
      },
      error => {
        console.error('Firebase subscription error:', error);
        dynamicGameData.setError(error);
      }
    );

    // Cleanup function to unsubscribe from Firebase updates
    return () => unsubscribe();
  }, [dynamicGameData, roomId]); // Dependencies include gameData and roomId

  useEffect(() => {
    if (collector === null) return;
    if (!staticGameData.isLoaded) return;
    localPlayer.setLoading();
    if (collector.id === staticGameData.data.player1Id) {
      localPlayer.setData('player1');
    }

    if (collector.id === staticGameData.data.player2Id) {
      localPlayer.setData('player2');
    }
  }, [
    collector,
    localPlayer,
    staticGameData.data.player1Id,
    staticGameData.data.player2Id,
    staticGameData.isLoaded
  ]);

  useEffect(() => {
    if (dynamicGameData.data.gameState === GameState.PreLobby) return;
    if (staticGameData.isLoaded) return;
    if (!roomId) return;

    const fetchStaticData = async () => {
      const staticDataRef = ref(rtdb, `games/${roomId}/static`);
      try {
        const snapshot = await get(staticDataRef);
        if (snapshot.exists()) {
          staticGameData.setData(snapshot.val() as RTgameStatic);
        }
      } catch (error) {
        console.error('Error fetching static game data:', error);
        staticGameData.setError(
          error instanceof Error ? error : new Error('Unknown error')
        );
      }
    };

    void fetchStaticData();
  }, [dynamicGameData, roomId, staticGameData]);

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
  //     if (battleTurn === 'player1') {
  //       setBattleTurn('player2');
  //     } else if (battleTurn === 'player2') {
  //       setBattleTurn('player1');
  //     }
  //   } else {
  //     // Otherwise, just move to the next stage.
  //     setBattleStage(stagesInOrder[currentIndex + 1]);
  //   }
  // }, [battleStage, battleTurn]);

  const value = useMemo(
    () => ({
      dynamicGameData,
      localPlayer,
      roomId,
      setRoomId,
      staticGameData
    }),
    [dynamicGameData, localPlayer, roomId, staticGameData]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGameContext() {
  return React.useContext(GameContext);
}
