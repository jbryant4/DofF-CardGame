import ModalEnum from '~/constants/modalEnum';
import { useBoardContext } from '~/context/BoardContext';
import { useDimensionsContext } from '~/context/DimensionsContext';
import { useModalContext } from '~/context/ModalContext';
import { Foundation } from '~/contracts/card';
import DesertFoundationIcon from '~/icons/DesertFoundationIcon';
import EarthFoundationIcon from '~/icons/EarthFoundationIcon';
import OceanFoundationIcon from '~/icons/OceanFoundationIcon';

type OwnProps = {
  isEnemy?: boolean;
};

const iconToUse = (name: Foundation, size: number) => {
  switch (true) {
    case name === 'desert':
      return <DesertFoundationIcon size={size} />;
    case name === 'ocean':
      return <OceanFoundationIcon size={size} />;
    case name === 'earth':
      return <EarthFoundationIcon size={size} />;
  }
};

const FoundationCards = ({ isEnemy = false }: OwnProps) => {
  const { iconWidth } = useDimensionsContext();
  const { setModalInfo, setOpenModal } = useModalContext();
  const { localBoard, enemyBoard } = useBoardContext();

  const { foundations } = isEnemy ? enemyBoard : localBoard;

  return (
    <div className="grid grid-cols-4 items-cente pl-8 relative w-full">
      {foundations.map((card, index) => {
        if (!card) {
          return (
            <div
              key={`foundation-${index}`}
              style={{ width: iconWidth, height: iconWidth }}
              className="border border-black border-solid flex items-center justify-center rounded-full"
            >
              slot {index}
            </div>
          );
        }

        const cardShouldBeClickable = !isEnemy || (isEnemy && card?.faceUp);

        return (
          <div
            key={`foundation-${index}`}
            className="flex items-center justify-center"
            onClick={() => {
              if (!cardShouldBeClickable) return;
              setModalInfo({ id: card.id, type: card.type, isEnemy });
              setOpenModal(ModalEnum.BattleCard);
            }}
          >
            {card.foundation && card.faceUp ? (
              iconToUse(card.foundation[0], iconWidth)
            ) : (
              <div
                style={{ width: iconWidth, height: iconWidth }}
                className="bg-[url('/card-back.png')] bg-cover border border-2 border-black rounded-full shadow-gray-600 shadow-md"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FoundationCards;
