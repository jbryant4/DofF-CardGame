import { useContext, useEffect, useState } from 'react';
import PlacementControls from '@/DuelOfFates/Battle/HandCard/PlacementControls';
import FinalCard from '@/FinalCard';
import { BoardContext } from '~/context/BoardContext';
import { useDimensionsContext } from '~/context/DimensionsContext';
import { GameContext } from '~/context/GameContext';
import { DuelingCard } from '~/contracts/card';

type OwnProps = {
  duelingCard: DuelingCard;
  index: number;
};

const HandCard = ({ duelingCard, index = 0 }: OwnProps) => {
  const [hover, setHover] = useState(false);
  const [prePlace, setPrePlace] = useState(false);
  const [placeAttack, setPlaceAttack] = useState(true);

  const { localPlayer, battleTurn, battleStage } = useContext(GameContext);
  const { activePreReqs, getIsBoardSlotFull } = useContext(BoardContext);

  const {
    handCardWidth,
    handCardHeight,
    handCardTransitionLength,
    canFullBoard
  } = useDimensionsContext();

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

  return (
    <div
      style={{
        marginLeft: index === 0 ? 0 : -handCardWidth * 0.4,
        zIndex: hover || prePlace ? 3 + index : index,
        top: hover || prePlace ? -handCardTransitionLength : 0,
        width: handCardWidth,
        height: handCardHeight
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
      <FinalCard
        card={{
          ...duelingCard,
          position: placeAttack ? 'attack' : 'defense'
        }}
        width={handCardWidth}
        activePreReqs={activePreReqs}
        inHand
      />
    </div>
  );
};

export default HandCard;
