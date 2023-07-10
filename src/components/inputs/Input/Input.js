import React from 'react';
import classNames from 'classnames';
import * as styles from './input.module.scss';
import PropTypes from 'prop-types';

const Input = ({
  id,
  name,
  label,
  type = 'text',
  value = '',
  onChange = () => {},
  children,
  labelClassName = '',
  inputClassName = '',
  rootClassName = '',
  inputs,
  placeholder,
  size = 'big',
  hasError = false,
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
      {!inputs ? (
        <input
          className={classNames(styles.input, inputClassName)}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        inputs
      )}
      {children}
    </div>
  );
};
Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  rootClassName: PropTypes.string,
  inputs: PropTypes.array,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  hasError: PropTypes.bool,
};
export default Input;
