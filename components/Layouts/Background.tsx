import classNames from 'classnames';
import React from 'react';

interface BackgroundProps {
  children: JSX.Element;
  customStyles?: string;
  secondaryStyles?: boolean;
}

const Background: React.FC<BackgroundProps> = ({
  children,
  customStyles,
  secondaryStyles = false,
}) => {
  return (
    <div
      className={classNames(
        secondaryStyles
          ? 'bg-secondary-white dark:bg-secondary-black'
          : 'bg-primary-white dark:bg-primary-black',
        customStyles,
      )}
    >
      {children}
    </div>
  );
};

export default Background;
