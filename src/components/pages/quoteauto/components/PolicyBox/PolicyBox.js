import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './policy-box.module.scss';

const PolicyBox = ({ name, price, score }) => {
  return (
    <div className={styles.policyBox}>
      <div className={styles.policyBoxHeader}>{name}</div>
      <div className={styles.policyBoxBody}>
        <div className={styles.policyBoxBodyTop}>
          <span className={styles.policyBoxPaymentPrice}>{price}$</span>
          <div className={styles.policyBoxPaymentType}>Per month</div>
        </div>
        <div className={styles.policyBoxBodyBottom}>
          <div className={styles.policyBoxScore}>
            <span className={styles.policyBoxScoreNumber}>{score}</span>
            <span className={styles.policyBoxScoreDescription}>Smart Score</span>
          </div>
          <div className={styles.policyBoxLearnMore}>Learn More</div>
        </div>
      </div>
    </div>
  );
};

PolicyBox.propTypes = {
  name: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default PolicyBox;
