import React from 'react';
import PropTypes, { bool } from 'prop-types';
import CustomSlider from '../CustomSlider';
import * as styles from './sliderInput.module.scss';
import CurrencyInput from '../CurrencyInput';

const SliderInput = ({
  value,
  onChange,
  max,
  percentageField,
  errors,
  pattern,
  labelLeft,
  labelRight,
}) => {
  return (
    <div className={styles.sliderInputContainer}>
      <div className={styles.leftContainer}>
        <label className={styles.label}>{labelLeft}</label>
        <div className={styles.sliderContainer}>
          <CustomSlider
            value={value}
            onChange={(_, v) => onChange(v * (max / 100))}
            max={max}
            percentageField={percentageField}
          />
        </div>
      </div>
      <div className={styles.textInputContainer}>
        <label className={styles.label}>{labelRight || ' '}</label>
        <CurrencyInput
          pattern={pattern}
          onChange={onChange}
          errors={errors}
          value={value}
          styles={styles.textInput}
          percentageField={percentageField}
        />
      </div>
    </div>
  );
};
SliderInput.defaultProps = {
  percentageField: false,
};
SliderInput.propTypes = {
  pattern: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.string.isRequired]),
  onChange: PropTypes.func.isRequired,
  max: PropTypes.number.isRequired,
  percentageField: bool,
  errors: PropTypes.string,
  labelLeft: PropTypes.string.isRequired,
  labelRight: PropTypes.string,
};

export default SliderInput;
