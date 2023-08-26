import { useCallback, useContext } from 'react';
import { BoardContext, BoardContextType } from '~/context/BoardContext';

export const useDrawCards = ({
  playerOneBoard,
  setPlayerOneBoard,
  playerTwoBoard,
  setPlayerTwoBoard
}: BoardContextType) => {
  const drawCards = useCallback(
    (player: string, mdDraw: number, fdDraw: number) => {
      const currentPlayerBoard =
        player === 'playerOne' ? playerOneBoard : playerTwoBoard;
      const setCurrentPlayerBoard =
        player === 'playerOne' ? setPlayerOneBoard : setPlayerTwoBoard;

      const newMainDeck = [...currentPlayerBoard.mainDeck];
      const newFoundationDeck = [...currentPlayerBoard.foundationDeck];
      const newHand = [...currentPlayerBoard.hand];

      // Drawing cards from mainDeck
      const drawnMainCards = newMainDeck.splice(0, mdDraw);
      newHand.push(...drawnMainCards);

      // Drawing cards from foundationDeck
      const drawnFoundationCards = newFoundationDeck.splice(0, fdDraw);
      newHand.push(...drawnFoundationCards);

      setCurrentPlayerBoard(prev => ({
        ...prev,
        mainDeck: newMainDeck,
        foundationDeck: newFoundationDeck,
        hand: newHand
      }));
    },
    [playerOneBoard, playerTwoBoard, setPlayerOneBoard, setPlayerTwoBoard]
  );

  const playerOneDraw = useCallback(
    (mdDraw: number, fdDraw: number) => {
      drawCards('playerOne', mdDraw, fdDraw);
    },
    [drawCards]
  );

  const playerTwoDraw = useCallback(
    (mdDraw: number, fdDraw: number) => {
      drawCards('playerTwo', mdDraw, fdDraw);
    },
    [drawCards]
  );

  return {
    playerOneDraw,
    playerTwoDraw
  };
};
