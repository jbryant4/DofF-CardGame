import classNames from 'classnames';
import { Fragment, useContext, useEffect } from 'react';
import DuelCard from '@/DuelOfFates/Battle/DuelCard';
import BlueBtn from '@/Global/BlueBtn';
import DuelingCard from '~/constants/DuelingCard';
import { BoardContext } from '~/context/BoardContext';
import { GameContext } from '~/context/GameContext';

type OwnProps = {
  handDeckLength: number;
  cardWidth: number;
  foundationDeck: DuelingCard[];
  mainDeck: DuelingCard[];
  viewDecks: boolean;
};

const Decks = ({
  cardWidth,
  foundationDeck,
  mainDeck,
  viewDecks,
  handDeckLength
}: OwnProps) => {
  const { localPlayer, advanceBattleStage } = useContext(GameContext);
  const { playerOneDraw, playerTwoDraw } = useContext(BoardContext);
  const deckToDrawFrom =
    localPlayer === 'playerOne' ? playerOneDraw : playerTwoDraw;
  const handleDeckClick = (fromDeck: 'foundation' | 'main') => {
    if (fromDeck === 'main') {
      deckToDrawFrom(7 - handDeckLength, 0);
    } else {
      deckToDrawFrom(0, 1);
    }
    advanceBattleStage();

    return;
  };

  useEffect(() => {
    if (handDeckLength !== 7) return;
    advanceBattleStage();
  }, [viewDecks]);

  return (
    <div
      id="decks"
      className={classNames(
        'absolute bg-red-200 duration-[800ms] ease-in-out flex gap-28 pb-16 pt-8 px-20 right-0 top-[0] transition-all z-[1]',
        {
          '-translate-y-[100%]': viewDecks
        }
      )}
    >
      <div className="flex flex-col flex-grow items-center">
        <div>Main Deck</div>
        {mainDeck.map((card, index) => (
          <Fragment key={card.id}>
            <DuelCard
              duelingCard={card}
              location="main-deck"
              layout={'pile'}
              cardWidth={cardWidth}
              index={index}
            />
          </Fragment>
        ))}
        {mainDeck.length !== 0 && (
          <BlueBtn className="mt-8" onClick={() => handleDeckClick('main')}>
            Fill Deck
          </BlueBtn>
        )}
      </div>
      <div className="flex flex-col flex-grow items-center">
        <div>Foundation Deck</div>
        {foundationDeck.map((card, index) => (
          <Fragment key={card.id}>
            <DuelCard
              duelingCard={card}
              location="foundation-deck"
              layout={'pile'}
              cardWidth={cardWidth}
              index={index}
            />
          </Fragment>
        ))}
        {foundationDeck.length !== 0 && (
          <BlueBtn
            className="mt-8"
            onClick={() => handleDeckClick('foundation')}
          >
            Draw Foundation
          </BlueBtn>
        )}
      </div>
    </div>
  );
};

export default Decks;
