import React from 'react';
import * as styles from './error-text.module.scss';
import PropTypes from 'prop-types';

const ErrorText = ({ error }) => {
  return <span className={styles?.errorText}>{error}</span>;
};
ErrorText.propTypes = {
  error: PropTypes.string,
};
export default ErrorText;
