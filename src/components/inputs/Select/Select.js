import React from 'react';
import classNames from 'classnames';
import * as styles from './select.module.scss';
import PropTypes from 'prop-types';

const Select = ({
  id,
  name,
  label,
  errors,
  value = '',
  onChange = () => {},
  children,
  labelClassName = '',
  inputClassName = '',
  rootClassName = '',
  placeholder,
  size = 'big',
  options,
  hasError,
}) => {
  return (
    <div
      className={classNames(styles.inputWrapper, styles[`input${size}`], rootClassName, {
        [styles.inputError]: hasError,
      })}
    >
      {label && (
        <label className={classNames(styles.label, labelClassName)} htmlFor={id}>
          {label}
        </label>
      )}
      <select
        className={classNames(styles.input, inputClassName, {
          [styles?.errorInput]: !!errors,
        })}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      >
        <option value="">{placeholder || 'Choose one...'}</option>
        {options?.map(item => (
          <option key={item.value} value={item.value} data-text={item.text}>
            {item.icon} {item.text || item.value}
          </option>
        ))}
      </select>
      <span
        className={classNames({
          [styles.errors]: !!errors,
        })}
      >
        {errors}
      </span>
      {children}
    </div>
  );
};
Select.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  errors: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  children: PropTypes.node,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  rootClassName: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  options: PropTypes.array,
  hasError: PropTypes.bool,
};
export default Select;
