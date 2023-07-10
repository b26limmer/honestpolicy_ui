import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './coverage-box.module.scss';

const CoverageBox = ({ title, Icon, description, price }) => {
  return (
    <div className={styles.coverageBox}>
      <div className={styles.coverageBoxBody}>
        <div className={styles.coverageBoxTitle}>{title}</div>
        <div className={styles.coverageBoxIcon}>
          <Icon />
        </div>
        <div className={styles.coverageBoxDescription}>{description}</div>
      </div>
      <div className={styles.coverageBoxBottom}>
        <div className={styles.coverageBoxAction}>-</div>
        <div className={styles.coverageBoxPrice}>${price}</div>
        <div className={styles.coverageBoxAction}>+</div>
      </div>
    </div>
  );
};

CoverageBox.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  Icon: PropTypes.any,
};

export default CoverageBox;
