import React from 'react';

function Icon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="#69798C"
        fillRule="evenodd"
        d="M14.565 2.665L13.4 7.01l2.898.777-5.9 4.63 1.165-4.346-2.898-.776 5.9-4.631zM4.5 7.5h-3V9h3A1.5 1.5 0 016 10.5V12H1.5v4.5A1.5 1.5 0 003 18h1.5v1.5a1.5 1.5 0 003 0V18H9a1.5 1.5 0 001.5-1.5V15a3 3 0 00-3-3v-1.5a3 3 0 00-3-3zm15 0h3V9h-3a1.5 1.5 0 00-1.5 1.5V12h4.5v4.5A1.5 1.5 0 0121 18h-1.5v1.5a1.5 1.5 0 01-3 0V18H15a1.5 1.5 0 01-1.5-1.5V15a3 3 0 013-3v-1.5a3 3 0 013-3z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Icon;
