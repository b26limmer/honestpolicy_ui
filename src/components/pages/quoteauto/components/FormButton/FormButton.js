import React from 'react';
import classNames from 'classnames';
import * as styles from './form-button.module.scss';

const FormButton = ({ children, isOutline, isDisabled, ...rest }) => {
  return (
    <button
      className={classNames(styles.formButton, {
        [styles.formButtonOutlineAuto]: isOutline,
        [styles.formButtonDisabled]: isDisabled,
      })}
      {...rest}
      onClick={e => {
        if (!isDisabled) {
          rest?.onClick(e);
        }
      }}
    >
      {children}
    </button>
  );
};

export default FormButton;
