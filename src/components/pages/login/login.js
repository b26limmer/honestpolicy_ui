import React from 'react';
import Container from '../../../components/container';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import LoginForm from '../../forms/login-form/LoginForm';

import * as styles from '../../scss/login/login.module.scss';

const LoginTemplate = props => {
  return (
    <DashboardLayout
      noPadding
      classes={{
        layoutRoot: styles.dashboardLayoutRoot,
        layoutInner: styles.dashboardLayoutInner,
      }}
    >
      <div className={styles.login}>
        <div className={styles.loginInner}>
          <Container className={styles.loginBoxWrapper}>
            <h1 className={styles.loginTitle}>
              You’re moments away <br /> from Honest Policies <br /> at Honest Prices
            </h1>
            <div className={styles.loginBox}>
              <LoginForm props={props} />
            </div>
          </Container>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LoginTemplate;
