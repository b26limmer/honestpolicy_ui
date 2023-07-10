import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as styles from './form-layout.module.scss';

const FormLayout = ({ className, title, children, type }) => {
  return (
    <div
      className={classNames(styles.formLayout, className, styles?.[`formLayout${type}`])}
    >
      {title && <span className={styles.formLayoutTitle}>{title}</span>}
      <div className={styles.formLayoutMain}>{children}</div>
    </div>
  );
};

FormLayout.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.any,
};

export default FormLayout;
