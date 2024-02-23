import { useCallback } from 'react';
import { Players } from '~/constants/common/gameTypes';
import { BoardContextType, DiscardCardFunction } from '~/context/BoardContext';
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

const useDiscardCard = ({
  playerOneBoard,
  playerTwoBoard,
  setPlayerOneBoard,
  setPlayerTwoBoard,
  playerTurn
}: OwnProps) => {
  const discard: DiscardCardFunction = useCallback(
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
    const boardsToUse = [playerOneBoard, playerTwoBoard];
    const setBoardsToUse = [setPlayerOneBoard, setPlayerTwoBoard];
    const removeResource =
      playerTurn === 'playerOne' ? [true, false] : [false, true];
    boardsToUse.forEach((boardToUse, index) => {
      const sectionsToCheck = ['resources', 'army', 'champions'];
      let cardsToDiscard: DuelingCard[] = [];

      sectionsToCheck.forEach(sectionName => {
        const section = boardToUse[sectionName];
        section.forEach((card: DuelingCard, idx: string | number) => {
          if (card) {
            if (
              (sectionName === 'resources' &&
                card.faceUp &&
                removeResource[index]) ||
              (card.hp && card.hp <= 0)
            ) {
              cardsToDiscard.push(card);
              section[idx] = null;
            }
          }
        });
      });

      const updatedGraveyard = [...cardsToDiscard, ...boardToUse.graveyard];
      setBoardsToUse[index](prevBoard => ({
        ...prevBoard,
        graveyard: updatedGraveyard
      }));
    });
  }, [
    playerOneBoard,
    playerTurn,
    playerTwoBoard,
    setPlayerOneBoard,
    setPlayerTwoBoard
  ]);

  return { discard, respiteDiscard };
};

export default useDiscardCard;
