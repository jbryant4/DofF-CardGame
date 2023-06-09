import { useRouter } from 'next/router';
import { useContext } from 'react';
import { CardContext } from '~/context/CardContext';
import Hero from '@/Hero';
import CombatStats from '@/CombatStats';
import Lesson from '@/Lesson';

const CardDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { cards } = useContext(CardContext);
  const card = cards.find(card => card._id === id);

  const testText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Habitasse platea dictumst quisque sagittis purus. Hac habitasse platea dictumst vestibulum rhoncus est. Morbi non arcu risus quis varius quam quisque id diam. Aenean euismod elementum nisi quis eleifend. Morbi tristique senectus et netus et malesuada fames ac. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Neque ornare aenean euismod elementum. Cursus risus at ultrices mi. Ipsum a arcu cursus vitae congue mauris rhoncus.Nibh cras pulvinar mattis nunc sed blandit libero. Feugiat nibh sed pulvinar proin. Sit amet cursus sit amet dictum sit amet justo. Auctor augue mauris augue neque gravida in fermentum et sollicitudin. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci. Pellentesque dignissim enim sit amet venenatis urna cursus eget nunc. Pulvinar neque laoreet suspendisse interdum consectetur libero id. Sit amet justo donec enim diam vulputate ut. Et malesuada fames ac turpis egestas maecenas pharetra convallis posuere. Quam pellentesque nec nam aliquam sem et tortor. Vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Nisi scelerisque eu ultrices vitae auctor eu augue. Ac placerat vestibulum lectus mauris. Volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim. Montes nascetur ridiculus mus mauris vitae ultricies leo integer. Sollicitudin tempor id eu nisl nunc.';
  console.log(cards.length, card);
  return card ? (
    <>
      <div className="flex flex-col h-full overflow-y-auto pb-[54px] pt-24 px-24">
        <Hero card={card} />
        <CombatStats attack={card.atk} health={card.hp} defense={card.def} />
        <Lesson description={testText} />
      </div>
      <div className="bg-blue-400 h-fit py-8 w-full md:hidden">
        <div className="bg-gray-700 font-bold mx-auto my-auto px-24 py-8 rounded-full text-2xl">
          Unlock: {card.title}
        </div>
      </div>
    </>
  ) : (
    <div>Ooops, this card doesn't exist</div>
  );
};

export default CardDetailsPage;
