import React, { createContext, useEffect, useState } from 'react';

import ModalEnum from '~/constants/modalEnum';
import { CardType, DuelingCard } from '~/contracts/card';

export type ModalInfo = {
  id: string;
  type: CardType;
  isEnemy: boolean;
};

export const defaultModalInfo: ModalInfo = {
  id: '',
  type: 'army',
  isEnemy: false
};

export type ModalCard = DuelingCard & { isEnemy: boolean };
type ModalContextType = {
  openModal: ModalEnum;
  isModalOverlayOpen: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<ModalEnum>>;
  modalInfo: ModalInfo;
  setModalInfo: React.Dispatch<React.SetStateAction<ModalInfo>>;
};

const defaultModalContext: ModalContextType = {
  openModal: ModalEnum.None,
  isModalOverlayOpen: false,
  setOpenModal: _value => {},
  modalInfo: { ...defaultModalInfo },
  setModalInfo() {}
};
export const ModalContext =
  createContext<ModalContextType>(defaultModalContext);

// Create the modal context provider component
export const ModalProvider = ({ children }) => {
  const [isModalOverlayOpen, setOverlayOpen] = useState(
    defaultModalContext.isModalOverlayOpen
  );
  const [openModal, setOpenModal] = useState(defaultModalContext.openModal);
  const [modalInfo, setModalInfo] = useState(defaultModalContext.modalInfo);

  // On Every Modal state change check if a modal should be open
  useEffect(() => {
    setOverlayOpen(openModal !== ModalEnum.None);
  }, [openModal]);

  return (
    <ModalContext.Provider
      value={{
        isModalOverlayOpen,
        openModal,
        setOpenModal,
        modalInfo,
        setModalInfo
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
export function useModalContext() {
  return React.useContext(ModalContext);
}
