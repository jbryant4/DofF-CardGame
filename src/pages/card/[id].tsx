import { useRouter } from 'next/router';
import { useContext } from 'react';
import Card from '@/Card';
import Lesson from '@/Lesson';
import { CardContext } from '~/context/CardContext';

const CardDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { cards } = useContext(CardContext);
  const card = cards.find(c => c._id === id);

  return card ? (
    <div className="grid grid-cols-[1fr,2fr] h-full items-center overflow-y-auto pb-[54px] pt-24 px-24">
      <Card card={card} />
      {card.lesson ? <Lesson lesson={card.lesson} /> : null}
    </div>
  ) : (
    <div>Ooops, this card doesn`&apos;`t exist</div>
  );
};

export default CardDetailsPage;
