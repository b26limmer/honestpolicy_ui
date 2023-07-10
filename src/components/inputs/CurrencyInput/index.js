import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';

const CurrencyInput = ({
  placeholder,
  value,
  styles,
  onChange,
  onClick,
  errors,
  autoFocus,
  type,
  autoComplete,
  max,
  percentageField,
  pattern,
}) => {
  const [showNormal, setShowNormal] = useState(false);
  const usdOptions = { style: 'currency', currency: 'USD' };
  const usdFormat = new Intl.NumberFormat('en-US', usdOptions);
  const displayValue = showNormal
    ? value
    : !percentageField
    ? usdFormat.format(value)
    : `${value}%`;
  var validNumber = new RegExp(/^\d*\.?\d*$/);
  function validateNumber(newValue) {
    if (!newValue) {
      return 0;
    }
    if (newValue > max) {
      return value;
    }
    if (validNumber.test(newValue)) {
      let dotIndex = newValue.indexOf('.');
      if (dotIndex !== -1 && dotIndex === newValue.length - 1) {
        return newValue;
      } else {
        newValue = parseFloat(newValue);
        return newValue;
      }
    } else {
      return value;
    }
  }
  const handleBlur = event => {
    let newValue = event.target.value;
    let dotIndex = newValue.indexOf('.');
    if (dotIndex !== -1 && dotIndex === newValue.length - 1) {
      newValue = newValue.replace('.', '');
      onChange(validateNumber(newValue));
    }
    setShowNormal(false);
  };
  return (
    <TextInput
      onFocus={() => setShowNormal(true)}
      onBlurFunc={event => handleBlur(event)}
      pattern={pattern}
      rootClassname={styles}
      value={displayValue}
      onChangeFunc={v => onChange(validateNumber(v))}
      errors={errors}
      autoFocus={autoFocus}
      type={type}
      autoComplete={autoComplete}
      onClick={onClick}
      placeholder={placeholder}
    />
  );
};

CurrencyInput.propTypes = {
  placeholder: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  errors: PropTypes.string,
  autoFocus: PropTypes.bool,
  autoComplete: PropTypes.string,
  onClick: PropTypes.func,
  styles: PropTypes.string,
  max: PropTypes.number,
  percentageField: PropTypes.bool,
  pattern: PropTypes.string,
};

export default CurrencyInput;
