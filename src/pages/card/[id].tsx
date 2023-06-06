import { useRouter } from 'next/router';
import { useContext } from 'react';
import { CardContext } from '~/context/CardContext';
import Hero from '@/Hero';
import CombatStats from '@/CombatStats';

const CardDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { cards } = useContext(CardContext);
  const card = cards.find(card => card._id === id);

  console.log(cards.length, card);
  return card ? (
    <div className="h-full relative">
      <Hero card={card} />
      <CombatStats />
      <div>lesson</div>
      <div className="absolute bg-blue-400 bottom-0 flex h-56 w-full md:hidden">
        <div className="bg-gray-700 font-bold mx-auto my-auto px-24 py-8 rounded-full text-2xl w-fit">
          Unlock: {card.title}
        </div>
      </div>
    </div>
  ) : (
    <div>Ooops this card doesnt exist</div>
  );
};

export default CardDetailsPage;
