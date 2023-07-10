import React from 'react';
import Container from '../../../components/container';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import * as styles from '../../scss/signUp/signUp.module.scss';
import RegisterForm from '../../forms/register-form';

const SignUpTemplate = () => {
  return (
    <DashboardLayout noPadding>
      <div className={styles.signUp}>
        <div className={styles.signUpInner}>
          <Container className={styles.signUpBoxWrapper}>
            <h1 className={styles.signUpTitle}>
              You’re moments away <br /> from Honest Policies <br /> at Honest Prices
            </h1>
            <div className={styles.signUpBox}>
              <RegisterForm />
            </div>
          </Container>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SignUpTemplate;
