import { GetServerSidePropsContext } from 'next';
import CardEditor from '@/CardEditor';

import withAuth, {
  getServerSideProps as getServerSideAuthProps
} from '@/withAuth';

const AdminAuth = () => {
  // TODO Fix this
  return <CardEditor />;
};

export default withAuth(AdminAuth);

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const authProps = await getServerSideAuthProps(ctx);

  return { props: { ...authProps.props } };
}
