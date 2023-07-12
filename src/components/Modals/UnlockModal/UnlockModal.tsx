import { Dialog } from '@headlessui/react';

const UnlockModal = () => {
  return (
    <Dialog.Panel className="bg-white h-[400px] mx-auto w-[400px]">
      <Dialog.Title>Deactivate account</Dialog.Title>
      <Dialog.Description>
        This will permanently deactivate your account
      </Dialog.Description>

      <p>Unlock</p>
    </Dialog.Panel>
  );
};

export default UnlockModal;
