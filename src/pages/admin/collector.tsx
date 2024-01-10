import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import withAuth, {
  getServerSideProps as getServerSideAuthProps
} from '@/withAuth';
import { CollectorDocument } from '~/models/Collector';
import hasSpecialCharacters from '~/utils/getHasSpecialCharacters';
import useLoadableState from '~/utils/useLoadableState';

const AdminCollector = () => {
  const [userName, setUserName] = useState('');
  const [codePhrase, setCodePhrase] = useState('');
  const {
    isLoading,
    setData,
    data: created,
    setLoading,
    setError,
    reset
  } = useLoadableState<CollectorDocument | undefined>(undefined);
  const disableBtn = !userName.trim() || !codePhrase.trim();
  const [isAdmin, setAdmin] = useState(false);

  async function handleFormSubmit(e) {
    e.preventDefault();
    reset();

    if (hasSpecialCharacters(userName) || hasSpecialCharacters(codePhrase)) {
      setError(new Error('no special characters'));

      return;
    }

    try {
      setLoading();

      const response = await fetch(`/api/collector`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userName,
          codePhrase,
          email: `${userName}@test.com`,
          isAdmin,
          cards: [],
          decks: []
        })
      });

      if (response.ok) {
        setData(await response.json());
        setUserName(''); // Optionally clear the form fields
        setCodePhrase('');
      }
    } catch (error) {
      setError(new Error("'broken-server create play tester'"));
    }
  }

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <h2 className="font-bold mb-36 text-24">Create Play Tester</h2>
      <form className="max-w-sm w-full" onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label
            className="block font-bold mb-2 text-gray-700 text-sm"
            htmlFor="userName"
          >
            User Name
          </label>
          <input
            className="appearance-none border focus:outline-none focus:shadow-outline leading-tight px-3 py-2 rounded shadow text-gray-700 w-full"
            id="userName"
            type="text"
            placeholder="Enter User Name"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block font-bold mb-2 text-gray-700 text-sm"
            htmlFor="codePhrase"
          >
            Code Phrase
          </label>
          <input
            className="appearance-none border focus:outline-none focus:shadow-outline leading-tight px-3 py-2 rounded shadow text-gray-700 w-full"
            id="codePhrase"
            type="text"
            placeholder="Enter code phrase"
            value={codePhrase}
            onChange={e => setCodePhrase(e.target.value)}
          />
          <label className="block font-bold mb-2 text-gray-700 text-sm">
            Is Admin
          </label>
          <input
            className="border focus:outline-none focus:shadow-outline leading-tight px-3 py-2 rounded shadow text-gray-700 w-16"
            type="checkbox"
            onChange={() => setAdmin(prevState => !prevState)}
          />
        </div>
        <div className="flex flex-col gap-8 mb-4">
          <button
            disabled={disableBtn}
            className="bg-blue-500 focus:outline-none focus:shadow-outline font-bold hover:bg-blue-700 px-4 py-2 rounded text-white"
            type="submit"
          >
            {isLoading ? 'Creating...' : 'Create play tester'}
          </button>
          {created && (
            <div className="flex overflow-auto whitespace-normal">
              {JSON.stringify(created)}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default withAuth(AdminCollector);

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const authProps = await getServerSideAuthProps(ctx);

  return { props: { ...authProps.props } };
}
