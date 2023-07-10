import React from 'react';
import classNames from 'classnames';
import * as styles from './general-form-button.module.scss';
import PropTypes from 'prop-types';

const FormButton = ({ children, isOutline, isDisabled, ...rest }) => {
  return (
    <button
      className={classNames(styles.formButton, {
        [styles.formButtonOutlineHome]: isOutline,
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
FormButton.propTypes = {
  children: PropTypes.node,
  isOutline: PropTypes.bool,
  isDisabled: PropTypes.bool,
};
export default FormButton;
