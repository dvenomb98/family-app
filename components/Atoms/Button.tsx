import classNames from 'classnames';
import React from 'react';
import Loader from './Loader';

interface ButtonProps {
  text: string;
  gradient?: boolean;
  isSubmit?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  gradient = false,
  isSubmit = false,
  loading = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick && onClick}
      type={isSubmit ? 'submit' : 'button'}
      className={classNames(
        'bg-primary-blue p-3 w-full text-primary-white rounded-md flex items-center justify-center whitespace-nowrap',
        gradient && 'gradientBg',
      )}
    >
      {loading ? <Loader /> : text}
    </button>
  );
};

export default Button;
