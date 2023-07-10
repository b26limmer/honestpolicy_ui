import React from 'react';

function Icon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="52"
      height="40"
      fill="none"
      viewBox="0 0 52 40"
      {...props}
    >
      <path
        fill="#00AD84"
        fillRule="evenodd"
        d="M38.095 0H15.238L0 40h4.284L16.982 0H36.03l11.111 40h4.288L38.095 0z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#768AA1"
        fillRule="evenodd"
        d="M23.914 0l-.343 5.714h4.286L27.514 0h7.485l10 40H30l-.857-7.143h-6.857L21.429 40H6.428L17.856 0h6.058zM28 10H23.43l-.571 7.143h5.714L28 10zm-5.144 11.429h5.715l.714 7.143h-7.143l.714-7.143z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Icon;
