import React from 'react';

interface GradientTextProps {
  customStyles?: string;
  text: string | null | undefined;
}

const GradientText: React.FC<GradientTextProps> = ({ customStyles, text }) => {
  return text ? <p className={`gradientText ${customStyles}`}>{text}</p> : null;
};

export default GradientText;
