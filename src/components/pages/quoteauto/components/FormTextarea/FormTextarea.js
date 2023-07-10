import React from 'react';
import classNames from 'classnames';
import * as styles from '../FormInput/form-input.module.scss';

const FormInput = ({
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
      className={classNames(
        styles.formInputWrapper,
        styles[`input${size}`],
        rootClassName,
        {
          [styles.formInputError]: hasError,
          [styles.formInputAlignBottom]: !label,
        }
      )}
    >
      {label && (
        <label className={classNames(styles.formLabel, labelClassName)} htmlFor={id}>
          {label}
        </label>
      )}
      {!inputs ? (
        <textarea
          className={classNames(styles.formInput, inputClassName)}
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
export default FormInput;
