import { useCallback } from 'react';
import DuelingCard from '~/constants/DuelingCard';
import { BoardContextType, PlaceCardFunction } from '~/context/BoardContext';
import { Players } from '~/context/GameContext';

type OwnProps = Omit<BoardContextType, 'placeCard'> & {
  playerTurn: Players;
};
const usePlaceCard = ({
  playerOneBoard,
  playerTwoBoard,
  setPlayerOneBoard,
  setPlayerTwoBoard,
  playerTurn
}: OwnProps) => {
  const place: PlaceCardFunction = useCallback(
    (card: DuelingCard) => {
      const boardToUse =
        playerTurn === 'playerOne' ? playerOneBoard : playerTwoBoard;
      const setBoardToUse =
        playerTurn === 'playerOne' ? setPlayerOneBoard : setPlayerTwoBoard;

      const updatedHand = boardToUse.hand.filter(
        handCard => handCard.id !== card.id
      );

      if (card.type === 'resource') {
        const updatedResources = [...boardToUse.resources];
        const slotIndex = updatedResources.findIndex(slot => slot === null);
        if (slotIndex !== -1) {
          updatedResources[slotIndex] = card;
          setBoardToUse(prevBoard => ({
            ...prevBoard,
            resources: updatedResources,
            hand: updatedHand
          }));
        }
      }

      if (card.type === 'foundation') {
        const updatedFoundation = [...boardToUse.foundations];
        const slotIndex = updatedFoundation.findIndex(slot => slot === null);
        if (slotIndex !== -1) {
          updatedFoundation[slotIndex] = card;
          setBoardToUse(prevBoard => ({
            ...prevBoard,
            foundations: updatedFoundation,
            hand: updatedHand
          }));
        }
      }

      if (card.type === 'army') {
        const updatedArmy = [...boardToUse.army];
        const slotIndex = updatedArmy.findIndex(slot => slot === null);
        if (slotIndex !== -1) {
          updatedArmy[slotIndex] = card;
          setBoardToUse(prevBoard => ({
            ...prevBoard,
            army: updatedArmy,
            hand: updatedHand
          }));
        }
      }

      if (card.type === 'champion') {
        const updatedChampion = [...boardToUse.champions];
        const slotIndex = updatedChampion.findIndex(slot => slot === null);
        console.log(slotIndex);
        if (slotIndex !== -1) {
          updatedChampion[slotIndex] = card;
          setBoardToUse(prevBoard => ({
            ...prevBoard,
            champions: updatedChampion,
            hand: updatedHand
          }));
        }
      }
    },
    [
      playerOneBoard,
      setPlayerOneBoard,
      playerTwoBoard,
      setPlayerTwoBoard,
      playerTurn
    ]
  );

  return { place };
};

export default usePlaceCard;
