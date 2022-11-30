import React, { createContext, useContext, useState } from 'react';

interface ProviderProps {
  children: JSX.Element;
}

const initalValues = {
  hideAllModals: (): void => undefined,
  showNewUserModal: (): void => undefined,
  showCreateTaskModal: (): void => undefined,
  openNewUserModal: false,
  openCreateTaskModal: false,
};

const ModalContext = createContext(initalValues);

export const ModalContextProvider: React.FC<ProviderProps> = ({ children }) => {
  // TODO: need rework for multiple modals, implement some DRY principle

  // STATES
  const [openNewUserModal, setOpenNewUserModal] = useState<boolean>(false);
  const [openCreateTaskModal, setOpenCreateTaskModal] = useState<boolean>(false);

  // FUNCTION FOR OPENING EVERY MODAL
  const showNewUserModal = () => setOpenNewUserModal(true);
  const showCreateTaskModal = () => setOpenCreateTaskModal(true);

  // HIDE ALL MODALS
  const hideAllModals = () => {
    setOpenNewUserModal(false);
    setOpenCreateTaskModal(false);
  };

  return (
    <ModalContext.Provider
      value={{
        hideAllModals,
        showNewUserModal,
        openNewUserModal,
        openCreateTaskModal,
        showCreateTaskModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  return useContext(ModalContext);
};
