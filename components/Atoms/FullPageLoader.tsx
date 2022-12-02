import React from 'react';
import Loader from './Loader';

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 bg-primary-black bg-opacity-50 transition-opacity z-[999] items-center flex justify-center">
      <Loader sizeClasses="w-10 h-10" />
    </div>
  );
};

export default FullPageLoader;
