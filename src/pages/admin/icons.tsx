import { GetServerSidePropsContext } from 'next';
import IconLibrary from '@/IconLibrary';
import withAuth, {
  getServerSideProps as getServerSideAuthProps
} from '@/withAuth';

const IconAdminPage = () => <IconLibrary />;

export default withAuth(IconAdminPage);

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const authProps = await getServerSideAuthProps(ctx);

  return { props: { ...authProps.props } };
}
