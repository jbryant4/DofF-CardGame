import { GetServerSidePropsContext } from 'next';
import DeckEditor from '@/Forge/DeckEditor';
import DeckList from '@/Forge/DeckList';
import withAuth, {
  getServerSideProps as getServerSideAuthProps
} from '@/withAuth';
import { ForgeProvider } from '~/context/ForgeContext';

const Forge = () => {
  return (
    <ForgeProvider>
      <div className="flex gap-16 h-full overflow-hidden px-12 py-8">
        <DeckList />
        <DeckEditor />
      </div>
    </ForgeProvider>
  );
};

export default withAuth(Forge);

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const authProps = await getServerSideAuthProps(ctx);

  return { props: { ...authProps.props } };
}
