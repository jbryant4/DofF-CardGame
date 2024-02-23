import cx from 'classnames';
import React, { Dispatch, useEffect } from 'react';
import { useCardContext } from '~/context/CardContext';
import { useForgeContext } from '~/context/ForgeContext';
import { Card, CardType, PreReq } from '~/contracts/card';
import { Deck } from '~/contracts/collector';
import createComponent, {
  ElementWithProps
} from '~/utils/styles/createComponent';

type OwnProps = {
  duelReadyDeck: boolean;
  setDuelReadyDeck: Dispatch<React.SetStateAction<boolean>>;
};
type MinMax = {
  min: number;
  max: number;
};
const cardMinMax: Record<CardType, MinMax> = {
  champion: { min: 4, max: 14 },
  army: { min: 6, max: 16 },
  resource: { min: 3, max: 12 },
  foundation: { min: 2, max: 6 }
};
const deckMinMax: MinMax = {
  min: 20,
  max: 40
};

const UpdatedCount = createComponent<ElementWithProps & { isValid: boolean }>(
  'div',
  props => ({
    className: cx('-:text-red-600 italic', { 'text-green-600': props.isValid })
  })
);

export function isInRange(amount: number, type: CardType | 'deck') {
  return type === 'deck'
    ? amount <= deckMinMax.max && amount >= deckMinMax.min
    : amount <= cardMinMax[type].max && amount >= cardMinMax[type].min;
}

function useGetMissingPreReqs(cards: Deck['cards']) {
  const { champion, army, foundation } = cards;
  const { globalCards } = useCardContext();

  const champCardsInDeck = champion
    .map(id => globalCards.champion.find(c => c.id === id))
    .filter(Boolean) as Card[];
  const foundationCardsInDeck = foundation
    .map(id => globalCards.foundation.find(c => c.id === id))
    .filter(Boolean) as Card[];

  const uniquePrereqs = [
    ...new Set(
      champCardsInDeck
        .flatMap(c => c.preReqs ?? []) // Use nullish coalescing to handle undefined
        .filter((prereq): prereq is PreReq => prereq !== undefined)
    )
  ];

  const foundationsInDeck = new Set([
    ...foundationCardsInDeck.flatMap(c => c.foundation)
  ]);
  const armyInDeck = army
    .map((c, index) => (index <= 2 ? `${index + 1}a` : ''))
    .filter(Boolean);
  const championsInDeck = champion
    .map((c, index) => (index <= 1 ? `${index + 1}c` : ''))
    .filter(Boolean);
  const preReqsInDeck = [
    ...foundationsInDeck,
    ...armyInDeck,
    ...championsInDeck
  ];

  return uniquePrereqs.filter(prereq => !preReqsInDeck.includes(prereq));
}

export default function DeckValidations({
  duelReadyDeck,
  setDuelReadyDeck
}: OwnProps) {
  const {
    deckInForge: { cards }
  } = useForgeContext();
  const { champion, resource, army, foundation } = cards;
  const totalDeckSize = Object.values(cards).flat().length;

  const missingPreReqs = useGetMissingPreReqs(cards);

  useEffect(() => {
    setDuelReadyDeck(
      isInRange(champion.length, 'champion') &&
        isInRange(army.length, 'army') &&
        isInRange(resource.length, 'resource') &&
        isInRange(foundation.length, 'foundation') &&
        isInRange(totalDeckSize, 'deck') &&
        missingPreReqs.length === 0
    );
  }, [
    army.length,
    champion.length,
    foundation.length,
    missingPreReqs.length,
    resource.length,
    setDuelReadyDeck,
    totalDeckSize
  ]);

  return (
    <div className="flex flex-col gap-12">
      <div className="grid grid-cols-4 justify-items-center">
        <UpdatedCount isValid={isInRange(champion.length, 'champion')}>
          {champion.length}
        </UpdatedCount>
        <UpdatedCount isValid={isInRange(army.length, 'army')}>
          {army.length}
        </UpdatedCount>
        <UpdatedCount isValid={isInRange(resource.length, 'resource')}>
          {resource.length}
        </UpdatedCount>
        <UpdatedCount isValid={isInRange(foundation.length, 'foundation')}>
          {foundation.length}
        </UpdatedCount>
      </div>

      <div className="flex gap-16 justify-start">
        Overall deck:{' '}
        <UpdatedCount isValid={isInRange(totalDeckSize, 'deck')}>
          {totalDeckSize}
        </UpdatedCount>
      </div>

      <UpdatedCount isValid={missingPreReqs.length === 0}>
        {missingPreReqs.length > 0 ? (
          <>
            <p>Missing PreReqs:</p>
            <ul className="list-disc list-inside pl-8">
              {missingPreReqs.map(pre => (
                <li key={pre}>{pre}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>All Prereqs are in your deck</p>
        )}
      </UpdatedCount>

      {!duelReadyDeck && (
        <div className="flex gap-8 items-center">
          *
          <p className="text-center">
            This deck can be saved but will not be able to be used to duel
          </p>
          *
        </div>
      )}
    </div>
  );
}
