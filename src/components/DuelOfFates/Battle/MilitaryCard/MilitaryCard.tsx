import cx from 'classnames';
import { useContext } from 'react';
import BattleCard from '@/UpdatedCard/BattleCard';
import DuelingCard from '~/constants/DuelingCard';
import ModalEnum from '~/constants/modalEnum';
import { BoardContext } from '~/context/BoardContext';
import { GameContext } from '~/context/GameContext';
import { useModalContext } from '~/context/ModalContext';
import createComponent, {
  ElementWithProps
} from '~/utils/styles/createComponent';
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
  const cardWidth = innerWidth / 8 - 10;
  const cardHeight = cardWidth * (4 / 3);

  if (!card)
    return (
      <MilitaryCardWrapper
        isPlaceHolder={true}
        type={type}
        isEnemy={isEnemy}
        w={cardWidth}
        h={cardHeight}
      >
        {type} slot {index}
      </MilitaryCardWrapper>
    );

  const cardShouldBeClickable = !isEnemy || (isEnemy && card.faceUp);

  return (
    <MilitaryCardWrapper
      type={type}
      isPlaceHolder={false}
      h={cardHeight}
      w={cardWidth}
      isEnemy={isEnemy}
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
    </MilitaryCardWrapper>
  );
};

export default MilitaryCard;
