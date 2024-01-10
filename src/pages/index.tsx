import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import withAuth, {
  getServerSideProps as getServerSideAuthProps
} from '@/withAuth';
import { CollectorContext } from '~/context/CollectorContext';

const Home = () => {
  const { isLoggedIn } = useContext(CollectorContext);

  return <div>Home Page</div>;
};

export default withAuth(Home);

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const authProps = await getServerSideAuthProps(ctx);

  return { props: { ...authProps.props } };
}
