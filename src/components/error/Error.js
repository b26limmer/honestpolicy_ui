import React from 'react';
import * as styles from './error.module.scss';
import PropTypes from 'prop-types';

const Error = ({ error }) => {
  return <span className={styles.errorElement}>{error}</span>;
};

Error.propTypes = {
  error: PropTypes.string,
};
export default Error;
