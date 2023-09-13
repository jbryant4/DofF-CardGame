import { CSSProperties, useContext, useState } from 'react';
import styles from '@/DuelOfFates/Battle/BattleField.module.css';
import DuelingCard from '~/constants/DuelingCard';
import { BoardContext } from '~/context/BoardContext';
import { GameContext } from '~/context/GameContext';

type OwnProps = {
  cards: (DuelingCard | null)[];
};

const Card = ({
  card,
  position,
  isActive,
  onClick
}: {
  card: DuelingCard | null;
  position: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  const {
    setPlayerOneBoard,
    setPlayerTwoBoard,
    playerOneBoard,
    playerTwoBoard
  } = useContext(BoardContext);
  const { localPlayer, battleTurn, battleStage } = useContext(GameContext);
  const cardShouldBeClickable =
    !card?.faceUp &&
    localPlayer === battleTurn &&
    (battleStage === 'place' || battleStage === 'duel');
  console.log(cardShouldBeClickable);
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
    position: 'absolute',
    width: cardWidth,
    height: cardHeight,
    zIndex: isActive ? 2 : 1,
    right: isActive ? 8 : 'unset',
    left: !isActive ? 8 : 'unset'
  };

  if (!card) {
    return (
      <div
        className={`${position} bg-green-200 border-2 border-gray-600`}
        style={baseStyles}
      />
    );
  }

  const cardImage = card.faceUp ? card.blankUrl : '/card-back.png';

  return (
    <img
      src={cardImage}
      className={`absolute ${position}`}
      style={baseStyles}
      onClick={onClick}
      onDoubleClick={() => {
        if (!cardShouldBeClickable) return;
        handleResourceCardFlip();
      }}
    />
  );
};

const ResourceCards = ({ cards }: OwnProps) => {
  const [topCard, setTopCard] = useState('cardOne');

  return (
    <div className={`${styles.resource} p-8 bg-amber-50 relative`}>
      <Card
        card={cards[0]}
        position="top-8"
        isActive={topCard === 'cardOne'}
        onClick={() => setTopCard('cardOne')}
      />
      <Card
        card={cards[1]}
        position="bottom-8"
        isActive={topCard !== 'cardOne'}
        onClick={() => setTopCard('cardTwo')}
      />
    </div>
  );
};

export default ResourceCards;
