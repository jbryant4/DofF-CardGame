import FinalCard from '@/FinalCard';
import ModalEnum from '~/constants/modalEnum';
import { useDimensionsContext } from '~/context/DimensionsContext';
import { useModalContext } from '~/context/ModalContext';
import { DuelingCard } from '~/contracts/card';
import { ResourceCardWrapper } from './ResourceCard.styles';

const ResourceCard = ({
  card,
  isTopCard = false,
  isEnemy = false
}: {
  card: DuelingCard | null;
  isTopCard?: boolean;
  isEnemy?: boolean;
}) => {
  const { setModalInfo, setOpenModal } = useModalContext();
  const { cardWidth, cardHeight } = useDimensionsContext();

  if (!card) {
    return (
      <ResourceCardWrapper
        isTopCard={isTopCard}
        isPlaceHolder={true}
        style={{ width: cardWidth, height: cardHeight }}
      />
    );
  }
  const cardShouldBeClickable = !isEnemy || (isEnemy && card.faceUp);

  return (
    <ResourceCardWrapper
      isTopCard={isTopCard}
      isPlaceHolder={false}
      onClick={() => {
        if (!cardShouldBeClickable) return;
        setModalInfo({ id: card.id, type: card.type, isEnemy });
        setOpenModal(ModalEnum.BattleCard);
      }}
    >
      <FinalCard card={card} width={cardWidth} />
    </ResourceCardWrapper>
  );
};

export default ResourceCard;
