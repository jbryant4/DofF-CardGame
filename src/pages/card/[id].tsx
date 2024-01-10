import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import CardDisplay from '@/CardDisplay';
import Lesson from '@/Lesson';
import withAuth, {
  getServerSideProps as getServerSideAuthProps
} from '@/withAuth';
import { CardContext } from '~/context/CardContext';

const CardDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { getCard } = useContext(CardContext);
  const card = getCard(id);

  return card ? (
    <div className="grid grid-rows-[1fr,2fr] h-full items-center max-w-[1200px] mx-auto overflow-y-auto pb-[54px] pt-24 px-24">
      <CardDisplay card={{ ...card, id }} />
      {card.lesson ? <Lesson lesson={card.lesson} /> : null}
    </div>
  ) : (
    <div>Ooops, this card doesn`&apos;`t exist</div>
  );
};

export default withAuth(CardDetailsPage);

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const authProps = await getServerSideAuthProps(ctx);

  return { props: { ...authProps.props } };
}
