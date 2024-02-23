import { signOut } from 'firebase/auth';
import { ActionBtn } from '@/Modals/BattleCardModal/BattleCardModal.styles';
import { useCollectorContext } from '~/context/CollectorContext';
import { auth } from '../../firebase';

export default function Footer() {
  const { collector } = useCollectorContext();
  async function handleLogout() {
    signOut(auth)
      .then()
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
