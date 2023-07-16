import { Dialog } from '@headlessui/react';
import { useContext } from 'react';
import BlueBtn from '@/Global/BlueBtn';
import ModalEnum from '~/constants/modalEnum';
import { ModalContext } from '~/context/ModalContext';

const UnlockModal = () => {
  const { setOpenModal } = useContext(ModalContext);

  return (
    <Dialog.Panel className="bg-white flex flex-col gap-16 h-[400px] mx-auto w-[400px]">
      <Dialog.Title className="font-bold shadow shadow-black text-24 text-center w-full">
        Ways to Unlock
      </Dialog.Title>
      <Dialog.Description className="px-20">
        All cards can be unlocked individually by taking a quiz based on the
        history lesson section of the page. This will also unlock special in
        game content once enough cards have been unlocked. Or you can visit our
        shop to unlock multiple cards in one go. This will not unlock the in
        game content but dont worry you can come back and take the quiz any time
        you like to obtain te content
      </Dialog.Description>

      <div className="flex justify-around">
        <BlueBtn>Card Shop</BlueBtn>
        <BlueBtn onClick={() => setOpenModal(ModalEnum.Quiz)}>
          Take Quiz
        </BlueBtn>
      </div>
    </Dialog.Panel>
  );
};

export default UnlockModal;
