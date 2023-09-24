import classNames from 'classnames';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import DuelingCard from '~/constants/DuelingCard';
import { BoardContext } from '~/context/BoardContext';
import AttackIcon from '~/icons/AttackIcon';
import ShieldIcon from '~/icons/ShieldIcon';

type OwnProps = {
  card: DuelingCard;
  setHover: Dispatch<SetStateAction<boolean>>;
  setPrePlace: Dispatch<SetStateAction<boolean>>;
  placeAttack: boolean;
  setPlaceAttack: Dispatch<SetStateAction<boolean>>;
};

const PlacementControls = ({
  card,
  setHover,
  setPrePlace,
  placeAttack,
  setPlaceAttack
}: OwnProps) => {
  const [placeUp, setPlaceUp] = useState(true);

  const playIcon = '\u25B6 ';
  const upIcon = '\u21E7';
  const downIcon = '\u21E9';

  const fighterCard = card.type === 'army' || card.type === 'champion';

  const { placeCard } = useContext(BoardContext);
  const handlePlaceCard = e => {
    e.stopPropagation();
    placeCard({
      ...card,
      faceUp: placeUp,
      position: placeAttack ? 'attack' : 'defense'
    });
  };

  return (
    <div className="absolute grid grid-rows-3 h-fit justify-items-center left-full p-8 top-0 w-fit">
      <div
        onClick={e => {
          e.stopPropagation();
          setPlaceUp(prevState => !prevState);
        }}
        className="bg-green-600 cursor-pointer flex h-24 items-center justify-center rounded-full w-24"
      >
        {placeUp ? upIcon : downIcon}
      </div>

      <div className="flex gap-24 justify-between">
        <div
          onClick={e => handlePlaceCard(e)}
          className="bg-green-600 cursor-pointer flex h-24 items-center justify-center rounded-full w-24"
        >
          {playIcon}
        </div>
        <div
          onClick={e => {
            e.stopPropagation();
            setPrePlace(false);
            setHover(false);
          }}
          className="bg-red-600 cursor-pointer flex h-24 items-center justify-center rounded-full w-24"
        >
          X
        </div>
      </div>
      <div
        onClick={e => {
          e.stopPropagation();
          setPlaceAttack(prevState => !prevState);
        }}
        className={classNames(
          'bg-green-600 cursor-pointer flex h-24 items-center justify-center overflow-hidden rounded-full w-24',
          { hidden: !fighterCard }
        )}
      >
        {placeAttack ? <AttackIcon /> : <ShieldIcon />}
      </div>
    </div>
  );
};

export default PlacementControls;
