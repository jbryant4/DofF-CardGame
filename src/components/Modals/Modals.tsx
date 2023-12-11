import { Dialog } from '@headlessui/react';
import dynamic from 'next/dynamic';
import { useContext, useEffect, useState } from 'react';
import ModalEnum from '~/constants/modalEnum';
import { ModalContext } from '~/context/ModalContext';

const BreakDownModal = dynamic(() => import('./BreakDownModal'));
const UnlockModal = dynamic(() => import('./UnlockModal'));
const QuizModal = dynamic(() => import('./QuizModal'));
const BattleCardModal = dynamic(() => import('./BattleCardModal'));

const Modals = () => {
  const { isModalOverlayOpen, openModal, setOpenModal, setModalCard } =
    useContext(ModalContext);
  const [confirmClose, setConfirm] = useState(false);
  const handleClose = () => {
    if (openModal === ModalEnum.Quiz) {
      setConfirm(true);
    } else if (openModal === ModalEnum.BattleCard) {
      setOpenModal(ModalEnum.None);
      setModalCard(null);
    } else {
      setOpenModal(ModalEnum.None);
    }
  };

  useEffect(() => {
    setConfirm(false);
  }, [openModal]);

  return (
    <Dialog
      open={isModalOverlayOpen}
      onClose={handleClose}
      className="relative z-50"
    >
      <div className="bg-black/50 fixed inset-0" aria-hidden="true" />
      <div className="fixed flex inset-0 items-center justify-center p-4">
        {openModal === ModalEnum.Unlock && <UnlockModal />}
        {openModal === ModalEnum.Breakdown && <BreakDownModal />}
        {openModal === ModalEnum.Quiz && (
          <QuizModal confirmClose={confirmClose} setConfirm={setConfirm} />
        )}
        {openModal === ModalEnum.BattleCard && <BattleCardModal />}
      </div>
    </Dialog>
  );
};

export default Modals;
