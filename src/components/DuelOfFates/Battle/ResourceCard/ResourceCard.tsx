import { CSSProperties, useContext } from 'react';
import BattleCard from '@/UpdatedCard/BattleCard';
import DuelingCard from '~/constants/DuelingCard';
import { BoardContext } from '~/context/BoardContext';
import { GameContext } from '~/context/GameContext';

const ResourceCard = ({
  card,
  isActive,
  onClick
}: {
  card: DuelingCard | null;
  isActive: boolean;
  onClick: () => void;
}) => {
  const {
    setPlayerOneBoard,
    setPlayerTwoBoard,
    playerOneBoard,
    playerTwoBoard,
    discardCard
  } = useContext(BoardContext);
  const { localPlayer, battleTurn, battleStage } = useContext(GameContext);
  const cardShouldBeClickable =
    !card?.faceUp &&
    localPlayer === battleTurn &&
    (battleStage === 'place' || battleStage === 'duel');
  const boardToUse =
    localPlayer === 'playerOne' ? playerOneBoard : playerTwoBoard;
  const setBoardToUse =
    localPlayer === 'playerOne' ? setPlayerOneBoard : setPlayerTwoBoard;

  const handleResourceCardFlip = () => {
    if (!card) return;
    const newResources: (DuelingCard | null)[] = boardToUse.foundations.map(
      foundation =>
        foundation && foundation.id === card.id
          ? { ...foundation, faceUp: true }
          : foundation
    );
    setBoardToUse(prevState => ({
      ...prevState,
      resources: newResources
    }));
  };
  const cardWidth = innerWidth / 7 - 20;
  const cardHeight = (cardWidth * 4) / 3;

  const baseStyles: CSSProperties = {
    width: cardWidth,
    height: cardHeight,
    zIndex: isActive ? 2 : 1,
    right: isActive ? 8 : 'unset',
    left: !isActive ? 8 : 'unset',
    bottom: isActive ? 8 : 'unset',
    top: !isActive ? 8 : 'unset'
  };

  if (!card) {
    return (
      <div
        className="absolute bg-green-200 border-2 border-gray-600"
        style={baseStyles}
      />
    );
  }

  return card.faceUp ? (
    <div
      onClick={() => {
        if (battleStage === 'duel' && card.faceUp) {
          discardCard(card.id, 'resources');
        } else {
          onClick();
        }
      }}
      className="absolute"
      style={baseStyles}
    >
      <BattleCard card={card} width={cardWidth} />
    </div>
  ) : (
    <img
      src="/card-back.png"
      className="absolute"
      style={baseStyles}
      onDoubleClick={() => {
        if (!cardShouldBeClickable) return;
        handleResourceCardFlip();
      }}
    />
  );
};

export default ResourceCard;
