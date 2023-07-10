import React from 'react';
import classNames from 'classnames';
import * as styles from './form-select.module.scss';
import Error from '../error/Error';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';

const FormSelect = ({
  id,
  name,
  label,
  optionsLoading,
  value = '',
  onChange = () => {},
  labelClassName = '',
  inputClassName = '',
  rootClassName = '',
  onBlur = () => {},
  placeholder,
  size = 'big',
  options,
  hasError,
  hasDefaultOption = true,
}) => {
  return (
    <div
      className={classNames(
        styles.formInputWrapper,
        styles[`input${size}`],
        rootClassName,
        {
          [styles.formInputError]: hasError,
        }
      )}
      key={id + value + 'select'}
    >
      {label && (
        <label className={classNames(styles.formLabel, labelClassName)} htmlFor={id}>
          {label}
        </label>
      )}
      {optionsLoading ? (
        <CircularProgress size={30} className={styles.loadingIndicator} />
      ) : (
        <select
          className={classNames(styles.formInput, inputClassName)}
          name={name}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          key={id + value + name}
        >
          {hasDefaultOption && (
            <option key="empty-option" disabled value={''}>
              {label || placeholder || ''}
            </option>
          )}
          {options.map((item, index) => (
            <option key={name + index + item.value} value={item.value}>
              {item.text}
            </option>
          ))}
        </select>
      )}
      {hasError && <Error error={hasError} />}
    </div>
  );
};
FormSelect.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  optionsLoading: PropTypes.bool,
  onChange: PropTypes.func,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  rootClassName: PropTypes.string,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  options: PropTypes.array,
  hasError: PropTypes.string,
  hasDefaultOption: PropTypes.bool,
};
export default FormSelect;
