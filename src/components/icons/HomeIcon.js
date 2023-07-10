import React from 'react';

function Icon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="38"
      height="34"
      fill="none"
      viewBox="0 0 38 34"
      {...props}
    >
      <path
        fill="#99AAB5"
        fillRule="evenodd"
        d="M19 5L5 19.872V34h8.5V19.5h11V34H33V19.872L19 5zm-2.5 16H15v13h8V21h-6.5zm1.25 5v3h-1.5v-3h1.5z"
        clipRule="evenodd"
      ></path>
      <path stroke="#99AAB5" strokeWidth="1.5" d="M6.516 20H2L19 2l17 18h-4.516"></path>
    </svg>
  );
}

export default Icon;
