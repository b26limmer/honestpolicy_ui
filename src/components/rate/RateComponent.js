import React from 'react';
import PropTypes from 'prop-types';
import ErrorText from '../inputs/ErrorText/ErrorText';
import * as styles from '../scss/carrier/customerReviewsDialog.module.scss';

export default function RateComponent({ start, end, step, rate, handleClick, error }) {
  const arr = [];

  for (let i = start; i <= end; i += step) {
    arr.push(i);
  }

  return (
    <div className={styles.rateContainer}>
      <div className={styles.rateContainerInner}>
        {arr.map(elem => (
          <div
            className={rate === elem ? styles.selectedRate : ''}
            key={elem}
            onClick={() => handleClick(elem)}
          >
            <span>{elem}</span>
          </div>
        ))}
      </div>
      {error && <ErrorText error="Please rate this service" />}
    </div>
  );
}

RateComponent.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  rate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handleClick: PropTypes.func,
  error: PropTypes.bool,
};
