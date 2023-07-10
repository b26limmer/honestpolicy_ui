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
      <path
        fill="#768AA1"
        fillRule="evenodd"
        d="M3 15h6a6 6 0 016 6v3a6 6 0 016 6v3a3 3 0 01-3 3h-3v3a3 3 0 11-6 0v-3H6a3 3 0 01-3-3v-9h9v-3a3 3 0 00-3-3H3v-3zm42 0h-6a6 6 0 00-6 6v3a6 6 0 00-6 6v3a3 3 0 003 3h3v3a3 3 0 106 0v-3h3a3 3 0 003-3v-9h-9v-3a3 3 0 013-3h6v-3z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#00AD84"
        fillRule="evenodd"
        d="M26.802 14.023l2.329-8.694-11.8 9.262 5.797 1.553-2.33 8.693 11.8-9.261-5.796-1.553z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Icon;
