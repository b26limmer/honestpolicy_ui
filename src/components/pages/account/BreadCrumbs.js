import React from 'react';
import * as styles from '../../scss/account/breadcrumbs.module.scss';

const BreadCrumbs = ({ firstCrumb, secondCrumb }) => {
  return (
    <div className={styles.root}>
      <span>
        {firstCrumb}
        {secondCrumb && ' > '}
      </span>
      {secondCrumb && <span>{secondCrumb}</span>}
    </div>
  );
};

export default BreadCrumbs;
