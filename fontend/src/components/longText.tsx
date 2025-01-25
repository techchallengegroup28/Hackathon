import React from 'react';

interface LongTextProps {
  text: string;
}

const LongText: React.FC<LongTextProps> = ({ text }) => {
  return (
    <div>
      <p>{text}</p>
    </div>
  );
};

export default LongText;
