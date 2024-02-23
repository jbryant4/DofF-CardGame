import cx from 'classnames';
import { Fragment } from 'react';
import ForgeCard from '@/Forge/ForgeCard';
import useGetCardsToShow from '@/Forge/useGetCardsToShow';
import { useCardContext } from '~/context/CardContext';
import { useForgeContext } from '~/context/ForgeContext';
import { CardType, makeDefaultDuelingCard } from '~/contracts/card';

export type Filter = Exclude<CardType, ''>;
type OwnProps = {};

const DeckEditor = ({}: OwnProps) => {
  const { filter, subFilter } = useCardContext();
  const { isViewMode, deckInForge } = useForgeContext();
  const { deckCards, unlockedCards: unlockedToShow } = useGetCardsToShow();

  const show = deckInForge.title.trim().length > 0;

  return show ? (
    <div
      className={cx(
        '-:grid-cols-2 flex-grow grid h-full mt-24 overflow-hidden',
        {
          'grid-cols-1': isViewMode
        }
      )}
    >
      <div className="flex flex-col h-full overflow-hidden">
        <p>
          {subFilter ? subFilter : ''} {filter} cards
        </p>
        <div className="flex flex-col gap-16 h-full overflow-auto">
          {deckCards.map(c => (
            <Fragment key={c.id}>
              <ForgeCard
                card={makeDefaultDuelingCard(c)}
                inDeck
                isViewMode={isViewMode}
                filter={filter}
              />
            </Fragment>
          ))}
        </div>
      </div>
      {!isViewMode ? (
        <div className="flex flex-col h-full overflow-hidden">
          <p>Choose Wisely </p>
          <div className="flex flex-col gap-16 h-full overflow-auto">
            {unlockedToShow.map(c => (
              <Fragment key={c.id}>
                <ForgeCard
                  card={makeDefaultDuelingCard(c)}
                  isViewMode={isViewMode}
                  filter={filter}
                />
              </Fragment>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  ) : null;
};

export default DeckEditor;
