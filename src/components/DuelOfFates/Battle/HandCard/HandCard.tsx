import { useContext, useEffect, useState } from 'react';
import PlacementControls from '@/DuelOfFates/Battle/HandCard/PlacementControls';
import FinalCard from '@/FinalCard';
import DuelingCard from '~/constants/DuelingCard';
import { BoardContext } from '~/context/BoardContext';
import { GameContext } from '~/context/GameContext';

type OwnProps = {
  duelingCard: DuelingCard;
  index: number;
  cardWidth: number;
  enemyHand: boolean;
};

const HandCard = ({
  duelingCard,
  index = 0,
  cardWidth,
  enemyHand
}: OwnProps) => {
  const cardHeight = cardWidth * (4 / 3);
  const [hover, setHover] = useState(false);
  const [prePlace, setPrePlace] = useState(false);
  const [placeAttack, setPlaceAttack] = useState(true);

  const { localPlayer, battleTurn, battleStage } = useContext(GameContext);
  const { activePreReqs, getIsBoardSlotFull } = useContext(BoardContext);

  const allSlotsFilled = getIsBoardSlotFull(duelingCard);
  const cardCanBePlaced =
    duelingCard.preReqs && duelingCard.preReqs.length > 0
      ? duelingCard.preReqs.every(prerequisite =>
          activePreReqs?.includes(prerequisite)
        )
      : true;

  const cardsShouldBeClickable =
    localPlayer === battleTurn &&
    battleStage === 'place' &&
    cardCanBePlaced &&
    !allSlotsFilled;

  return enemyHand ? (
    <div
      style={{
        marginLeft: index === 0 ? 0 : -cardWidth * 0.25,
        zIndex: hover ? 8 - index : 7 - index,
        top: hover ? -30 : 10,
        width: cardWidth
      }}
      className="duration-[800ms] h-full relative transition-all"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {' '}
      <img
        className="absolute inset-0"
        id={duelingCard.title}
        src="/card-back.png"
        style={{
          width: cardWidth,
          height: cardHeight,
          backgroundColor: 'black'
        }}
        alt="card back image"
      />
    </div>
  ) : (
    <div
      style={{
        marginLeft: index === 0 ? 0 : -cardWidth * 0.4,
        zIndex: hover || prePlace ? 3 + index : index,
        top: hover || prePlace ? -cardHeight * 0.75 : 10,
        width: cardWidth
      }}
      className="duration-[800ms] h-full relative transition-all"
      onClick={() => {
        if (!cardsShouldBeClickable) return;
        setPrePlace(true);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {prePlace && (
        <PlacementControls
          card={duelingCard}
          setHover={setHover}
          setPrePlace={setPrePlace}
          placeAttack={placeAttack}
          setPlaceAttack={setPlaceAttack}
        />
      )}
      <div className="absolute inset-0">
        <FinalCard
          card={{
            ...duelingCard,
            position: placeAttack ? 'attack' : 'defense'
          }}
          width={cardWidth}
          activePreReqs={activePreReqs}
          inHand
        />
      </div>
    </div>
  );
};

export default HandCard;
