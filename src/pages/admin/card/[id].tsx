import { useRouter } from 'next/router';
import { useContext } from 'react';
import UpdatedCard from '@/UpdatedCard';
import { CardContext } from '~/context/CardContext';

const CardEditPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { getCard } = useContext(CardContext);
  const card = getCard(id);

  return card ? (
    <div className="flex h-full items-center justify-around w-full">
      <UpdatedCard card={card} />
    </div>
  ) : (
    <div>Ooops, this card doesn`&apos;`t exist</div>
  );
};

export default CardEditPage;
