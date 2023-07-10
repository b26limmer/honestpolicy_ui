import React, { useContext, useState } from 'react';
import { Link, navigate } from 'gatsby';
import { Formik } from 'formik';
import Cookies from 'js-cookie';
import { useMutation } from '@apollo/client';
import FormControlLabel from '@mui/material/FormControlLabel';

import Input from '../../../components/inputs/FormInput';
import Button from '../../../components/form-button';
import Checkbox from '../../../components/inputs/Checkbox/Checkbox';
import { useRedux } from '../../redux/reduxContext';

import logo from '../../../images/main-logo.png';
import * as styles from './register-form.module.scss';
import PropTypes from 'prop-types';
import { CREATE_USER } from '../../utils/queries';
import LogRocket from 'logrocket';
import { ScriptsContext } from '../../state/ScriptsDataProvider';
import doIfNoDevelopment from '../../utils/doIfNotDevelopment';

const RegisterForm = ({ setToggleSignUp }) => {
  const [submitErrors, setSubmitErrors] = useState({});
  const { heap } = useContext(ScriptsContext);
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: data => {
      onSignUpComplete(data);
    },
    onError: ({ message }) => {
      setSubmitErrors({ terms: message });
    },
  });

  const alertDispatch = useRedux()[1];
  const handleClose = () => {
    alertDispatch({
      type: 'LOGIN_POPUP_ACTION',
      payload: {
        open: false,
      },
    });
  };

  const onSignUpComplete = data => {
    const { authenticationToken, ...user } = data?.createUser?.user || {};
    if (data?.createUser) {
      if (authenticationToken && data?.createUser?.success) {
        Cookies.set('token', authenticationToken, { secure: true });
        Cookies.set('user', user, { secure: true });
        handleClose();
        doIfNoDevelopment(() =>
          LogRocket.identify(user.id, {
            email: user.email,
          })
        );
        heap.identify(user.id);
        heap.addUserProperties({ email: user.email });
        navigate('/account/dashboard?isSignup=true');
      } else {
        alertDispatch({
          type: 'ALERT_OPEN',
          payload: {
            type: 'error',
            message: data?.createUser?.errors?.[0] || 'Email is already used',
          },
        });
      }
    }
  };
  return (
    <div className={styles.registerForm}>
      <div className={styles.registerFormInner}>
        <div className={styles.registerFormLogo}>
          <img loading="lazy" src={logo} alt="logo" />
        </div>
        <div className={styles.registerFormTitle}>Create Account</div>
        <Formik
          initialValues={{
            email: '',
            password: '',
            passwordConfirmation: '',
            terms: false,
          }}
          validate={values => {
            setSubmitErrors({});
            const errors = {};

            const requiredValues = ['email', 'password', 'passwordConfirmation', 'terms'];

            requiredValues.forEach(item => {
              if (!values[item]) {
                errors[item] = 'Required field';
              }
            });

            if (values?.password !== values?.passwordConfirmation) {
              errors.password = 'Error';
              errors.passwordConfirmation = 'Error';
            }
            if (values?.password?.length < 8) {
              errors.password = 'Password is too short (minimum is 8 characters)';
              errors.passwordConfirmation =
                'Password is too short (minimum is 8 characters)';
            }

            if (!values?.terms) {
              errors.terms = 'You must accept terms and conditions';
            }
            return errors;
          }}
          validateOnChange={false}
          onSubmit={async values => {
            const newValues = {
              ...values,
            };

            delete newValues.terms;

            await createUser({ variables: { input: { ...newValues } } });
          }}
        >
          {({ values, errors, handleChange, handleSubmit }) => (
            <form className={styles.signUpInputs} onSubmit={handleSubmit}>
              <Input
                hasError={errors.email || submitErrors.email}
                onChange={handleChange}
                label="Email"
                name="email"
                placeholder="Your email"
                type="email"
                value={values.email}
              />
              <Input
                hasError={errors.password || submitErrors.password}
                onChange={handleChange}
                name="password"
                label="Current password"
                placeholder="Your password"
                type="password"
                value={values.password}
              />
              <Input
                hasError={
                  errors.passwordConfirmation || submitErrors.passwordConfirmation
                }
                onChange={handleChange}
                name="passwordConfirmation"
                placeholder="Repeat your password"
                label="Repeat password"
                type="password"
                value={values.passwordConfirmation}
              />

              <div className={styles.registerTermsCheckbox}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={values.terms || false}
                      onChange={handleChange}
                      name="terms"
                      color="primary"
                    />
                  }
                  label={
                    <>
                      I agree all statements in <Link to="/terms">Terms of service</Link>
                    </>
                  }
                />
              </div>
              <Button htmlType="submit" type="submit">
                Create Account
              </Button>
              <div className={styles.registerFormNoAccount}>
                <span className={styles.registerFormNoAccountTitle}>
                  Already have an account?
                </span>
                <Button
                  className={styles.registerFormNoAccountButton}
                  onClick={() => setToggleSignUp(false)}
                  isOutline
                >
                  Sign in
                </Button>
              </div>
              <div className={styles.signUpError}>
                {errors?.terms || submitErrors.terms}
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
RegisterForm.propTypes = {
  setToggleSignUp: PropTypes.func,
};
export default RegisterForm;
