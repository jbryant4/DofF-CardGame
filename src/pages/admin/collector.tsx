import { setDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { ActionBtn } from '@/Modals/BattleCardModal/BattleCardModal.styles';

import { Collector } from '~/contracts/collector';
import { auth, Collections, db } from '../../../firebase';

const AdminCollector = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [codePhrase, setCodePhrase] = useState('');
  const [isAdmin, setAdmin] = useState(false);
  const disableBtn = !email.trim() || !codePhrase.trim() || !userName.trim();

  const [createUserWithEmailAndPassword, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  async function handleFormSubmit(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    const credential = await createUserWithEmailAndPassword(email, codePhrase);
    if (!credential || error) {
      throw new Error(`User creation failed`);
    }

    try {
      const collector: Collector = {
        id: credential.user.uid,
        userName,
        cards: [],
        decks: [],
        isAdmin
      };
      await setDoc(doc(db, Collections.Collectors, collector.id), collector);
    } catch (err) {
      console.error('Error writing document: ', err);
    }
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div className="bg-gray-600 border border-gray-600 flex flex-col flex-shrink-0 p-24 rounded shadow shadow-gray-600 w-[400px]">
        <h2 className="font-bold mb-36 text-24">Create Play Tester</h2>
        <form className="flex flex-col gap-16 max-w-sm w-full">
          <div>
            <label
              className="block font-bold mb-2 text-blue-300 text-sm"
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
          <div>
            <label
              className="block font-bold mb-2 text-blue-300 text-sm"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="appearance-none border focus:outline-none focus:shadow-outline leading-tight px-3 py-2 rounded shadow text-gray-700 w-full"
              id="email"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block font-bold mb-2 text-blue-300 text-sm"
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
          <div className="flex gap-24">
            <label className="block font-bold mb-2 text-blue-300 text-sm">
              Is Admin
            </label>
            <input
              className="border focus:outline-none focus:shadow-outline leading-tight px-3 py-2 rounded shadow text-gray-700 w-16"
              type="checkbox"
              onChange={() => setAdmin(prevState => !prevState)}
            />
          </div>
          <div className="flex flex-col gap-8 mb-4">
            <ActionBtn disabled={disableBtn} onClick={e => handleFormSubmit(e)}>
              {loading ? 'Creating...' : 'Create play tester'}
            </ActionBtn>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCollector;
