import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as styles from './secondary-layout.module.scss';

const SecondaryLayout = ({ className, title, children, onItemSelect }) => {
  return (
    <div className={classNames(styles.formLayout, className)}>
      {title && (
        <>
          <span className={styles.formLayoutTitleSmall} onClick={onItemSelect}>
            {title}
          </span>
          <span className={styles.bottomLine}></span>
        </>
      )}
      <div className={styles.formLayoutMain}>{children}</div>
    </div>
  );
};

SecondaryLayout.propTypes = {
  className: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  type: PropTypes.string,
  children: PropTypes.any,
  fontSmall: PropTypes.bool,
  onItemSelect: PropTypes.func,
};

export default SecondaryLayout;
