import { useRouter } from 'next/router';
import { useContext } from 'react';
import BlueBtn from '@/Global/BlueBtn';
import Lesson from '@/Lesson';
import UpdatedCard from '@/UpdatedCard';
import ModalEnum from '~/constants/modalEnum';
import { CardContext } from '~/context/CardContext';
import { ModalContext } from '~/context/ModalContext';

const CardDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { getCard } = useContext(CardContext);
  const { setOpenModal } = useContext(ModalContext);
  const card = getCard(id);

  return card ? (
    <div className="grid grid-cols-[1fr,2fr] h-full items-center overflow-y-auto pb-[54px] pt-24 px-24">
      <div className="flex flex-col items-center">
        <UpdatedCard card={card} />
        <div className="flex gap-24 justify-center mt-36 w-full">
          <BlueBtn onClick={() => setOpenModal(ModalEnum.Breakdown)}>
            Card
          </BlueBtn>
          <BlueBtn onClick={() => setOpenModal(ModalEnum.Unlock)}>
            Unlock
          </BlueBtn>
        </div>
      </div>
      {card.lesson ? <Lesson lesson={card.lesson} /> : null}
    </div>
  ) : (
    <div>Ooops, this card doesn`&apos;`t exist</div>
  );
};

export default CardDetailsPage;
