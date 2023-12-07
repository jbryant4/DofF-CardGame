import { PlayerField } from '~/constants/common/gameTypes';
import DuelingCard from '~/constants/DuelingCard';

function placeCardUtils(
  boardSection: (DuelingCard | null)[],
  card: DuelingCard
): (DuelingCard | null)[] {
  const slotIndex = boardSection.findIndex(slot => slot === null);
  if (slotIndex !== -1) {
    const updatedSection = [...boardSection];
    updatedSection[slotIndex] = card;

    return updatedSection;
  }

  return boardSection;
}

export default function updateBoardSection(
  board: PlayerField,
  card: DuelingCard
): PlayerField {
  switch (card.type) {
    case 'resource':
      return { ...board, resources: placeCardUtils(board.resources, card) };
    case 'foundation':
      return {
        ...board,
        foundations: placeCardUtils(board.foundations, card)
      };
    case 'army':
      return { ...board, army: placeCardUtils(board.army, card) };
    case 'champion':
      return { ...board, champions: placeCardUtils(board.champions, card) };
    default:
      return board;
  }
}
