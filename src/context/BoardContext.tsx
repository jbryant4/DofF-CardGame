import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import DuelingCard from '~/constants/DuelingCard';
import { GameContext } from '~/context/GameContext';
import { useSetupBoard } from '~/hooks/BoardHooks';
import useDiscardCard from '~/hooks/BoardHooks/useDiscardCard';
import { useDrawCards } from '~/hooks/BoardHooks/useDrawCards';
import usePlaceCard from '~/hooks/BoardHooks/usePlaceCard';

export type PlayerField = {
  mainDeck: DuelingCard[];
  foundationDeck: DuelingCard[];
  hand: DuelingCard[];
  graveyard: DuelingCard[];
  army: Array<DuelingCard | null>;
  champions: Array<DuelingCard | null>;
  foundations: Array<DuelingCard | null>;
  resources: Array<DuelingCard | null>;
};

const defaultPlayerField = {
  mainDeck: [],
  foundationDeck: [],
  hand: [],
  graveyard: [],
  army: [null, null, null],
  champions: [null, null, null],
  foundations: [null, null, null, null],
  resources: [null, null]
};

export type PlaceCardFunction = (card: DuelingCard) => void;
export type DiscardCardFunction = (
  cardId: string,
  source: 'resources' | 'army' | 'champions' | 'foundations'
) => void;

export type BoardContextType = {
  playerOneBoard: PlayerField;
  playerTwoBoard: PlayerField;
  playerOneDraw: (mdDraw: number, fdDraw: number) => void;
  playerTwoDraw: (mdDraw: number, fdDraw: number) => void;
  setPlayerOneBoard: React.Dispatch<React.SetStateAction<PlayerField>>;
  setPlayerTwoBoard: React.Dispatch<React.SetStateAction<PlayerField>>;
  placeCard: PlaceCardFunction;
  discardCard: DiscardCardFunction;
};

const defaultBoard: BoardContextType = {
  playerOneBoard: defaultPlayerField,
  playerTwoBoard: defaultPlayerField,
  playerOneDraw() {},
  playerTwoDraw() {},
  setPlayerOneBoard() {},
  setPlayerTwoBoard() {},
  placeCard() {},
  discardCard() {}
};

export const BoardContext = createContext<BoardContextType>(defaultBoard);

type Props = {
  children: React.ReactNode;
};

export function BoardProvider({ children }: Props) {
  const { gameState, battleTurn } = useContext(GameContext);
  const [playerOneBoard, setPlayerOneBoard] = useState(
    defaultBoard.playerOneBoard
  );
  const [playerTwoBoard, setPlayerTwoBoard] = useState(
    defaultBoard.playerTwoBoard
  );
  const [decksMade, setDecksMade] = useState(false);

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

  const { discard, respiteDiscard } = useDiscardCard({
    playerOneBoard,
    setPlayerOneBoard,
    playerTwoBoard,
    setPlayerTwoBoard,
    playerTurn: battleTurn
  });

  const value = useMemo(
    () => ({
      playerOneBoard,
      playerTwoBoard,
      playerOneDraw,
      playerTwoDraw,
      setPlayerOneBoard,
      setPlayerTwoBoard,
      placeCard: place,
      discardCard: discard
    }),
    [
      discard,
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

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
}
