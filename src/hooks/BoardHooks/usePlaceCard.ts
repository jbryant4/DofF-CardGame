import { useCallback } from 'react';
import { Players } from '~/constants/common/gameTypes';
import { BoardContextType, PlaceCardFunction } from '~/context/BoardContext';
import { DuelingCard } from '~/contracts/card';

type OwnProps = Pick<
  BoardContextType,
  | 'playerOneBoard'
  | 'setPlayerOneBoard'
  | 'playerTwoBoard'
  | 'setPlayerTwoBoard'
> & {
  playerTurn: Players;
};

const usePlaceCard = ({
  playerOneBoard,
  playerTwoBoard,
  setPlayerOneBoard,
  setPlayerTwoBoard,
  playerTurn
}: OwnProps) => {
  const placeCardInSlot = (
    boardSection: (DuelingCard | null)[],
    card: DuelingCard
  ) => {
    const slotIndex = boardSection.findIndex(slot => slot === null);
    if (slotIndex !== -1) {
      const updatedSection = [...boardSection];
      updatedSection[slotIndex] = card;

      return updatedSection;
    }

    return boardSection;
  };

  const place: PlaceCardFunction = useCallback(
    (card: DuelingCard) => {
      const boardToUse =
        playerTurn === 'playerOne' ? playerOneBoard : playerTwoBoard;
      const setBoardToUse =
        playerTurn === 'playerOne' ? setPlayerOneBoard : setPlayerTwoBoard;

      const updatedHand = boardToUse.hand.filter(
        handCard => handCard.id !== card.id
      );

      let updatedSection: (DuelingCard | null)[] = [];
      switch (card.type) {
        case 'resource':
          updatedSection = placeCardInSlot(boardToUse.resources, card);
          setBoardToUse(prevBoard => ({
            ...prevBoard,
            resources: updatedSection,
            hand: updatedHand
          }));
          break;

        case 'foundation':
          updatedSection = placeCardInSlot(boardToUse.foundations, card);
          setBoardToUse(prevBoard => ({
            ...prevBoard,
            foundations: updatedSection,
            hand: updatedHand
          }));
          break;

        case 'army':
          updatedSection = placeCardInSlot(boardToUse.army, card);
          setBoardToUse(prevBoard => ({
            ...prevBoard,
            army: updatedSection,
            hand: updatedHand
          }));
          break;

        case 'champion':
          updatedSection = placeCardInSlot(boardToUse.champions, card);
          setBoardToUse(prevBoard => ({
            ...prevBoard,
            champions: updatedSection,
            hand: updatedHand
          }));
          break;

        default:
          break;
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
