import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import {
  createDefaultPlayerField,
  PlayerField
} from '~/constants/common/gameTypes';
import DuelingCard from '~/constants/DuelingCard';
import { GameContext } from '~/context/GameContext';
import { useSocket } from '~/context/SocketContext';
import useDiscardCard from '~/hooks/BoardHooks/useDiscardCard';
import { useDrawCards } from '~/hooks/BoardHooks/useDrawCards';
import useGetActivePreReqs from '~/hooks/BoardHooks/useGetActivePreReqs';
import useGetIsCardSlotsFull from '~/hooks/BoardHooks/useGetIsCardSlotsFull';
import usePlaceCard from '~/hooks/BoardHooks/usePlaceCard';
import { PreReq } from '~/models/Card';
import { BoardMessages } from '../../server/boardHandlers/boardHandlers';
import { GameRoom } from '../../server/room';

export type PlaceCardFunction = (card: DuelingCard) => void;
export type DiscardCardFunction = (
  cardId: string,
  source: 'resources' | 'army' | 'champions' | 'foundations'
) => void;

export type BoardContextType = {
  activePreReqs: PreReq[];
  attackedThisRound: string[];
  directHitThisRound: boolean;
  enemyBoard: PlayerField;
  localBoard: PlayerField;
  playerOneBoard: PlayerField;
  playerTwoBoard: PlayerField;
  playerOneDraw: (mdDraw: number, fdDraw: number) => void;
  playerTwoDraw: (mdDraw: number, fdDraw: number) => void;
  setAttackedThisRound: React.Dispatch<React.SetStateAction<string[]>>;
  setDirectHitThisRound: React.Dispatch<React.SetStateAction<boolean>>;
  setPlayerOneBoard: React.Dispatch<React.SetStateAction<PlayerField>>;
  setPlayerTwoBoard: React.Dispatch<React.SetStateAction<PlayerField>>;
  placeCard: PlaceCardFunction;
  discardCard: DiscardCardFunction;
  getIsBoardSlotFull: (card: DuelingCard) => Boolean;
};

const defaultBoard: BoardContextType = {
  activePreReqs: [],
  attackedThisRound: [],
  directHitThisRound: false,
  enemyBoard: { ...createDefaultPlayerField() },
  localBoard: { ...createDefaultPlayerField() },
  playerOneBoard: { ...createDefaultPlayerField() },
  playerTwoBoard: { ...createDefaultPlayerField() },
  playerOneDraw() {},
  playerTwoDraw() {},
  setAttackedThisRound() {},
  setDirectHitThisRound() {},
  setPlayerOneBoard() {},
  setPlayerTwoBoard() {},
  placeCard() {},
  discardCard() {},
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
    advanceBattleStage,
    battleTurn,
    localPlayer,
    setGameState,
    battleStage,
    roomId
  } = useContext(GameContext);
  const [activePreReqs, setActivePreReqs] = useState<PreReq[]>([]);
  const [playerOneBoard, setPlayerOneBoard] = useState(
    defaultBoard.playerOneBoard
  );
  const [playerTwoBoard, setPlayerTwoBoard] = useState(
    defaultBoard.playerTwoBoard
  );
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

  const socket = useSocket();

  const { playerTwoDraw, playerOneDraw } = useDrawCards({
    playerOneBoard,
    setPlayerOneBoard,
    playerTwoBoard,
    setPlayerTwoBoard
  });

  const { place } = usePlaceCard({
    playerOneBoard,
    setPlayerOneBoard,
    playerTwoBoard,
    setPlayerTwoBoard,
    playerTurn: battleTurn
  });

  const { discard, respiteDiscard } = useDiscardCard({
    playerOneBoard,
    setPlayerOneBoard,
    playerTwoBoard,
    setPlayerTwoBoard,
    playerTurn: battleTurn
  });

  const { getIsBoardSlotFull } = useGetIsCardSlotsFull({
    playerOneBoard,
    playerTwoBoard,
    localPlayer
  });

  useGetActivePreReqs({
    playerBoard: localPlayer === 'playerOne' ? playerOneBoard : playerTwoBoard,
    setActivePreReqs
  });

  const value = useMemo(
    () => ({
      activePreReqs,
      attackedThisRound,
      directHitThisRound,
      enemyBoard,
      localBoard,
      playerOneBoard,
      playerTwoBoard,
      playerOneDraw,
      playerTwoDraw,
      setAttackedThisRound,
      setDirectHitThisRound,
      setPlayerOneBoard,
      setPlayerTwoBoard,
      placeCard: place,
      discardCard: discard,
      getIsBoardSlotFull
    }),
    [
      activePreReqs,
      attackedThisRound,
      directHitThisRound,
      discard,
      enemyBoard,
      getIsBoardSlotFull,
      localBoard,
      place,
      playerOneBoard,
      playerOneDraw,
      playerTwoBoard,
      playerTwoDraw
    ]
  );

  useEffect(() => {
    if (!socket) return;

    // Subscribe to the event
    socket.on(BoardMessages.BoardSetUp, (data: GameRoom) => {
      setPlayerOneBoard({ ...data.playerOneBoard });
      setPlayerTwoBoard({ ...data.playerTwoBoard });
      setGameState(data.gameState);
    });

    socket.on(BoardMessages.Update, data => {
      setPlayerOneBoard({ ...data.playerOneBoard });
      setPlayerTwoBoard({ ...data.playerTwoBoard });
    });
  }, [setGameState, socket]);

  useEffect(() => {
    setAttackedThisRound([]);
    setDirectHitThisRound(false);
  }, [battleTurn]);

  useEffect(() => {
    if (!localPlayer) return;
    setLocalBoard(prevBoard =>
      localPlayer === 'playerOne'
        ? { ...prevBoard, ...playerOneBoard }
        : { ...prevBoard, ...playerTwoBoard }
    );
    setEnemyBoard(prevBoard =>
      localPlayer === 'playerOne'
        ? { ...prevBoard, ...playerTwoBoard }
        : { ...prevBoard, ...playerOneBoard }
    );
  }, [localPlayer, playerOneBoard, playerTwoBoard]);

  useEffect(() => {
    if (localPlayer === battleTurn && battleStage === 'respite') {
      if (socket) {
        socket.emit(BoardMessages.Respite, roomId, localPlayer);
      } else {
        respiteDiscard();
        advanceBattleStage();
      }
    }
  }, [
    advanceBattleStage,
    battleStage,
    battleTurn,
    localPlayer,
    respiteDiscard,
    roomId,
    socket
  ]);

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
}

export function useBoardContext() {
  return React.useContext(BoardContext);
}
