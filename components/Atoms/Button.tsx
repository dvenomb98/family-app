import classNames from 'classnames';
import React from 'react';
import Loader from './Loader';

interface ButtonProps {
  text: string;
  gradient?: boolean;
  isSubmit?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  gradient = false,
  isSubmit = false,
  loading = false,
}) => {
  return (
    <button
      type={isSubmit ? 'submit' : 'button'}
      className={classNames(
        'bg-primary-blue p-3 w-full text-primary-white rounded-md flex items-center justify-center',
        gradient && 'gradientBg',
      )}
    >
      {loading ? <Loader /> : text}
    </button>
  );
};

export default Button;
