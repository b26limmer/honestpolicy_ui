import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as styles from './bread-crumbs.module.scss';

const BreadCrumbs = ({ className, firstCrumb, secondCrumb }) => {
  return (
    <div className={classNames(styles.root, 'quote-form-bread-crumb', className)}>
      <span>
        {firstCrumb}
        <span className={styles.separator}>/</span>
      </span>
      {secondCrumb && <span>{secondCrumb}</span>}
    </div>
  );
};

BreadCrumbs.propTypes = {
  className: PropTypes.string,
  firstCrumb: PropTypes.string,
  secondCrumb: PropTypes.string,
};

export default BreadCrumbs;
