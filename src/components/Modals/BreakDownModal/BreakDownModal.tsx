import { Dialog } from '@headlessui/react';

const BreakDownModal = () => {
  return (
    <Dialog.Panel className="bg-white h-[400px] mx-auto w-[400px]">
      <Dialog.Title>Deactivate account</Dialog.Title>
      <Dialog.Description>
        This will permanently deactivate your account
      </Dialog.Description>

      <p>BreakDown</p>
    </Dialog.Panel>
  );
};

export default BreakDownModal;
