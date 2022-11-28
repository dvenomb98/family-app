import classNames from 'classnames';
import React from 'react';

interface MessageProps {
  text: string;
  isError?: boolean;
}

const Message: React.FC<MessageProps> = ({ text, isError = false }) => {
  return (
    <p
      className={classNames(
        ' text-primary-white p-3 rounded-md',
        isError ? 'bg-primary-red' : 'bg-green-500',
      )}
    >
      {text}
    </p>
  );
};

export default Message;
