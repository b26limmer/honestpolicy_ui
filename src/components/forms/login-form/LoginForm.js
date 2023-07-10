import React, { useContext, useEffect, useState } from 'react';
import { Link, navigate } from 'gatsby';
import { Formik } from 'formik';
import Cookies from 'js-cookie';
import queryString from 'query-string';
import { gql, useMutation } from '@apollo/client';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useRedux } from '../../redux/reduxContext';
import Input from '../../../components/inputs/FormInput';
import Button from '../../../components/form-button';
import Checkbox from '../../../components/inputs/Checkbox/Checkbox';
import * as styles from './login-form.module.scss';
import PropTypes from 'prop-types';
import { AlertsContext } from '../../state/AlertsContext';
import { CircularProgress } from '@mui/material';
import { StaticImage } from 'gatsby-plugin-image';
import { ScriptsContext } from '../../state/ScriptsDataProvider';

const LOGIN_USER = gql`
  mutation loginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      user {
        authenticationToken
        id
        email
        firstName
        lastName
      }
      success
      errors
    }
  }
`;

const LoginForm = ({ setToggleSignUp, noRedirect }) => {
  const [loading, setLoading] = useState(false);
  const { dispatchAlert } = useContext(AlertsContext);
  const { identifyUser } = useContext(ScriptsContext);
  const [loginUser, { errors }] = useMutation(LOGIN_USER, {
    onCompleted: data => {
      onCompleteLogin(data);
    },
    onError: error => {
      console.error(error);
      setLoading(false);
      dispatchAlert('Invalid email or password.');
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

  useEffect(() => {
    const { confirmation_token } = queryString.parse(window.location?.search);
    if (confirmation_token) {
      dispatchAlert('Email was confirmed. You can login now', 'success');
    }

    const searchQuery = queryString.parse(window.location.search);
    if (searchQuery['reset-password-sent']) {
      dispatchAlert('Reset password email sent!', 'info');
    }
  }, []);

  const onCompleteLogin = data => {
    const { authenticationToken, ...user } = data?.loginUser?.user || {};
    if (data?.loginUser && authenticationToken && data?.loginUser?.success && !errors) {
      Cookies.set('token', authenticationToken, { secure: true });
      Cookies.set('user', JSON.stringify(user), { secure: true });
      identifyUser({
        email: user?.email,
        id: user.id,
        firstName: user?.firstName,
      });
      if (!noRedirect) {
        navigate('/account/dashboard');
      }
      setLoading(false);
      handleClose();
    } else {
      dispatchAlert('Invalid email or password.');
    }
  };

  return (
    <div className={styles.loginForm}>
      <div className={styles.loginFormInner}>
        <div className={styles.loginFormLogo}>
          <StaticImage
            width={230}
            quality={80}
            placeholder="tracedSVG"
            src="../../../images/main-logo.png"
            alt="HP logo"
            layout="constrained"
            objectFit="contain"
          />
        </div>
        <div className={styles.loginFormTitle}>Login</div>
        <Formik
          initialValues={{
            email: '',
            password: '',
            keepLoggedIn: false,
          }}
          validate={values => {
            const errors = {};
            const requiredValues = ['email', 'password'];
            requiredValues.forEach(item => {
              if (!values[item]) {
                errors[item] = 'Required field';
              }
            });
            return errors;
          }}
          validateOnChange={false}
          onSubmit={values => {
            Cookies.set('keepLoggedIn', values?.keepLoggedIn, { secure: true });
            const newValues = { ...values };
            delete newValues.keepLoggedIn;
            setLoading(true);
            loginUser({ variables: { input: { ...newValues } } });
          }}
        >
          {({ values, errors, handleChange, handleSubmit }) => (
            <form className={styles.signUpInputs} onSubmit={handleSubmit}>
              <Input
                hasError={errors.email}
                onChange={handleChange}
                name="email"
                label="Email"
                placeholder="Your email"
                type="email"
                value={values.email}
                autoComplete="username"
              />
              <Input
                hasError={errors.password}
                onChange={handleChange}
                name="password"
                label="Password"
                placeholder="Your password"
                type="password"
                value={values.password}
                autoComplete="current-password"
              />
              <div className={styles.loginFormKeepLoggedIn}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.keepLoggedIn || false}
                      onChange={handleChange}
                      name="keepLoggedIn"
                      color="primary"
                    />
                  }
                  label={<>Keep me signed in</>}
                />
              </div>
              <div className={styles.loginFormButton}>
                <Button htmlType="submit" type="submit">
                  {loading ? (
                    <CircularProgress
                      classes={{ svg: styles.loadingIndicator }}
                      size={20}
                    />
                  ) : (
                    'Login'
                  )}
                </Button>
              </div>
              <div className={styles.loginFormNoAccount}>
                <span className={styles.loginFormNoAccountTitle}>
                  You don&apos;t have an account?
                </span>
                <Button
                  className={styles.loginFormNoAccountButton}
                  onClick={() => setToggleSignUp(true)}
                  isOutline
                >
                  Sign up
                </Button>
              </div>
              <div className={styles.forgotYourPasswordWrapper}>
                <Link to="/request-reset-password" className={styles.forgotYourPassword}>
                  Forgot your password?
                </Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
LoginForm.defaultProps = {
  noRedirect: false,
};
LoginForm.propTypes = {
  setToggleSignUp: PropTypes.func,
  noRedirect: PropTypes.bool.isRequired,
};
export default LoginForm;
