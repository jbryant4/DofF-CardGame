import { useContext, useState } from 'react';
import FinalCard from '@/FinalCard';
import BlueBtn from '@/Global/BlueBtn';
import Card from '~/constants/CardType';
import DuelingCard from '~/constants/DuelingCard';
import ModalEnum from '~/constants/modalEnum';
import { ModalContext } from '~/context/ModalContext';

export interface DisplayCard extends Card {
  id: string;
}

type OwnProps = {
  card: DisplayCard;
};

const CardDisplay = ({ card }: OwnProps) => {
  const [isSpinning, setSpinning] = useState(true);
  const { setOpenModal } = useContext(ModalContext);

  return (
    <div className="flex gap-32 my-32">
      <div>
        <div className="card-container hover:animate-pulse">
          <div
            className={`card hover:cursor-pointer ${
              isSpinning ? 'card-flip' : ''
            }`}
            onClick={() => setSpinning(!isSpinning)}
            style={{ width: 225, height: (225 * 4) / 3 }}
          >
            <img
              src="/card-back.png"
              className="card-face rounded-[12px]"
              alt="physical-card"
              loading="lazy"
              style={{ width: 225, height: (225 * 4) / 3 }}
            />
            <div className="card-back card-face">
              <FinalCard card={{ ...card, faceUp: true, position: 'attack' }} />
            </div>
          </div>
        </div>
      </div>
      <img
        src={card.cardUrl}
        className="mt-48 rounded-[12px]"
        alt="physical-card"
        loading="lazy"
        width={225}
        height={(225 * 4) / 3}
      />
      <div className="flex flex-col gap-12 self-center">
        <div className="flex font-bold gap-24 justify-end mt-36 text-24 w-full">
          <BlueBtn onClick={() => setOpenModal(ModalEnum.Unlock)}>
            Unlock Card
          </BlueBtn>
        </div>

        {card.description && (
          <div>
            <h3 className="text-20 underline underline-offset-4">
              Description
            </h3>
            <p>{card.description}</p>
          </div>
        )}

        {card.effectText && (
          <div>
            <h3 className="text-20 underline underline-offset-4">
              Card Effect
            </h3>
            <p>{card.effectText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardDisplay;
