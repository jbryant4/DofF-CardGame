import FinalCard from '@/FinalCard';
import DuelingCard from '~/constants/DuelingCard';
import ModalEnum from '~/constants/modalEnum';
import { useDimensionsContext } from '~/context/DimensionsContext';
import { useModalContext } from '~/context/ModalContext';

import { MilitaryCardWrapper } from './MilitaryCard.styles';

const MilitaryCard = ({
  card,
  index,
  type,
  isEnemy = false
}: {
  card: DuelingCard | null;
  index: number;
  type: 'champ' | 'army';
  isEnemy?: boolean;
}) => {
  const { setModalInfo, setOpenModal } = useModalContext();
  const { cardWidth, cardHeight } = useDimensionsContext();

  if (!card)
    return (
      <MilitaryCardWrapper
        isPlaceHolder={true}
        type={type}
        isEnemy={isEnemy}
        oppositeSide={false}
        inDefense={false}
        style={{ height: cardHeight, width: cardWidth }}
      >
        {type} slot {index}
      </MilitaryCardWrapper>
    );

  const cardShouldBeClickable = !isEnemy || (isEnemy && card.faceUp);

  return (
    <MilitaryCardWrapper
      type={type}
      isPlaceHolder={false}
      isEnemy={isEnemy}
      inDefense={card.position === 'defense'}
      // inDefense={true}
      oppositeSide={index === 1}
      onClick={() => {
        if (!cardShouldBeClickable) return;
        setModalInfo({ id: card.id, type: card.type, isEnemy });
        setOpenModal(ModalEnum.BattleCard);
      }}
    >
      <FinalCard card={card} width={cardWidth} />
    </MilitaryCardWrapper>
  );
};

export default MilitaryCard;
