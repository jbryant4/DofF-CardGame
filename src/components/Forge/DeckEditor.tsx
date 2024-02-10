import cx from 'classnames';
import { Fragment, useState } from 'react';
import ForgeCard from '@/Forge/ForgeCard';
import useGetCardsToShow from '@/Forge/useGetCardsToShow';
import { useForgeContext } from '~/context/ForgeContext';
import OceanFoundationIcon from '~/icons/OceanFoundationIcon';
import OneArmyIcon from '~/icons/OneArmyIcon';
import OneChampionIcon from '~/icons/OneChampionIcon';
import ResourceIcon from '~/icons/ResourceIcon';
import { CardType } from '~/models/Card';

export type Filter = Exclude<CardType, ''>;
type OwnProps = {};

const DeckEditor = ({}: OwnProps) => {
  const [filter, setFilter] = useState<Filter>('champion');
  const { isViewMode, isNewDeck, deckInForge, unlockedCards } =
    useForgeContext();
  const { deckCards, unlockedCards: unlockedToShow } = useGetCardsToShow(
    filter,
    { cards: deckInForge.cards },
    unlockedCards
  );

  const show = deckInForge.title.trim().length > 0;

  return show ? (
    <div className="flex flex-col flex-grow gap-24 h-full mt-24">
      <p className="font-bold text-24">{deckInForge.title}</p>
      <div className="flex justify-around w-full">
        <div onClick={() => setFilter('champion')}>
          <OneChampionIcon size={50} />
        </div>{' '}
        <div onClick={() => setFilter('army')}>
          <OneArmyIcon size={50} />
        </div>{' '}
        <div onClick={() => setFilter('resource')}>
          <ResourceIcon size={50} />
        </div>{' '}
        <div onClick={() => setFilter('foundation')}>
          <OceanFoundationIcon className="grayscale" size={50} />
        </div>
      </div>
      <div
        className={cx('-:grid-cols-2 grid h-full overflow-hidden', {
          'grid-cols-1': isViewMode
        })}
      >
        <div className="flex flex-col h-full overflow-hidden">
          <p>{deckInForge.title}</p>
          <div className="flex flex-col gap-16 h-full overflow-auto">
            {deckCards.map(c => (
              <Fragment key={c.id}>
                <ForgeCard
                  card={c}
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
                  <ForgeCard card={c} isViewMode={isViewMode} filter={filter} />
                </Fragment>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
};

export default DeckEditor;
