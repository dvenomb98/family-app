import { XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import React from 'react';

interface MessageProps {
  text: string;
  isError?: boolean;
  clearMessage?: () => void;
}

const Message: React.FC<MessageProps> = ({ text, isError = false, clearMessage }) => {
  return (
    <p
      className={classNames(
        ' text-primary-white p-3 rounded-md',
        isError ? 'bg-primary-red' : 'bg-green-500',
        clearMessage && 'flex justify-between items-center',
      )}
    >
      {text}
      {clearMessage && <XMarkIcon onClick={clearMessage} className="w-5 h-5 cursor-pointer" />}
    </p>
  );
};

export default Message;
