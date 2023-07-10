import React from 'react';
import PropTypes from 'prop-types';
import RoadIcon from '../../../../icons/RoadIcon';
import Switch from '../../../../inputs/Switch/Switch';
import * as styles from './coverage-row.module.scss';

const CoverageRow = ({ title, description, Icon, price }) => {
  return (
    <div className={styles.coverageRow}>
      <div className={styles.coverageRowIcon}>
        <Icon />
      </div>
      <div className={styles.coverageRightSide}>
        <div className={styles.coverageRowDetails}>
          <div className={styles.coverageRowTitle}>{title}</div>
          <div className={styles.coverageRowDescription}>{description}</div>
        </div>
        <div className={styles.coverageRowPriceDetails}>
          <div className={styles.coverageRowPrice}>+ ${price}/MONTH</div>
          <div className={styles.coverageRowSwitch}>
            <Switch onChange={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};

CoverageRow.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  Icon: PropTypes.any,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CoverageRow;
