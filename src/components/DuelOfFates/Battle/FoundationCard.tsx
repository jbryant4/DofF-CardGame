import { Fragment, useContext } from 'react';
import styles from '@/DuelOfFates/Battle/BattleField.module.css';
import DuelingCard from '~/constants/DuelingCard';
import ModalEnum from '~/constants/modalEnum';
import { useModalContext } from '~/context/ModalContext';
import DesertFoundationIcon from '~/icons/DesertFoundationIcon';
import EarthFoundationIcon from '~/icons/EarthFoundationIcon';
import OceanFoundationIcon from '~/icons/OceanFoundationIcon';
import { Foundation } from '~/models/Card';

type OwnProps = {
  cards: (DuelingCard | null)[];
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

const FoundationCards = ({ cards, isEnemy = false }: OwnProps) => {
  const iconWidth = (window.innerWidth / 14) * 0.65;
  const { setModalInfo, setOpenModal } = useModalContext();

  return (
    <div
      className={`${styles.foundation} grid grid-rows-4 px-8 relative items-center`}
    >
      {cards.map((card, index) => {
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
