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
import { useDrawCards } from '~/hooks/BoardHooks/useDrawCards';

export type PlayerField = {
  mainDeck: DuelingCard[];
  foundationDeck: DuelingCard[];
  hand: DuelingCard[];
  graveyard: DuelingCard[];
  board: {
    army: Array<DuelingCard | null>;
    champions: Array<DuelingCard | null>;
    foundations: Array<DuelingCard | null>;
    resources: Array<DuelingCard | null>;
  };
};

const defaultPlayerField = {
  mainDeck: [],
  foundationDeck: [],
  hand: [],
  graveyard: [],
  board: {
    army: [null, null, null],
    champions: [null, null, null],
    foundations: [null, null, null, null],
    resources: [null, null]
  }
};

export type BoardContextType = {
  playerOneBoard: PlayerField;
  playerTwoBoard: PlayerField;
  setPlayerOneBoard: React.Dispatch<React.SetStateAction<PlayerField>>;
  setPlayerTwoBoard: React.Dispatch<React.SetStateAction<PlayerField>>;
};

const defaultBoard: BoardContextType = {
  playerOneBoard: defaultPlayerField,
  playerTwoBoard: defaultPlayerField,
  setPlayerOneBoard() {},
  setPlayerTwoBoard() {}
};

export const BoardContext = createContext<BoardContextType>(defaultBoard);

type Props = {
  children: React.ReactNode;
};

export function BoardProvider({ children }: Props) {
  const { gameState } = useContext(GameContext);
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

  const value = useMemo(
    () => ({
      playerOneBoard,
      playerTwoBoard,
      setPlayerOneBoard,
      setPlayerTwoBoard
    }),
    [playerOneBoard, playerTwoBoard]
  );

  const decksDrawnRef = useRef(false);

  useEffect(() => {
    if (!decksMade || decksDrawnRef.current) return;
    console.log('should draw');
    playerOneDraw(5, 2);
    playerTwoDraw(5, 2);
    decksDrawnRef.current = true;
  }, [decksMade, playerOneDraw, playerTwoDraw]);

  useEffect(() => {
    if (gameState !== 'Battle') return;
    console.log('in useeffect');

    setupTheBoard();
    setDecksMade(true);
  }, [gameState, setupTheBoard]);

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
}
