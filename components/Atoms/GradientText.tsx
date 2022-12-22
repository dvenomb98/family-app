import React from 'react';

interface GradientTextProps {
  customStyles?: string;
  text: string | undefined;
}

const GradientText: React.FC<GradientTextProps> = ({ customStyles, text }) => {
  return <p className={`gradientText ${customStyles}`}>{text}</p>;
};

export default GradientText;
