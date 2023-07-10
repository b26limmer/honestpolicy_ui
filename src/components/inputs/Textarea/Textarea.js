import React from 'react';
import classNames from 'classnames';
import * as styles from './textarea.module.scss';
import PropTypes from 'prop-types';
import Error from '../../error/Error';

const Textarea = ({
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
  placeholder,
  hasError = false,
  ...props
}) => {
  return (
    <div
      className={classNames(styles.inputWrapper, rootClassName, {
        [styles.inputError]: !!hasError,
      })}
    >
      {label && (
        <label className={classNames(styles.label, labelClassName)} htmlFor={id}>
          {label}
        </label>
      )}
      <textarea
        className={classNames(styles.input, inputClassName)}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
      {hasError && <Error error={hasError} />}
      {children}
    </div>
  );
};
Textarea.propTypes = {
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
  placeholder: PropTypes.string,
  hasError: PropTypes.string,
};
export default Textarea;
