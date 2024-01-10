import { GetServerSidePropsContext } from 'next';
import { useContext } from 'react';
import CardCarousel from '@/CardCarousel';
import CardGrid from '@/CardGrid';
import withAuth, {
  getServerSideProps as getServerSideAuthProps
} from '@/withAuth';
import FilterBar from 'src/components/FilterBar';
import { GlobalContext } from '~/context/GlobalContext';

const CardPage = () => {
  const { isMobile } = useContext(GlobalContext);

  return (
    <div className="flex flex-col-reverse h-full w-full md:flex-row">
      <FilterBar />

      {isMobile ? <CardCarousel /> : <CardGrid />}
    </div>
  );
};

export default withAuth(CardPage);

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const authProps = await getServerSideAuthProps(ctx);

  return { props: { ...authProps.props } };
}
