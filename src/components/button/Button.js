import React from 'react';
import * as styles from './button.module.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Button = ({ children, className, onClick, ...rest }) => {
  return (
    <button onClick={onClick} className={classNames(styles.button, className)} {...rest}>
      {children}
    </button>
  );
};
Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
export default Button;
