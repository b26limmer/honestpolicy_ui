import React from 'react';

function Icon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="52"
      height="59"
      fill="none"
      viewBox="0 0 52 59"
      {...props}
    >
      <path
        fill="#CCD6DD"
        d="M50.273 5.355C38.945.5 26 .5 26 .5S13.055.5 1.727 5.355c-4.854 24.272 0 45.308 24.273 53.4 24.273-8.092 29.127-29.128 24.273-53.4z"
      ></path>
      <path
        fill="#55ACEE"
        d="M26 55.33C7.25 48.607.046 32.59 4.575 7.691 14.775 3.783 25.884 3.736 26 3.736c.115 0 11.26.065 21.425 3.955 4.53 24.9-2.673 40.916-21.425 47.64z"
      ></path>
      <path
        fill="#269"
        d="M47.425 7.691C37.259 3.801 26.115 3.736 26 3.736V55.33c18.752-6.723 25.954-22.74 21.425-47.639z"
      ></path>
    </svg>
  );
}

export default Icon;
