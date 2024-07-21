import { onValue } from '@firebase/database';
import { ref } from 'firebase/database';
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { rtdb } from '@firebaseUiConfig';
import { DuelingCard, PreReq } from '@shared/cardTypes';
import {
  createDefaultPlayerField,
  defaultRTBoard,
  GameState,
  PlayerField,
  RTBoard
} from '@shared/gameTypes';
import { GameContext } from '~/context/GameContext';
import useGetIsCardSlotsFull from '~/hooks/BoardHooks/useGetIsCardSlotsFull';
import useLoadableState, {
  defaultLoadableState,
  LoadableState
} from '~/utils/useLoadableState';

export type PlaceCardFunction = (card: DuelingCard) => void;
export type DiscardCardFunction = (
  cardId: string,
  source: 'resources' | 'army' | 'champions' | 'foundations'
) => void;

export type BoardContextType = {
  board: LoadableState<RTBoard>;
  activePreReqs: PreReq[];
  attackedThisRound: string[];
  directHitThisRound: boolean;
  localBoard: PlayerField;
  enemyBoard: PlayerField;
  setLocalBoard: Dispatch<SetStateAction<PlayerField>>;
  setEnemyBoard: Dispatch<SetStateAction<PlayerField>>;
  setAttackedThisRound: React.Dispatch<React.SetStateAction<string[]>>;
  setDirectHitThisRound: React.Dispatch<React.SetStateAction<boolean>>;
  getIsBoardSlotFull: (card: DuelingCard) => Boolean;
};

const defaultBoard: BoardContextType = {
  board: defaultLoadableState({ ...defaultRTBoard }),
  activePreReqs: [],
  attackedThisRound: [],
  directHitThisRound: false,
  localBoard: { ...createDefaultPlayerField() },
  enemyBoard: { ...createDefaultPlayerField() },
  setLocalBoard() {},
  setEnemyBoard() {},
  setAttackedThisRound() {},
  setDirectHitThisRound() {},
  getIsBoardSlotFull(_card) {
    return false;
  }
};

export const BoardContext = createContext<BoardContextType>(defaultBoard);

type Props = {
  children: React.ReactNode;
};

export function BoardProvider({ children }: Props) {
  const {
    // advanceBattleStage,
    dynamicGameData: {
      data: { battleTurn, battleStage, gameState }
    },
    localPlayer: { data: localPlayer },
    roomId
  } = useContext(GameContext);
  const board = useLoadableState(defaultBoard.board.data);
  const [activePreReqs, setActivePreReqs] = useState<PreReq[]>([]);
  const [enemyBoard, setEnemyBoard] = useState<PlayerField>(
    defaultBoard.enemyBoard
  );
  const [localBoard, setLocalBoard] = useState<PlayerField>(
    defaultBoard.localBoard
  );
  const [attackedThisRound, setAttackedThisRound] = useState(
    defaultBoard.attackedThisRound
  );
  const [directHitThisRound, setDirectHitThisRound] = useState(
    defaultBoard.directHitThisRound
  );

  useEffect(() => {
    if (!roomId) return; // Guard clause to ensure roomId is present
    if (gameState !== GameState.Battle) return;

    const keys = [
      'p1MainDeck',
      'p1FoundationDeck',
      'p1Hand',
      'p1Graveyard',
      'p1Army',
      'p1Champions',
      'p1Foundations',
      'p1Resources',
      'p2MainDeck',
      'p2FoundationDeck',
      'p2Hand',
      'p2Graveyard',
      'p2Army',
      'p2Champions',
      'p2Foundations',
      'p2Resources'
    ];

    const unsubscribes = keys.map(key => {
      const keyRef = ref(rtdb, `board/${roomId}/${key}`);

      return onValue(
        keyRef,
        snapshot => {
          if (snapshot.exists()) {
            board.setData(prevState => ({
              ...prevState,
              [key]: snapshot.val()
            }));
          }
        },
        error => {
          console.error(`Firebase subscription error for ${key}:`, error);
          board.setError(
            error instanceof Error ? error : new Error('Unknown error')
          );
        }
      );
    });

    // Cleanup function to unsubscribe from Firebase updates
    return () => unsubscribes.forEach(unsubscribe => unsubscribe());
  }, [board, gameState, roomId]);

  useEffect(() => {
    if (!localPlayer) return;
    if (!board.isLoaded) return;
    const isLocalPlayer1 = localPlayer === 'player1';
    const {
      p1MainDeck,
      p1FoundationDeck,
      p1Hand,
      p1Graveyard,
      p1Army,
      p1Champions,
      p1Foundations,
      p1Resources,
      p2MainDeck,
      p2FoundationDeck,
      p2Hand,
      p2Graveyard,
      p2Army,
      p2Champions,
      p2Foundations,
      p2Resources
    } = board.data;

    setLocalBoard({
      mainDeck: isLocalPlayer1 ? p1MainDeck : p2MainDeck,
      foundationDeck: isLocalPlayer1 ? p1FoundationDeck : p2FoundationDeck,
      hand: isLocalPlayer1 ? p1Hand : p2Hand,
      graveyard: isLocalPlayer1 ? p1Graveyard : p2Graveyard,
      army: isLocalPlayer1 ? p1Army : p2Army,
      champions: isLocalPlayer1 ? p1Champions : p2Champions,
      foundations: isLocalPlayer1 ? p1Foundations : p2Foundations,
      resources: isLocalPlayer1 ? p1Resources : p2Resources
    });

    setEnemyBoard({
      mainDeck: isLocalPlayer1 ? p2MainDeck : p1MainDeck,
      foundationDeck: isLocalPlayer1 ? p2FoundationDeck : p1FoundationDeck,
      hand: isLocalPlayer1 ? p2Hand : p1Hand,
      graveyard: isLocalPlayer1 ? p2Graveyard : p1Graveyard,
      army: isLocalPlayer1 ? p2Army : p1Army,
      champions: isLocalPlayer1 ? p2Champions : p1Champions,
      foundations: isLocalPlayer1 ? p2Foundations : p1Foundations,
      resources: isLocalPlayer1 ? p2Resources : p1Resources
    });
  }, [board.data, board.isLoaded, localPlayer]);

  const { getIsBoardSlotFull } = useGetIsCardSlotsFull(localBoard);

  const value: BoardContextType = useMemo(
    () => ({
      board,
      activePreReqs,
      attackedThisRound,
      directHitThisRound,
      getIsBoardSlotFull,
      localBoard,
      enemyBoard,
      setLocalBoard,
      setEnemyBoard,
      setAttackedThisRound,
      setDirectHitThisRound
    }),
    [
      activePreReqs,
      attackedThisRound,
      board,
      directHitThisRound,
      enemyBoard,
      getIsBoardSlotFull,
      localBoard
    ]
  );

  useEffect(() => {
    setAttackedThisRound([]);
    setDirectHitThisRound(false);
  }, [battleTurn]);

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
}

export function useBoardContext() {
  return React.useContext(BoardContext);
}
