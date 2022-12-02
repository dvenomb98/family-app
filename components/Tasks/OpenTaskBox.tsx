import React from 'react';

interface OpenTaskBoxProps {
  label: string;
  value: string | undefined;
}

const OpenTaskBox: React.FC<OpenTaskBoxProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col gap-1">
      <span className=" text-primary-gray italic">{label}</span>
      <p>{value}</p>
    </div>
  );
};

export default OpenTaskBox;
