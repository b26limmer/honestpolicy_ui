import React from 'react';
import classNames from 'classnames';
import * as styles from './options-toggle.module.scss';

const OptionsToggle = ({ options, optionValue, setOptionValue }) => {
  return (
    <div className={styles.carrierCoverageToggleWrapper}>
      <div className={styles.carrierCoverageToggle}>
        {options.map((option, idx) => (
          <div
            key={idx}
            className={classNames(styles.carrierCoverageButton, {
              [styles.carrierCoverageButtonActive]: idx === optionValue,
            })}
            onClick={() => setOptionValue(idx)}
          >
            {option.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionsToggle;
