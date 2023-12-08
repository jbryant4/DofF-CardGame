import { useEffect, useState } from 'react';
import DuelOfFates from '@/DuelOfFates';
import { useSetupAdminBoard } from '~/hooks/BoardHooks';

type OwnProps = {};
// This Page is strictly for testing ui that is why I am keeping some of the hooks around to mimic what the game should function like
const AdminGame = ({}: OwnProps) => {
  const [isSetUp, setSetUp] = useState(false);
  const setUpAdminGame = useSetupAdminBoard();

  useEffect(() => {
    if (isSetUp) return;
    setUpAdminGame();
    setSetUp(true);
  }, [setUpAdminGame, isSetUp, setSetUp]);

  return <DuelOfFates />;
};

export default AdminGame;
