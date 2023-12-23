import BattleCard from '@/UpdatedCard/BattleCard';
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
  const cardHeight = (cardWidth * 4) / 3;

  if (!card) {
    return (
      <ResourceCardWrapper
        isTopCard={isTopCard}
        isPlaceHolder={true}
        w={cardWidth}
        h={cardHeight}
      />
    );
  }
  const cardShouldBeClickable = !isEnemy || (isEnemy && card.faceUp);

  return (
    <ResourceCardWrapper
      isTopCard={isTopCard}
      isPlaceHolder={false}
      h={cardHeight}
      w={cardWidth}
      onClick={() => {
        if (!cardShouldBeClickable) return;
        setModalInfo({ id: card.id, type: card.type, isEnemy });
        setOpenModal(ModalEnum.BattleCard);
      }}
    >
      {card.faceUp ? (
        <BattleCard card={card} width={cardWidth} />
      ) : (
        <img src="/card-back.png" />
      )}
    </ResourceCardWrapper>
  );
};

export default ResourceCard;
