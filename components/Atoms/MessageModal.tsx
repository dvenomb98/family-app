import React, { Dispatch, SetStateAction } from 'react';
import Button from './Button';
import Message from './Message';
import Modal from './Modal';

interface MessageModalProps {
  message: string;
  error: boolean;
  resetValidation: () => void;
  openMessageModal: boolean;
}

const MessageModal: React.FC<MessageModalProps> = ({
  message,
  error,
  openMessageModal,
  resetValidation,
}) => {
  return (
    <Modal title={'Úkol'} open={openMessageModal} onClose={resetValidation}>
      <Message isError={error} text={message} />
    </Modal>
  );
};

export default MessageModal;
