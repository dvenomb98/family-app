import React from 'react';

interface ContainerProps {
  children: JSX.Element;
  customStyles?: string;
}

const Container = ({ children, customStyles }: ContainerProps) => {
  return (
    <div className={`container mx-auto px-5 lg:px-32 ${customStyles ? customStyles : 'py-16'}`}>
      {children}
    </div>
  );
};

export default Container;
