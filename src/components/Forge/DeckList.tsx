import { ChangeEventHandler, Fragment, SetStateAction, useState } from 'react';
import decks from '@/DuelOfFates/Battle/Decks';
import DeckCard from '@/Forge/DeckCard';
import { makeForgeDeck } from '@/Forge/utiles';
import { ActionBtn } from '@/Modals/BattleCardModal/BattleCardModal.styles';
import { Africa } from '~/constants/starterDecks';
import { useCollector } from '~/context/CollectorContext';
import {
  defaultForgeDeck,
  ForgeDeck,
  useForgeContext
} from '~/context/ForgeContext';
import { Deck } from '~/models/Collector';
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
  const { collector, setCollector } = useCollector();
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
              { title: deckTitle, cards: [], duelReady: false }
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
      {decksToUse.map(({ title, cards }, index) => {
        const forgeDeck: ForgeDeck = { title, cards: makeForgeDeck(cards) };

        return (
          <Fragment key={`${title}${index}`}>
            <DeckCard deck={forgeDeck} />
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
