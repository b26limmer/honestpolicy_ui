import React from 'react';

function Icon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="22"
      fill="none"
      viewBox="0 0 32 22"
      {...props}
    >
      <path
        fill="#99AAB5"
        fillRule="evenodd"
        d="M6.63 1.71A2.5 2.5 0 019.002 0h13.996a2.5 2.5 0 012.372 1.71L27 6.6h-.6a5 5 0 015 5v3.5a2.5 2.5 0 01-2.2 2.482V19.8a2.2 2.2 0 01-4.4 0v-2.2H7.2v2.2a2.2 2.2 0 01-4.4 0v-2.218A2.5 2.5 0 01.6 15.1v-3.5a5 5 0 015-5H5l1.63-4.89zm1.701 2.062A2.5 2.5 0 0110.653 2.2h10.694a2.5 2.5 0 012.322 1.572L24.8 6.6H7.2l1.131-2.828zM11.601 11a2.2 2.2 0 00-2.2-2.2H7.2a2.2 2.2 0 100 4.4h2.2a2.2 2.2 0 002.2-2.2zM27 11a2.2 2.2 0 00-2.2-2.2h-2.2a2.2 2.2 0 000 4.4h2.2A2.2 2.2 0 0027 11z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Icon;
