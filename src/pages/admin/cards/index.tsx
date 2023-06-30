import { useContext } from 'react';
import CardEditor from '@/CardEditor';
import GateWay from '@/GateWay';
import { GlobalContext } from '~/context/GlobalContext';

const AdminAuth = () => {
  const { isAdmin } = useContext(GlobalContext);
  console.log(isAdmin);

  return isAdmin ? <CardEditor /> : <GateWay />;
};

export default AdminAuth;
