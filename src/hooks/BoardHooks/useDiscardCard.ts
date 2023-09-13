import { useCallback } from 'react';
import DuelingCard from '~/constants/DuelingCard';
import { BoardContextType, DiscardCardFunction } from '~/context/BoardContext';
import { Players } from '~/context/GameContext';

type OwnProps = Pick<
  BoardContextType,
  | 'playerOneBoard'
  | 'setPlayerOneBoard'
  | 'playerTwoBoard'
  | 'setPlayerTwoBoard'
> & {
  playerTurn: Players;
};

const useDiscardCard = ({
  playerOneBoard,
  playerTwoBoard,
  setPlayerOneBoard,
  setPlayerTwoBoard,
  playerTurn
}: OwnProps) => {
  const discard = useCallback(
    (
      cardId: string,
      source: 'resources' | 'army' | 'champions' | 'foundations'
    ) => {
      const boardToUse =
        playerTurn === 'playerOne' ? playerOneBoard : playerTwoBoard;
      const setBoardToUse =
        playerTurn === 'playerOne' ? setPlayerOneBoard : setPlayerTwoBoard;

      const section = boardToUse[source];
      const cardIndex = section.findIndex(card => card && card.id === cardId);

      if (cardIndex !== -1) {
        const discardedCard = section[cardIndex] as DuelingCard; // <-- Type assertion here
        const updatedSection = [...section];
        updatedSection[cardIndex] = null;

        const updatedGraveyard = [discardedCard, ...boardToUse.graveyard];

        setBoardToUse(prevBoard => ({
          ...prevBoard,
          [source]: updatedSection,
          graveyard: updatedGraveyard
        }));
      }
    },
    [
      playerOneBoard,
      playerTwoBoard,
      playerTurn,
      setPlayerOneBoard,
      setPlayerTwoBoard
    ]
  );

  const respiteDiscard = useCallback(() => {
    const boardToUse =
      playerTurn === 'playerOne' ? playerOneBoard : playerTwoBoard;
    const setBoardToUse =
      playerTurn === 'playerOne' ? setPlayerOneBoard : setPlayerTwoBoard;

    const sectionsToCheck = ['resources', 'army', 'champions'];
    let cardsToDiscard: DuelingCard[] = [];

    sectionsToCheck.forEach(sectionName => {
      const section = boardToUse[sectionName];
      section.forEach((card: DuelingCard, index: string | number) => {
        if (card && card.hp === 0) {
          cardsToDiscard.push(card);
          section[index] = null;
        }
      });
    });

    // Randomizing the cardsToDiscard array
    cardsToDiscard.sort(() => Math.random() - 0.5);

    const updatedGraveyard = [...cardsToDiscard, ...boardToUse.graveyard];
    setBoardToUse(prevBoard => ({
      ...prevBoard,
      graveyard: updatedGraveyard
    }));
  }, [
    playerOneBoard,
    playerTwoBoard,
    playerTurn,
    setPlayerOneBoard,
    setPlayerTwoBoard
  ]);

  return { discard, respiteDiscard };
};

export default useDiscardCard;
