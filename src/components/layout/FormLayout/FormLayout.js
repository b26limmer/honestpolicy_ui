import React from 'react';
import DashboardLayout from '../DashboardLayout';
import * as styles from './form-layout.module.scss';

const FormLayout = ({ children }) => {
  return (
    <DashboardLayout noPadding>
      <div className={styles.formLayout}>
        <div className={styles.formLayoutInner}>{children}</div>
      </div>
    </DashboardLayout>
  );
};

export default FormLayout;
