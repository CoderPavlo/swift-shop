import React from 'react';
interface IFlagProps{
  width?: number,
  height?: number
}
const UkraineFlag = ({width = 25, height= 20} : IFlagProps): React.JSX.Element => {
  return (
    <svg
    style={{width: width, height: height}}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
    >
      <path fill="#005BBB" d="M32 5H4C1.791 5 0 6.791 0 9v9h36V9c0-2.209-1.791-4-4-4z" />
      <path fill="#FFD500" d="M36 27c0 2.209-1.791 4-4 4H4c-2.209 0-4-1.791-4-4v-9h36v9z" />
    </svg>
  );
};

export default UkraineFlag;