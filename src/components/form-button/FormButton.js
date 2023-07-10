import React from 'react';
import classNames from 'classnames';
import * as styles from './form-button.module.scss';
import PropTypes from 'prop-types';

const FormButton = ({
  children,
  isOutline,
  type,
  isDisabled = false,
  onClick = () => {},
  className,
  Component = 'button',
  to,
  href,
  htmlType,
  rest,
}) => {
  return (
    <Component
      className={classNames(
        styles.formButton,
        styles[`formButton${type}`],
        {
          [styles.formButtonOutline]: isOutline,
          [styles.formButtonDisabled]: isDisabled,
        },
        className
      )}
      type={htmlType || 'button'}
      onClick={e => {
        if (!isDisabled) {
          onClick(e);
        }
      }}
      to={to}
      href={href}
      {...rest}
    >
      {children}
    </Component>
  );
};
FormButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  isOutline: PropTypes.bool,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  Component: PropTypes.object,
  to: PropTypes.string,
  href: PropTypes.string,
  htmlType: PropTypes.string,
  rest: PropTypes.object,
};
export default FormButton;
