import React from 'react';

function Icon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="none"
      viewBox="0 0 48 48"
      {...props}
    >
      <circle cx="24" cy="24" r="23" stroke="#768AA1" strokeWidth="2"></circle>
      <path fill="#00AD84" d="M21 12H27V36H21z"></path>
      <path fill="#00AD84" d="M36 21H42V45H36z" transform="rotate(90 36 21)"></path>
    </svg>
  );
}

export default Icon;
