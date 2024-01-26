import { ActionBtn } from '@/Modals/BattleCardModal/BattleCardModal.styles';
import { ForgeDeck, useForgeContext } from '~/context/ForgeContext';
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
  const { setDeckInForge, setIsViewMode, isViewMode, deckInForge } =
    useForgeContext();

  return (
    <div className="border flex flex-col gap-16 p-8 rounded w-full">
      <div className="flex justify-between">
        <h3 className="font-bold text-20">{title}</h3>
        {isViewMode && (
          <>
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
          </>
        )}
      </div>
      <div className="flex justify-between w-full">
        <div>
          <OneChampionIcon size={50} />
          {champion.length}
        </div>{' '}
        <div>
          <OneArmyIcon size={50} />
          {army.length}
        </div>{' '}
        <div>
          <ResourceIcon size={50} />
          {resource.length}
        </div>{' '}
        <div>
          <OceanFoundationIcon className="grayscale" size={50} />
          {foundation.length}
        </div>
      </div>

      {!isViewMode && title === deckInForge.title && (
        <>
          <ActionBtn
            disabled={false}
            className={'bg-green-500 hover:bg-green-700'}
          >
            Save Deck
          </ActionBtn>
        </>
      )}
    </div>
  );
};

export default DeckCard;
