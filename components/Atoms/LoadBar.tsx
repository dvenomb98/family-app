import React, { FC } from 'react';
interface LoadBarProps {
  progress: number;
}

const LoadBar: FC<LoadBarProps> = ({ progress }) => {
  return (
    <div className="h-4 rounded-full w-full bg-gray-300">
      <div
        style={{ width: `${progress}%` }}
        className={`h-full rounded-full ${progress < 30 ? 'bg-primary-red' : 'bg-green-500'}`}
      ></div>
    </div>
  );
};

export default LoadBar;
