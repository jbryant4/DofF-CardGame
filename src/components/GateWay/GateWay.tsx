import { useRouter } from 'next/router';
import { useState } from 'react';
import { authCookie } from '~/constants/cookies';
import { useCollector } from '~/context/CollectorContext';
import { CollectorDocument } from '~/models/Collector';
import hasSpecialCharacters from '~/utils/getHasSpecialCharacters';
import { setCookie } from '~/utils/token';

export default function GateWay() {
  const [userName, setUserName] = useState('');
  const [codePhrase, setCodePhrase] = useState('');
  const disableBtn = !userName.trim() || !codePhrase.trim();
  const { setCollector } = useCollector();
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    if (hasSpecialCharacters(userName) || hasSpecialCharacters(codePhrase)) {
      return;
    }

    try {
      const response = await fetch(`/api/collector/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userName, codePhrase })
      });

      if (response.ok) {
        const userData: { collector: CollectorDocument; token: string } =
          await response.json();

        // Assuming you have a function to handle JWT and cookie storage
        setCollector(userData.collector);
        setCookie(authCookie, userData.token, 30);
        void router.push('/');
      } else {
        console.error(response);
        // Handle login failure, display error messages, etc.
      }
    } catch (error) {
      console.error('broken-server during login');
    }
  }

  return (
    <div className="flex flex-col h-full items-center justify-center max-w-[1200px]">
      <img src="/logo.png" className="w-[500px]" />
      <form className="max-w-sm w-full" onSubmit={handleSubmit}>
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
        </div>
        <div className="flex flex-col gap-8 mb-4">
          <button
            disabled={disableBtn}
            className="bg-blue-500 focus:outline-none focus:shadow-outline font-bold hover:bg-blue-700 px-4 py-2 rounded text-white"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
