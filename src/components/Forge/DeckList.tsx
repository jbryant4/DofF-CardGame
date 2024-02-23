import { ChangeEventHandler, Fragment, useState } from 'react';
import DeckCard from '@/Forge/DeckCard';
import { ActionBtn } from '@/Modals/BattleCardModal/BattleCardModal.styles';
import { useCollectorContext } from '~/context/CollectorContext';
import { defaultForgeDeck, useForgeContext } from '~/context/ForgeContext';
import { Deck } from '~/contracts/collector';
import hasSpecialCharacters from '~/utils/getHasSpecialCharacters';

export default function DeckList() {
  const [deckTitle, setDeckTitle] = useState('');
  const {
    deckInForge,
    isViewMode,
    setDeckInForge,
    setIsNewDeck,
    setIsViewMode
  } = useForgeContext();
  const { collector, setCollector } = useCollectorContext();
  const decksToUse = collector ? [...collector.decks] : ([] as Deck[]);

  const handleCreateDeck = () => {
    const titleAlreadyExists = decksToUse.some(
      deck => deck.title === deckTitle
    );

    if (titleAlreadyExists) {
      setDeckTitle('No Dup Titles');

      return;
    }

    setCollector(prevState =>
      prevState
        ? {
            ...prevState,
            decks: [
              ...prevState.decks,
              { ...defaultForgeDeck, title: deckTitle }
            ]
          }
        : null
    );
    setDeckInForge({ ...defaultForgeDeck, title: deckTitle });
    setIsNewDeck(true);
    setIsViewMode(false);
    setDeckTitle('');
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const badCharacters = hasSpecialCharacters(e.target.value);
    console.log(e.target.value, badCharacters);

    if (!badCharacters) {
      setDeckTitle(e.target.value);
    }
  };

  const showCreateBtn =
    deckInForge.title.length === 0 ||
    (deckInForge.title.length > 0 && isViewMode);

  return (
    <div className="flex flex-col flex-grow gap-16 justify-center max-w-[320px] px-4">
      {decksToUse.map(deck => {
        return (
          <Fragment key={`${deck.title}`}>
            <DeckCard deck={deck} />
          </Fragment>
        );
      })}

      {showCreateBtn && (
        <div className="border border-black flex flex-col gap-16 p-12 rounded">
          <input
            type={'text'}
            value={deckTitle}
            onChange={handleChange}
            placeholder="Deck Title"
          />
          <ActionBtn
            disabled={deckTitle.length === 0}
            className="bg-green-500 hover:bg-green-700"
            onClick={handleCreateDeck}
          >
            Create New Deck
          </ActionBtn>
        </div>
      )}
    </div>
  );
}
