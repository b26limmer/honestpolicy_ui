import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './form-box.module.scss';

const FormBox = ({ title, children }) => {
  return (
    <div className={styles.formBox}>
      {title && <div className={styles.formBoxTitle}>{title}</div>}
      {children}
    </div>
  );
};
FormBox.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};
export default FormBox;
