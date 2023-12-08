import { useCallback } from 'react';
import {
  defaultDuelist,
  defaultPlayerField
} from '~/constants/common/gameTypes';
import { Africa } from '~/constants/starterDecks';
import { useBoardContext } from '~/context/BoardContext';
import { useGameContext } from '~/context/GameContext';
import devDuelingCards from '../../../server/utils/devDuelingCards';

export const useSetupAdminBoard = () => {
  const {
    setGameState,
    setBattleStage,
    setBattleTurn,
    setLocalPLayer,
    updatePlayerOne,
    updatePlayerTwo
  } = useGameContext();
  const { setPlayerOneBoard, setPlayerTwoBoard } = useBoardContext();

  return useCallback(() => {
    // convert deck id arrays to DuelingCardp[]
    const adminDeck = devDuelingCards.filter(card =>
      Africa.cards.includes(card.id)
    );
    //setup admin game context
    updatePlayerOne({ ...defaultDuelist, id: 'Monkey', userName: 'Monkey' });
    updatePlayerTwo({ ...defaultDuelist, id: 'Donkey', userName: 'Donkey' });

    // update the board state
    const mainDeck = adminDeck.filter(card => card.type !== 'foundation');
    const foundationDeck = adminDeck.filter(card => card.type === 'foundation');

    setPlayerOneBoard({
      ...defaultPlayerField,
      mainDeck: mainDeck.slice(5),
      foundationDeck: foundationDeck.slice(2),
      hand: [
        ...adminDeck.filter(card => card.type === 'army').slice(0, 2),
        ...adminDeck.filter(card => card.type === 'champion').slice(4, 6),
        mainDeck[0],
        ...foundationDeck.slice(1, 4)
      ]
    });

    setPlayerTwoBoard({
      ...defaultPlayerField,
      mainDeck: adminDeck.filter(card => card.type !== 'foundation'),
      foundationDeck: adminDeck.filter(card => card.type === 'foundation'),
      army: [...adminDeck.filter(card => card.type === 'army').slice(0, 3)],
      champions: [
        ...adminDeck.filter(card => card.type === 'champion').slice(0, 3)
      ],
      foundations: [
        ...adminDeck.filter(card => card.type === 'foundation').slice(0, 4)
      ],
      resources: [
        ...adminDeck.filter(card => card.type === 'resource').slice(0, 2)
      ]
    });

    // set battle state to start the game
    setLocalPLayer('playerOne');
    setGameState('Battle');
    setBattleStage('plan');
    setBattleTurn('playerOne');
  }, [
    setBattleStage,
    setBattleTurn,
    setGameState,
    setLocalPLayer,
    setPlayerOneBoard,
    setPlayerTwoBoard,
    updatePlayerOne,
    updatePlayerTwo
  ]);
};
