import React, { createContext, useEffect, useState } from 'react';
import DuelingCard from '~/constants/DuelingCard';
import ModalEnum from '~/constants/modalEnum';
import { GameContext } from '~/context/GameContext';

type ModalCard = DuelingCard & { isEnemy: boolean };
type ModalContextType = {
  openModal: ModalEnum;
  isModalOverlayOpen: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<ModalEnum>>;
  modalCard: ModalCard | null;
  setModalCard: React.Dispatch<React.SetStateAction<ModalCard | null>>;
};

const defaultModalContext: ModalContextType = {
  openModal: ModalEnum.None,
  isModalOverlayOpen: false,
  setOpenModal: _value => {},
  modalCard: null,
  setModalCard() {}
};
export const ModalContext =
  createContext<ModalContextType>(defaultModalContext);

// Create the modal context provider component
export const ModalProvider = ({ children }) => {
  const [isModalOverlayOpen, setOverlayOpen] = useState(
    defaultModalContext.isModalOverlayOpen
  );
  const [openModal, setOpenModal] = useState(defaultModalContext.openModal);
  const [modalCard, setModalCard] = useState(defaultModalContext.modalCard);

  useEffect(() => {
    if (!modalCard) return;
    setOpenModal(ModalEnum.BattleCard);
  }, [modalCard]);
  // On Every Modal state change check if a modal should be open
  useEffect(() => setOverlayOpen(openModal !== ModalEnum.None), [openModal]);

  return (
    <ModalContext.Provider
      value={{
        isModalOverlayOpen,
        openModal,
        setOpenModal,
        modalCard,
        setModalCard
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
export function useModalContext() {
  return React.useContext(ModalContext);
}
