import { Dialog } from '@headlessui/react';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { ActionBtn } from '@/Modals/BattleCardModal/BattleCardModal.styles';
import { db, auth } from '@firebaseUiConfig';
import { useCollectorContext } from '~/context/CollectorContext';

export default function UserNameModal() {
  const [userName, setUserName] = useState('');
  const {
    collector: { data, setData }
  } = useCollectorContext();

  const handleUserNameChange = event => {
    setUserName(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (!userName.trim()) {
      alert('Please enter a valid username.');

      return;
    }

    // Assuming the user is logged in and their UID is accessible via auth.currentUser.uid
    const userUid = auth.currentUser?.uid;
    if (!userUid) {
      alert('No user logged in.');

      return;
    }

    const userDocRef = doc(db, 'collectors', userUid);
    try {
      await updateDoc(userDocRef, {
        userName: userName
      });

      setData(prevState => {
        if (prevState != null) {
          return { ...prevState, userName };
        } else {
          return prevState;
        }
      });
    } catch (error) {
      console.error('Error updating username:', error);
      alert('Failed to update username.');
    }
  };

  return (
    <Dialog.Panel className="bg-white flex flex-col gap-16 h-[400px] mx-auto w-[400px]">
      <Dialog.Title className="font-bold shadow shadow-black text-24 text-center w-full">
        Welcome New Collector
      </Dialog.Title>
      <Dialog.Description className="px-20">
        Please enter a username that you would like to be know for
      </Dialog.Description>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-16 items-center mx-auto w-1/2"
      >
        <label htmlFor="userNameInput">Enter your username:</label>
        <input
          id="userNameInput"
          type="text"
          value={userName}
          onChange={handleUserNameChange}
          placeholder="Username"
          className="appearance-none border focus:outline-none focus:shadow-outline leading-tight px-3 py-2 rounded shadow text-gray-700 w-full"
        />
        <ActionBtn type={'submit'} disabled={userName.trim().length === 0}>
          Update Username
        </ActionBtn>
      </form>
    </Dialog.Panel>
  );
}
