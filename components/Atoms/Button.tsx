import classNames from 'classnames';
import React from 'react';
import Loader from './Loader';

interface ButtonProps {
  children: JSX.Element;
  gradient?: boolean;
  isSubmit?: boolean;
  loading?: boolean;
  onClick?: () => void;
  customStyles?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  gradient = false,
  isSubmit = false,
  loading = false,
  onClick,
  customStyles,
}) => {
  return (
    <button
      onClick={onClick && onClick}
      type={isSubmit ? 'submit' : 'button'}
      className={classNames(
        'bg-primary-blue p-3 w-full text-primary-white rounded-md flex items-center justify-center whitespace-nowrap',
        gradient && 'gradientBg',
        customStyles,
      )}
    >
      {loading ? <Loader /> : children}
    </button>
  );
};

export default Button;
