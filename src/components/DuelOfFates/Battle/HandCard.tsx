import classNames from 'classnames';
import { useContext, useState } from 'react';
import DuelingCard from '~/constants/DuelingCard';
import { BoardContext } from '~/context/BoardContext';
import { GameContext } from '~/context/GameContext';
import AttackIcon from '~/icons/AttackIcon';
import ShieldIcon from '~/icons/ShieldIcon';

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
  const [placeUp, setPlaceUp] = useState(true);
  const [placeAttack, setPlaceAttack] = useState(true);

  const { localPlayer, battleTurn, battleStage } = useContext(GameContext);
  const cardsShouldBeClickable =
    localPlayer === battleTurn && battleStage === 'place';
  const playIcon = '\u25B6 ';
  const upIcon = '\u21E7';
  const downIcon = '\u21E9';
  const fighterCard =
    duelingCard.type === 'army' || duelingCard.type === 'champion';

  const { placeCard } = useContext(BoardContext);
  const handlePlaceCard = e => {
    e.stopPropagation();
    console.log('in handle place Card', duelingCard.type);
    placeCard({
      ...duelingCard,
      faceUp: placeUp,
      position: placeAttack ? 'attack' : 'defense'
    });
  };

  return enemyHand ? (
    <div
      style={{
        marginLeft: index === 0 ? 0 : -cardWidth / 2,
        zIndex: hover ? 8 - index : 7 - index,
        top: hover ? -cardHeight * 0.65 : 10,
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
      />
    </div>
  ) : (
    <div
      style={{
        marginLeft: index === 0 ? 0 : -cardWidth / 2,
        zIndex: hover || prePlace ? 8 - index : 7 - index,
        top: hover || prePlace ? -cardHeight * 0.65 : 10,
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
      <div
        className={classNames(
          'absolute grid grid-rows-3 h-fit justify-items-center p-8 right-0 top-0 w-fit',
          {
            'translate-x-full': prePlace
          }
        )}
      >
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
      <img
        className="absolute inset-0"
        id={duelingCard.title}
        src={duelingCard.blankUrl}
        style={{
          width: cardWidth,
          height: cardHeight,
          backgroundColor: 'black'
        }}
      />
    </div>
  );
};

export default HandCard;
