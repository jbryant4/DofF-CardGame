import classNames from 'classnames';
import { Fragment, useEffect, useState } from 'react';
import DuelCard from '@/DuelOfFates/Battle/DuelCard';
import DuelingCard from '~/constants/DuelingCard';

type OwnProps = {
  foundationDeck: DuelingCard[];
  mainDeck: DuelingCard[];
  viewDecks: boolean;
};

const Decks = ({ foundationDeck, mainDeck, viewDecks }: OwnProps) => {
  useEffect(() => {}, []);

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
              cardWidth={200}
              index={index}
            />
          </Fragment>
        ))}
      </div>
      <div className="flex flex-col flex-grow items-center">
        <div>Foundation Deck</div>
        {foundationDeck.map((card, index) => (
          <Fragment key={card.id}>
            <DuelCard
              duelingCard={card}
              location="foundation-deck"
              layout={'pile'}
              cardWidth={200}
              index={index}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Decks;
