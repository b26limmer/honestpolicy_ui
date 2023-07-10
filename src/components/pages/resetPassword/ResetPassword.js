import React, { useContext } from 'react';
import { navigate } from 'gatsby';
import FormBox from '../../form-box/FormBox';
import { gql, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import Input from '../../inputs/FormInput';
import Button from '../../form-button';
import * as styles from './request-reset-password.module.scss';
import PropTypes from 'prop-types';
import { AlertsContext } from '../../state/AlertsContext';

const RESET_PASSWORD = gql`
  mutation resetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      success
      errors
    }
  }
`;

const ResetPasswordTemplate = ({ token }) => {
  const { dispatchAlert } = useContext(AlertsContext);
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD, {
    onCompleted: data => {
      if (data.resetPassword) {
        if (data?.resetPassword?.success) {
          dispatchAlert('Password changed successfully!', 'success');
        } else {
          dispatchAlert(
            data?.resetPassword?.errors[0] || 'Something unexpected happend!'
          );
        }
      }
      setTimeout(() => {
        if (data?.resetPassword?.success) {
          navigate('/', { state: { login: true } });
        }
      }, 3500);
    },
    onError: ({ message }) => dispatchAlert(message),
  });

  return (
    <div className={styles.requestResetPassword}>
      <div className={styles.requestResetPasswordInner}>
        <FormBox title="Reset password">
          <Formik
            initialValues={{
              email: '',
              password: '',
              passwordConfirmation: '',
            }}
            validate={values => {
              const errors = {};

              const requiredValues = ['email', 'password', 'passwordConfirmation'];

              requiredValues.forEach(item => {
                if (!values[item]) {
                  errors[item] = 'Required field';
                }
              });

              if (values?.password !== values?.passwordConfirmation) {
                errors.password = 'Error';
                errors.passwordConfirmation = 'Error';
              }

              return errors;
            }}
            validateOnChange={false}
            onSubmit={values => {
              resetPassword({ variables: { input: { ...values, token } } });
            }}
          >
            {({ values, errors, handleChange, handleSubmit }) => (
              <>
                <form
                  className={styles.requestResetPasswordInputs}
                  onSubmit={handleSubmit}
                >
                  <Input
                    hasError={errors.email}
                    onChange={handleChange}
                    name="email"
                    placeholder="Your email"
                    type="email"
                    value={values.email}
                  />
                  <Input
                    hasError={errors.password}
                    onChange={handleChange}
                    name="password"
                    placeholder="Your new password"
                    type="password"
                    value={values.password}
                  />
                  <Input
                    hasError={errors.passwordConfirmation}
                    onChange={handleChange}
                    name="passwordConfirmation"
                    placeholder="Repeat your new password"
                    type="password"
                    value={values.passwordConfirmation}
                  />
                  <div className={styles.requestResetPasswordButton}>
                    <Button htmlType="submit" type="submit" isDisabled={loading}>
                      Submit
                    </Button>
                  </div>
                </form>
              </>
            )}
          </Formik>
        </FormBox>
      </div>
    </div>
  );
};
ResetPasswordTemplate.propTypes = {
  token: PropTypes.string,
};
export default ResetPasswordTemplate;
