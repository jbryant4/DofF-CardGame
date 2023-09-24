import { useContext } from 'react';
import DuelingCard from '~/constants/DuelingCard';
import { BoardContext } from '~/context/BoardContext';
import { GameContext } from '~/context/GameContext';

const MilitaryCard = ({
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
    activePreReqs,
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

  if (battleTurn === localPlayer) {
    console.log(activePreReqs);
  }
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
      className={`${
        type === 'champ' ? 'bg-cyan-400' : 'bg-cyan-200'
      } border border-black ${type === 'army' ? 'self-end' : ''}`}
      style={{ width: cardWidth, height: cardWidth * (4 / 3) }}
    >
      {type} slot {index}
    </div>
  );
};

export default MilitaryCard;
