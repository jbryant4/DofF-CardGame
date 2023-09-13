import { useContext, useState } from 'react';
import styles from '@/DuelOfFates/Battle/BattleField.module.css';
import DuelingCard from '~/constants/DuelingCard';
import { BoardContext } from '~/context/BoardContext';
import { GameContext } from '~/context/GameContext';

type OwnProps = {
  army: (DuelingCard | null)[];
  champions: (DuelingCard | null)[];
};

const CardSlot = ({
  card,
  index,
  type
}: {
  card: DuelingCard | null;
  index: number;
  type: 'champ' | 'army';
}) => {
  const { localPlayer, battleTurn, battleStage } = useContext(GameContext);
  const {
    setPlayerOneBoard,
    setPlayerTwoBoard,
    playerOneBoard,
    playerTwoBoard,
    discardCard
  } = useContext(BoardContext);
  const cardWidth = innerWidth / 8 - 10;
  const cardShouldBeClickable =
    !card?.faceUp &&
    localPlayer === battleTurn &&
    (battleStage === 'place' || battleStage === 'duel');

  const boardToUse =
    localPlayer === 'playerOne' ? playerOneBoard : playerTwoBoard;
  const setBoardToUse =
    localPlayer === 'playerOne' ? setPlayerOneBoard : setPlayerTwoBoard;

  const handleMilitaryCardFlip = () => {
    if (!card) return;
    if (type === 'champ') {
      const newChamp: (DuelingCard | null)[] = boardToUse.champions.map(champ =>
        champ && champ.id === card.id ? { ...champ, faceUp: true } : champ
      );
      setBoardToUse(prevState => ({
        ...prevState,
        champions: newChamp
      }));
    } else {
      const newChamp: (DuelingCard | null)[] = boardToUse.army.map(soldier =>
        soldier && soldier.id === card.id
          ? { ...soldier, faceUp: true }
          : soldier
      );
      setBoardToUse(prevState => ({
        ...prevState,
        army: newChamp
      }));
    }
  };

  return card ? (
    <img
      src={card.faceUp ? card.blankUrl : '/card-back.png'}
      style={{ width: cardWidth, height: cardWidth * (4 / 3) }}
      className={type === 'army' ? 'self-end' : ''}
      onClick={() => {
        if (battleStage === 'duel' && localPlayer === battleTurn) {
          discardCard(card.id, type === 'army' ? 'army' : 'champions');
        }
      }}
      onDoubleClick={() => {
        if (!cardShouldBeClickable) return;
        handleMilitaryCardFlip();
      }}
    />
  ) : (
    <div
      className={`bg-cyan-${
        type === 'champ' ? '300' : '200'
      } border border-black ${type === 'army' ? 'self-end' : ''}`}
      style={{ width: cardWidth, height: cardWidth * (4 / 3) }}
    >
      {type} slot {index}
    </div>
  );
};

const Military = ({ army, champions }: OwnProps) => {
  return (
    <div
      className={`${styles.military} grid grid-cols-6 justify-items-center py-8`}
    >
      {champions.map((champ, index) => (
        <CardSlot
          key={`champ-${index}`}
          card={champ}
          index={index}
          type="champ"
        />
      ))}

      {army.map((soldier, index) => (
        <CardSlot
          key={`army-${index}`}
          card={soldier}
          index={index}
          type="army"
        />
      ))}
    </div>
  );
};

export default Military;
