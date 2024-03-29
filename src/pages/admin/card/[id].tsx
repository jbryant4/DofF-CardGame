import { useRouter } from 'next/router';
import { useContext } from 'react';
import FinalCard from '@/FinalCard';

import { CardContext } from '~/context/CardContext';
import useGetCard from '~/hooks/useGetCard';

const CardEditPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { card } = useGetCard(id);

  return card ? (
    <div className="flex h-full items-center justify-around w-full">
      <FinalCard card={{ ...card, id: id, faceUp: true, position: 'attack' }} />
      <FinalCard
        card={{ ...card, id: id, faceUp: false, position: 'attack' }}
      />
    </div>
  ) : (
    <div>Ooops, this card doesn`&apos;`t exist</div>
  );
};

export default CardEditPage;
