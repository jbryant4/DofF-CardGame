import FinalCard from '@/FinalCard';
import DuelingCard from '~/constants/DuelingCard';
import ModalEnum from '~/constants/modalEnum';
import { useModalContext } from '~/context/ModalContext';
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

  const cardWidth = innerWidth / 7 - 20;

  if (!card) {
    return (
      <ResourceCardWrapper
        isTopCard={isTopCard}
        isPlaceHolder={true}
        style={{ width: cardWidth, height: (cardWidth * 4) / 3 }}
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
