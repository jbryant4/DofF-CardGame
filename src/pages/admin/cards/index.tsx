import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import CardEditor from '@/CardEditor';
import GateWay from '@/GateWay';
import { CollectorContext } from '~/context/CollectorContext';
import { GlobalContext } from '~/context/GlobalContext';

const AdminAuth = () => {
  const { isAdmin } = useContext(GlobalContext);
  console.log(isAdmin);

  return isAdmin ? <CardEditor /> : <GateWay />;
};

export default AdminAuth;
