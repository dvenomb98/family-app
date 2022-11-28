import React from 'react';

interface BackgroundProps {
  children: JSX.Element;
  customStyles?: string;
}

const Background: React.FC<BackgroundProps> = ({ children, customStyles }) => {
  return <div className={`bg-primary-white dark:bg-primary-black ${customStyles}`}>{children}</div>;
};

export default Background;
