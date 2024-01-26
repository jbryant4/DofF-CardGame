import { GetServerSidePropsContext } from 'next';
import { useContext } from 'react';
import withAuth, {
  getServerSideProps as getServerSideAuthProps
} from '@/withAuth';
import { CollectorContext } from '~/context/CollectorContext';

const Collection = () => {
  const { collector } = useContext(CollectorContext);
  console.log(collector);

  return <div>Welcome Collector</div>;
};

export default withAuth(Collection);

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const authProps = await getServerSideAuthProps(ctx);

  return { props: { ...authProps.props } };
}
