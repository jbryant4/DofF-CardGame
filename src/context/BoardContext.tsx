import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { defaultPlayerField, PlayerField } from '~/constants/common/gameTypes';
import DuelingCard from '~/constants/DuelingCard';
import { GameContext } from '~/context/GameContext';
import { useSocket } from '~/context/SocketContext';
import { useSetupBoard } from '~/hooks/BoardHooks';
import useDiscardCard from '~/hooks/BoardHooks/useDiscardCard';
import { useDrawCards } from '~/hooks/BoardHooks/useDrawCards';
import useGetActivePreReqs from '~/hooks/BoardHooks/useGetActivePreReqs';
import useGetIsCardSlotsFull from '~/hooks/BoardHooks/useGetIsCardSlotsFull';
import usePlaceCard from '~/hooks/BoardHooks/usePlaceCard';
import { PreReq } from '~/models/Card';
import { PreGameMessages } from '../../server/preGameHandlers/preGameHandlers';
import { GameRoom } from '../../server/room';

export type PlaceCardFunction = (card: DuelingCard) => void;
export type DiscardCardFunction = (
  cardId: string,
  source: 'resources' | 'army' | 'champions' | 'foundations'
) => void;

export type BoardContextType = {
  activePreReqs: PreReq[];
  playerOneBoard: PlayerField;
  playerTwoBoard: PlayerField;
  playerOneDraw: (mdDraw: number, fdDraw: number) => void;
  playerTwoDraw: (mdDraw: number, fdDraw: number) => void;
  setPlayerOneBoard: React.Dispatch<React.SetStateAction<PlayerField>>;
  setPlayerTwoBoard: React.Dispatch<React.SetStateAction<PlayerField>>;
  placeCard: PlaceCardFunction;
  discardCard: DiscardCardFunction;
  getIsBoardSlotFull: (card: DuelingCard) => Boolean;
};

const defaultBoard: BoardContextType = {
  activePreReqs: [],
  playerOneBoard: defaultPlayerField,
  playerTwoBoard: defaultPlayerField,
  playerOneDraw() {},
  playerTwoDraw() {},
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
  const { gameState, battleTurn, localPlayer } = useContext(GameContext);
  const [activePreReqs, setActivePreReqs] = useState<PreReq[]>([]);
  const [playerOneBoard, setPlayerOneBoard] = useState(
    defaultBoard.playerOneBoard
  );
  const [playerTwoBoard, setPlayerTwoBoard] = useState(
    defaultBoard.playerTwoBoard
  );
  const [decksMade, setDecksMade] = useState(false);
  const socket = useSocket();

  const setupTheBoard = useSetupBoard(setPlayerOneBoard, setPlayerTwoBoard);

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

  const { discard } = useDiscardCard({
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
      playerOneBoard,
      playerTwoBoard,
      playerOneDraw,
      playerTwoDraw,
      setPlayerOneBoard,
      setPlayerTwoBoard,
      placeCard: place,
      discardCard: discard,
      getIsBoardSlotFull
    }),
    [
      activePreReqs,
      discard,
      getIsBoardSlotFull,
      place,
      playerOneBoard,
      playerOneDraw,
      playerTwoBoard,
      playerTwoDraw
    ]
  );

  const decksDrawnRef = useRef(false);

  useEffect(() => {
    if (!decksMade || decksDrawnRef.current) return;
    playerOneDraw(5, 2);
    playerTwoDraw(5, 2);
    decksDrawnRef.current = true;
  }, [decksMade, playerOneDraw, playerTwoDraw]);

  useEffect(() => {
    if (gameState !== 'Battle') return;

    setupTheBoard();
    setDecksMade(true);
  }, [gameState, setupTheBoard]);

  // useEffect(() => {
  //   if (!socket) return;
  //
  //   // Subscribe to the event
  //   socket.on(PreGameMessages.StartDuel, (data: GameRoom) => {
  //     setPlayerOneBoard({ ...data.playerOneBoard });
  //     setPlayerTwoBoard({ ...data.playerTwoBoard });
  //   });
  //
  //   // Cleanup function to unsubscribe when the component unmounts
  //   return () => {
  //     socket.off(PreGameMessages.StartDuel, () => {});
  //   };
  // }, [socket]);

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
}
