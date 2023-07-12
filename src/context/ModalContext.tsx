import React, { createContext, useEffect, useState } from 'react';
import ModalEnum from '~/constants/modalEnum';

type ModalContextType = {
  openModal: ModalEnum;
  isModalOverlayOpen: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<ModalEnum>>;
};

const defaultModalContext: ModalContextType = {
  openModal: ModalEnum.None,
  isModalOverlayOpen: false,
  setOpenModal: _value => {}
};
export const ModalContext =
  createContext<ModalContextType>(defaultModalContext);

// Create the modal context provider component
export const ModalProvider = ({ children }) => {
  const [isModalOverlayOpen, setOverlayOpen] = useState(
    defaultModalContext.isModalOverlayOpen
  );
  const [openModal, setOpenModal] = useState(defaultModalContext.openModal);

  // On Every Modal state change check if a modal should be open
  useEffect(() => setOverlayOpen(openModal !== ModalEnum.None), [openModal]);

  return (
    <ModalContext.Provider
      value={{
        isModalOverlayOpen,
        openModal,
        setOpenModal
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
