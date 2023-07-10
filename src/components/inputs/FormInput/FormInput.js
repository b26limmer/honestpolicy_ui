import React from 'react';
import classNames from 'classnames';
import * as styles from './form-input.module.scss';
import Error from '../../error/Error';
import PropTypes from 'prop-types';

const FormInput = ({
  id,
  name,
  label,
  type = 'text',
  value = '',
  onChange = () => {},
  onKeyDown = () => {},
  onKeyUp = () => {},
  onSubmit = () => {},
  onBlur = () => {},
  labelClassName = '',
  inputClassName = '',
  rootClassName = '',
  inputs,
  placeholder,
  size = 'big',
  hasError = false,
  isDisabled = false,
  max,
  autoComplete,
}) => {
  return (
    <div
      className={classNames(
        styles.formInputWrapper,
        styles?.[`input${size}`],
        rootClassName,
        {
          [styles.formInputError]: !!hasError,
          'input-has-err': !!hasError,
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
        <input
          className={classNames(styles.formInput, inputClassName, {
            [styles.formInputDisable]: isDisabled,
          })}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onSubmit={onSubmit}
          onBlur={onBlur}
          max={max}
        />
      ) : (
        inputs
      )}
      {hasError && <Error error={hasError} />}
    </div>
  );
};
FormInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onSubmit: PropTypes.func,
  onBlur: PropTypes.func,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  rootClassName: PropTypes.string,
  inputs: PropTypes.node,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  hasError: PropTypes.string,
  isDisabled: PropTypes.bool,
  max: PropTypes.number,
  autoComplete: PropTypes.string,
};
export default FormInput;
