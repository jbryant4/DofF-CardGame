import { useEffect } from 'react';
import ModalEnum from '~/constants/modalEnum';
import { useCollectorContext } from '~/context/CollectorContext';
import { useModalContext } from '~/context/ModalContext';

const Home = () => {
  const {
    collector: { data, isLoaded }
  } = useCollectorContext();
  const { setOpenModal } = useModalContext();

  useEffect(() => {
    if (isLoaded) {
      setOpenModal(data?.userName ? ModalEnum.None : ModalEnum.UserName);
    }
  }, [data?.userName, isLoaded, setOpenModal]);

  return <div>Home Page</div>;
};

export default Home;
