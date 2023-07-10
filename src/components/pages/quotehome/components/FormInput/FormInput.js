import React from 'react';
import classNames from 'classnames';
import * as styles from './form-input.module.scss';
import Error from '../../../../error/Error';

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
  isActive = true,
  hasError = false,
  autoComplete,
  onKeyDown = () => {},
  onKeyUp = () => {},
  onBlur = () => {},
  ...rest
}) => {
  return (
    <div
      className={classNames(
        styles.formInputWrapper,
        styles[`input${size}`],
        rootClassName,
        {
          [styles.formInputError]: hasError,
          'input-has-err': hasError,
          [styles.formInputAlignBottom]: !label,
          [styles.formInputDisable]: !isActive,
        }
      )}
    >
      {label && (
        <label className={classNames(styles.formLabel, labelClassName)} htmlFor={id}>
          {label}
        </label>
      )}
      {!inputs ? (
        <input
          className={classNames(styles.formInput, inputClassName)}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onBlur={onBlur}
          {...rest}
        />
      ) : (
        inputs
      )}
      {hasError && <Error error={hasError} />}
    </div>
  );
};
export default FormInput;
