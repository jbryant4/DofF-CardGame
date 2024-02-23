import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { auth } from '../../../firebase';

export default function GateWay() {
  const [email, setEmail] = useState('');
  const [codePhrase, setCodePhrase] = useState('');
  const disableBtn = !email.trim() || !codePhrase.trim();
  const router = useRouter();

  async function handleSubmit(e) {
    console.log('in handle submit');
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, codePhrase)
      .then(() => {
        void router.push('/');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error([errorCode, errorMessage]);
      });
  }

  return (
    <div className="flex flex-col h-full items-center justify-center max-w-[1200px]">
      <img src="/logo.png" className="w-[500px]" />
      <form className="max-w-sm mx-auto w-full" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block font-bold mb-2 text-gray-700 text-sm"
            htmlFor="email"
          >
            User Name
          </label>
          <input
            className="appearance-none border focus:outline-none focus:shadow-outline leading-tight px-3 py-2 rounded shadow text-gray-700 w-full"
            id="email"
            type="text"
            placeholder="Enter User Name"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
