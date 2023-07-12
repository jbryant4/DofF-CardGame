import { Dialog } from '@headlessui/react';
import dynamic from 'next/dynamic';
import { useContext } from 'react';
import ModalEnum from '~/constants/modalEnum';
import { ModalContext } from '~/context/ModalContext';

const BreakDownModal = dynamic(() => import('./BreakDownModal'));
const UnlockModal = dynamic(() => import('./UnlockModal'));

const Modals = () => {
  const { isModalOverlayOpen, openModal, setOpenModal } =
    useContext(ModalContext);

  return (
    <Dialog
      open={isModalOverlayOpen}
      onClose={() => setOpenModal(ModalEnum.None)}
      className="relative z-50"
    >
      <div className="bg-black/50 fixed inset-0" aria-hidden="true" />
      <div className="fixed flex inset-0 items-center justify-center p-4">
        {openModal === ModalEnum.Unlock && <UnlockModal />}
        {openModal === ModalEnum.Breakdown && <BreakDownModal />}
      </div>
    </Dialog>
  );
};

export default Modals;
