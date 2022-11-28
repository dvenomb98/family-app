import classNames from 'classnames';
import React from 'react';

interface ButtonProps {
  text: string;
  gradient?: boolean;
  isSubmit?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, gradient = false, isSubmit = false }) => {
  return (
    <button
      type={isSubmit ? 'submit' : 'button'}
      className={classNames(
        'bg-primary-blue p-3 w-full text-primary-white rounded-md',
        gradient && 'gradientBg',
      )}
    >
      {text}
    </button>
  );
};

export default Button;
