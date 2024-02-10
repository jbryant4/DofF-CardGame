import { GetServerSidePropsContext } from 'next';
import withAuth, {
  getServerSideProps as getServerSideAuthProps
} from '@/withAuth';

const Home = () => {
  return <div>Home Page</div>;
};

export default withAuth(Home);

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const authProps = await getServerSideAuthProps(ctx);

  return { props: { ...authProps.props } };
}
