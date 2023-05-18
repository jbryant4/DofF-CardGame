import { useUser } from '@auth0/nextjs-auth0/client';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { Africa } from '~/constants/starterDecks';
import { CollectorContext } from '~/context/CollectorContext';
import { CollectorDocument } from '~/models/Collector';

const MyForm = () => {
  const [userName, setUsername] = useState('');
  const [errorText, setErrorText] = useState('');
  const { user: { email = '' } = {} } = useUser();
  const router = useRouter();
  const { fetchCollectorByUserName, createCollector } =
    useContext(CollectorContext);

  const handleInputChange = e => {
    setUsername(e.target.value.trimStart());
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErrorText('');
    setUsername(userName.trim());

    const userNameExist = await fetchCollectorByUserName(userName);
    if (userNameExist) {
      setErrorText('User Name Already Exist');
    } else {
      const payload: CollectorDocument = {
        email,
        userName,
        cards: [],
        decks: [Africa]
      };
      await createCollector(payload);

      router.push('/');
    }

    // Perform any actions with the username (e.g., submit the form, trigger an API request, etc.)
    console.log('Username:', userName);
  };

  return (
    <div className="flex flex-col h-full items-center">
      <div className="my-36">Create a UserName</div>
      <form
        className="flex flex-col gap-4 mt-4 mx-auto w-[300px]"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <input
            className="border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-blue-500 px-4 py-2 rounded-md w-full"
            id="username"
            type="text"
            value={userName}
            onChange={handleInputChange}
            required
            placeholder="UserName"
          />
        </div>
        <button
          className="bg-blue-500 focus:bg-blue-600 focus:outline-none hover:bg-blue-600 px-4 py-2 rounded-md text-white w-full"
          type="submit"
          disabled={!userName.trim()}
        >
          Start Collecting
        </button>
      </form>
      <div className={classNames('text-rose-800', { hidden: !errorText })}>
        {errorText}
      </div>
    </div>
  );
};

export default MyForm;
