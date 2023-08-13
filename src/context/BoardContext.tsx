import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import DuelingCard, { desiredKeys } from '~/constants/DuelingCard';
import { GameContext } from '~/context/GameContext';
import { useSetupBoard } from '~/hooks/BoardHooks';

export type PlayerField = {
  mainDeck: DuelingCard[];
  foundationDeck: DuelingCard[];
  hand: DuelingCard[];
  graveyard: DuelingCard[];
  board: {
    army: Array<DuelingCard | null>;
    champion: Array<DuelingCard | null>;
    foundation: Array<DuelingCard | null>;
    resource: Array<DuelingCard | null>;
  };
};

const defaultPlayerField = {
  mainDeck: [],
  foundationDeck: [],
  hand: [],
  graveyard: [],
  board: {
    army: [null, null, null],
    champion: [null, null, null],
    foundation: [null, null, null, null],
    resource: [null, null]
  }
};

type BoardContextType = {
  playerOneBoard: PlayerField;
  playerTwoBoard: PlayerField;
};

const defaultBoard: BoardContextType = {
  playerOneBoard: defaultPlayerField,
  playerTwoBoard: defaultPlayerField
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

  const setupTheBoard = useSetupBoard(setPlayerOneBoard, setPlayerTwoBoard);

  const value = useMemo(
    () => ({
      playerOneBoard,
      playerTwoBoard
    }),

    [playerOneBoard, playerTwoBoard]
  );

  useEffect(() => {
    if (gameState !== 'Battle') return;
    setupTheBoard();
  }, [gameState, setupTheBoard]);

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
}
