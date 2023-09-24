import { Fragment, useContext } from 'react';
import styles from '@/DuelOfFates/Battle/BattleField.module.css';
import DuelingCard from '~/constants/DuelingCard';
import duelingCard from '~/constants/DuelingCard';
import { BoardContext } from '~/context/BoardContext';
import { GameContext } from '~/context/GameContext';
import DesertFoundationIcon from '~/icons/DesertFoundationIcon';
import EarthFoundationIcon from '~/icons/EarthFoundationIcon';
import OceanFoundationIcon from '~/icons/OceanFoundationIcon';
import { Foundation } from '~/models/Card';

type OwnProps = {
  cards: (DuelingCard | null)[];
};
const iconToUse = (name: Foundation, size: number) => {
  switch (true) {
    case name === 'desert':
      return <DesertFoundationIcon size={size} />;
    case name === 'ocean':
      return <OceanFoundationIcon size={size} />;
    case name === 'earth':
      return <EarthFoundationIcon size={size} />;
  }
};

const FoundationCards = ({ cards }: OwnProps) => {
  const iconWidth = (window.innerWidth / 14) * 0.65;
  const { localPlayer, battleTurn, battleStage } = useContext(GameContext);
  const {
    discardCard,
    setPlayerOneBoard,
    setPlayerTwoBoard,
    playerOneBoard,
    playerTwoBoard
  } = useContext(BoardContext);

  const boardToUse =
    localPlayer === 'playerOne' ? playerOneBoard : playerTwoBoard;
  const setBoardToUse =
    localPlayer === 'playerOne' ? setPlayerOneBoard : setPlayerTwoBoard;

  return (
    <div
      className={`${styles.foundation} grid grid-rows-4 px-8 relative items-center`}
    >
      {cards.map((card, index) => {
        const cardShouldBeClickable =
          !card?.faceUp &&
          localPlayer === battleTurn &&
          (battleStage === 'place' || battleStage === 'duel');

        const handleFoundationCardFlip = () => {
          if (!card) return;
          const newFoundation: (DuelingCard | null)[] =
            boardToUse.foundations.map(resource =>
              resource && resource.id === card.id
                ? { ...resource, faceUp: true }
                : resource
            );
          setBoardToUse(prevState => ({
            ...prevState,
            foundations: newFoundation
          }));
        };

        if (!card) {
          return (
            <div
              key={`foundation-${index}`}
              style={{ width: iconWidth, height: iconWidth }}
              className="border border-black border-solid flex items-center justify-center rounded-full"
            >
              slot {index}
            </div>
          );
        }

        return (
          <Fragment key={`foundation-${index}`}>
            <div className="flex items-center justify-center">
              {card.foundation && card.faceUp ? (
                <div
                  onClick={() => {
                    if (battleStage === 'duel' && card.faceUp) {
                      discardCard(card.id, 'foundations');
                    }
                  }}
                >
                  {iconToUse(card.foundation[0], iconWidth)}
                </div>
              ) : (
                <img
                  style={{ width: iconWidth * (3 / 4), height: iconWidth }}
                  src="/card-back.png"
                  onDoubleClick={() => {
                    if (!cardShouldBeClickable) return;
                    handleFoundationCardFlip();
                  }}
                />
              )}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default FoundationCards;
