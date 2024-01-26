import { useState } from 'react';
import FinalCard from '@/FinalCard';
import { Filter } from '@/Forge/DeckEditor';
import { ActionBtn } from '@/Modals/BattleCardModal/BattleCardModal.styles';
import DuelingCard from '~/constants/DuelingCard';
import { useForgeContext } from '~/context/ForgeContext';
import getIconsToUse from '~/utils/getIconsToUse';

type OwnProps = {
  card: DuelingCard;
  inDeck?: Boolean;
  isViewMode: Boolean;
  filter: Filter;
};

const ForgeCard = ({ card, inDeck = false, isViewMode, filter }: OwnProps) => {
  const [value, setValue] = useState();
  const { IconOne, IconTwo, IconThree, IconFour, IconFive } = getIconsToUse(
    card?.preReqs ?? [],
    175
  );
  const { setDeckInForge } = useForgeContext();

  const addCardToDeck = () => {
    setDeckInForge(prevState => ({
      ...prevState,
      cards: {
        ...prevState.cards,
        [filter]: [card, ...prevState.cards[filter]]
      }
    }));
  };

  const removeCardFromDeck = () => {
    console.log(filter);
    setDeckInForge(prevState => ({
      ...prevState,
      cards: {
        ...prevState.cards,
        [filter]: prevState.cards[filter].filter(c => c.id !== card.id)
      }
    }));
  };

  return (
    <div className="bg-gray-400/40 flex gap-8 p-12 w-fit">
      {!inDeck && (
        <ActionBtn onClick={addCardToDeck} disabled={false}>
          {'<'}
        </ActionBtn>
      )}
      <FinalCard card={card} />
      <div className="flex flex-col h-full items-center justify-center">
        {IconOne}
        {IconTwo}
        {IconThree}
        {IconFour}
        {IconFive}
      </div>
      {inDeck && !isViewMode && (
        <ActionBtn onClick={removeCardFromDeck} disabled={false}>
          {'>'}
        </ActionBtn>
      )}
    </div>
  );
};

export default ForgeCard;
