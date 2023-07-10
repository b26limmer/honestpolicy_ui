import React from 'react';

function Icon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="14"
      fill="none"
      viewBox="0 0 18 14"
      {...props}
    >
      <path
        stroke="#00AD84"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 1h16M1 7h16M1 13h16"
      ></path>
    </svg>
  );
}

export default Icon;
