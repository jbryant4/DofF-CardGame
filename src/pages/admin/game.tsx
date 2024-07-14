import { useEffect, useState } from 'react';
import DuelOfFates from '@/DuelOfFates';

type OwnProps = {};
// This Page is strictly for testing ui that is why I am keeping some of the hooks around to mimic what the game should function like
const AdminGame = ({}: OwnProps) => {
  const [isSetUp, setSetUp] = useState(false);

  useEffect(() => {
    if (isSetUp) return;
    setSetUp(true);
  }, [isSetUp, setSetUp]);

  return <DuelOfFates />;
};

export default AdminGame;
