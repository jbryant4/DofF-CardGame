import React, { useCallback, useContext } from 'react';
import { BoardContext, PlayerField } from '~/context/BoardContext';
import { GameContext } from '~/context/GameContext';
import { useDrawCards } from '~/hooks/BoardHooks/useDrawCards';
import shuffleDeck from '~/utils/shuffleDeck';
import { useMakeDuelingDeck } from './useMakeDuelingDeck';

export const useSetupBoard = (
  setPlayerOneBoard: React.Dispatch<React.SetStateAction<PlayerField>>,
  setPlayerTwoBoard: React.Dispatch<React.SetStateAction<PlayerField>>
) => {
  const {
    playerOne: {
      deck: { cards: playerOneDeckIds }
    },
    playerTwo: {
      deck: { cards: playerTwoDeckIds }
    },
    setBattleStage,
    setBattleTurn
  } = useContext(GameContext);
  const makeDuelingDeck = useMakeDuelingDeck();

  const setupTheBoard = useCallback(() => {
    // convert deck id arrays to DuelingCardp[]
    const playerOneDeck = makeDuelingDeck(playerOneDeckIds, 'One');
    const playerTwoDeck = makeDuelingDeck(playerTwoDeckIds, 'Two');

    //make foundation and main decks
    console.log(
      shuffleDeck(playerOneDeck.filter(card => card.type !== 'foundation')),
      shuffleDeck(playerOneDeck.filter(card => card.type === 'foundation')),
      'in use hook '
    );
    // update the board state
    setPlayerOneBoard(prevState => ({
      ...prevState,
      mainDeck: shuffleDeck(
        playerOneDeck.filter(card => card.type !== 'foundation')
      ),
      foundationDeck: shuffleDeck(
        playerOneDeck.filter(card => card.type === 'foundation')
      )
    }));

    setPlayerTwoBoard(prevState => ({
      ...prevState,
      mainDeck: shuffleDeck(
        playerTwoDeck.filter(card => card.type !== 'foundation')
      ),
      foundationDeck: shuffleDeck(
        playerTwoDeck.filter(card => card.type === 'foundation')
      )
    }));

    // set battle state to start the game
    setBattleStage('plan');
    setBattleTurn('playerOne');
  }, [
    makeDuelingDeck,
    playerOneDeckIds,
    playerTwoDeckIds,
    setBattleStage,
    setBattleTurn,
    setPlayerOneBoard,
    setPlayerTwoBoard
  ]);

  return setupTheBoard;
};
