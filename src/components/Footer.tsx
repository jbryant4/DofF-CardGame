import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { ActionBtn } from '@/Modals/BattleCardModal/BattleCardModal.styles';
import { auth } from '@firebaseUiConfig';
import { useCollectorContext } from '~/context/CollectorContext';

export default function Footer() {
  const {
    collector: { data: collector }
  } = useCollectorContext();
  const router = useRouter();

  async function handleLogout() {
    signOut(auth)
      .then(() => void router.push('/gateway'))
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error([errorCode, errorMessage]);
      });
  }

  return (
    <div className="bg-blue-800 flex h-full items-center justify-end max-h-[36px] px-24">
      {collector?.userName && (
        <ActionBtn disabled={false} onClick={handleLogout}>
          Logout
        </ActionBtn>
      )}
    </div>
  );
}
