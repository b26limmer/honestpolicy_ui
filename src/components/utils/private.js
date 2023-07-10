import React from 'react';
import PropTypes from 'prop-types';

const Private = ({ children }) => {
  if (typeof window === 'undefined') {
    return <></>;
  } else return <>{children}</>;
};

Private.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Private;
