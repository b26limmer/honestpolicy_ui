import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import classNames from 'classnames';
import * as styles from './form-input.module.scss';
import Error from '../../../../error/Error';

const FormInput = forwardRef(
  (
    {
      id,
      name,
      label,
      autoComplete,
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
      onKeyDown = () => {},
      onKeyUp = () => {},
      onBlur = () => {},
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef();

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current.focus();
      },
    }));

    return (
      <div
        className={classNames(
          styles.formInputWrapper,
          styles[`input${size}`],
          rootClassName,
          hasError ? styles.formInputError : '',
          hasError ? 'input-has-err' : '',
          !label ? styles.formInputAlignBottom : '',
          !isActive ? styles.formInputDisable : ''
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
            autoComplete={autoComplete}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onBlur={onBlur}
            ref={inputRef}
            {...rest}
          />
        ) : (
          inputs
        )}
        {hasError && <Error error={hasError} />}
      </div>
    );
  }
);
FormInput.displayName = 'FormInput';
export default FormInput;
