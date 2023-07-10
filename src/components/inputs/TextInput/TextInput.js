import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as styles from './text-input.module.scss';

const TextInput = ({
  placeholder,
  hasButton,
  value,
  onChangeFunc,
  onClick,
  onFocus,
  onBlurFunc,
  onKeyUpFunc,
  onKeyDownFunc,
  pattern,
  errors,
  autoFocus,
  type,
  autoComplete,
  rootClassname,
}) => {
  return (
    <div className={classNames(styles.formTextInput, rootClassname)}>
      <input
        onClick={onClick}
        autoComplete={autoComplete}
        type={type}
        value={value}
        placeholder={placeholder}
        className={classNames(styles.textInput, {
          [styles?.hasButton]: hasButton,
          [styles?.errorInput]: !!errors,
        })}
        onChange={e => onChangeFunc(e.target.value)}
        onBlur={onBlurFunc}
        onFocus={onFocus}
        onKeyDown={onKeyDownFunc}
        onKeyUp={onKeyUpFunc}
        pattern={pattern}
        autoFocus={autoFocus}
      />
      <span
        className={classNames({
          [styles.errors]: !!errors,
        })}
      >
        {errors}
      </span>
    </div>
  );
};

TextInput.propTypes = {
  placeholder: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  hasButton: PropTypes.bool,
  onChangeFunc: PropTypes.func.isRequired,
  type: PropTypes.string,
  onFocus: PropTypes.func,
  onBlurFunc: PropTypes.func,
  onKeyUpFunc: PropTypes.func,
  onKeyDownFunc: PropTypes.func,
  errors: PropTypes.string,
  pattern: PropTypes.string,
  autoFocus: PropTypes.bool,
  autoComplete: PropTypes.string,
  rootClassname: PropTypes.string,
  onClick: PropTypes.func,
};
TextInput.defaultProps = {
  hasButton: false,
  autoFocus: false,
  value: '',
  type: 'text',
  onBlurFunc: () => {},
  onClick: () => {},
  onChangeFunc: () => {},
  onKeyDownFunc: () => {},
};

export default TextInput;
