import React from 'react';
import classNames from 'classnames';
import * as styles from './switch.module.scss';
import PropTypes from 'prop-types';

const Switch = ({ checked = false, name, label, onChange }) => {
  return (
    <div className={styles.switchWrapper}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.switchElementWrapper}>
        <label className={styles.switchLabel}>
          <input
            type="checkbox"
            value={checked}
            checked={checked}
            name={name}
            onChange={() => onChange(!checked)}
          ></input>
          <span className={classNames(styles.slider, styles.round)}></span>
        </label>
      </div>
    </div>
  );
};
Switch.propTypes = {
  checked: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
};
export default Switch;
