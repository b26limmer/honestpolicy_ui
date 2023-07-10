import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './dark-bg-popup.module.scss';

const DarkBgPopup = ({ children }) => {
  return (
    <div className={styles.popupBg}>
      <div className={styles.popup}>{children}</div>
    </div>
  );
};

DarkBgPopup.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DarkBgPopup;
