import { useState } from 'react';
import DeckValidations from '@/Forge/DeckValidations';
import useDeckServices from '@/Forge/useDeckServices';
import { ActionBtn } from '@/Modals/BattleCardModal/BattleCardModal.styles';
import {
  defaultForgeDeck,
  ForgeDeck,
  useForgeContext
} from '~/context/ForgeContext';
import OceanFoundationIcon from '~/icons/OceanFoundationIcon';
import OneArmyIcon from '~/icons/OneArmyIcon';
import OneChampionIcon from '~/icons/OneChampionIcon';
import ResourceIcon from '~/icons/ResourceIcon';

type OwnProps = {
  deck: ForgeDeck;
};

const DeckCard = ({ deck }: OwnProps) => {
  const {
    title,
    cards: { army, champion, resource, foundation }
  } = deck;
  const {
    isNewDeck,
    setDeckInForge,
    setIsNewDeck,
    setIsViewMode,
    isViewMode,
    deckInForge
  } = useForgeContext();
  const [duelReadyDeck, setDuelReadyDeck] = useState(false);
  const [youSure, setYouSure] = useState(false);
  const deckHandler = useDeckServices(duelReadyDeck);

  const isBeingEdited = !isViewMode && title === deckInForge.title;
  async function deleteCard() {
    if (!youSure) {
      setYouSure(true);

      return;
    }
    await deckHandler('delete');
    setYouSure(false);
  }

  return (
    <div className="border duration-300 flex flex-col gap-16 p-8 rounded transition-all w-full">
      <h3 className="font-bold text-20">{title}</h3>
      {isViewMode && (
        <div className="flex gap-12 justify-end">
          <ActionBtn
            disabled={false}
            onClick={() => {
              setDeckInForge({ ...deck });
              setIsViewMode(true);
            }}
          >
            view
          </ActionBtn>
          <ActionBtn
            disabled={false}
            onClick={() => {
              setDeckInForge({ ...deck });
              setIsViewMode(false);
            }}
          >
            edit
          </ActionBtn>
        </div>
      )}

      <div className="flex justify-between w-full">
        <div>
          <OneChampionIcon
            className={isBeingEdited ? '' : 'grayscale'}
            size={50}
          />
          {champion.length}
        </div>{' '}
        <div>
          <OneArmyIcon className={isBeingEdited ? '' : 'grayscale'} size={50} />
          {army.length}
        </div>{' '}
        <div>
          <ResourceIcon
            className={isBeingEdited ? '' : 'grayscale'}
            size={50}
          />
          {resource.length}
        </div>{' '}
        <div>
          <OceanFoundationIcon
            className={isBeingEdited ? '' : 'grayscale'}
            size={50}
          />
          {foundation.length}
        </div>
      </div>

      {isBeingEdited && (
        <>
          <DeckValidations
            duelReadyDeck={duelReadyDeck}
            setDuelReadyDeck={setDuelReadyDeck}
          />
          <ActionBtn
            className="bg-yellow-500 hover:bg-yellow-700"
            disabled={false}
            onClick={() => {
              setDeckInForge({ ...defaultForgeDeck });
              setIsNewDeck(false);
              setIsViewMode(true);
            }}
          >
            cancel
          </ActionBtn>
          <ActionBtn
            className="bg-red-500 hover:bg-red-700"
            disabled={false}
            onClick={deleteCard}
          >
            {youSure ? 'You Sure' : 'Delete'}
          </ActionBtn>
          <ActionBtn
            disabled={false}
            className={'bg-green-500 hover:bg-green-700'}
            onClick={async () => deckHandler(isNewDeck ? 'create' : 'update')}
          >
            {isNewDeck ? 'Save Deck' : 'Update Deck'}
          </ActionBtn>
        </>
      )}
    </div>
  );
};

export default DeckCard;
