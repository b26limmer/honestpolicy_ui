import React, { useEffect } from 'react';
import FormBox from '../../form-box/FormBox';
import { navigate } from 'gatsby';
import { gql, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import Input from '../../inputs/FormInput';
import Button from '../../form-button';
import { useRedux } from '../../redux/reduxContext';

import * as styles from './request-reset-password.module.scss';

const REQUEST_PASSWORD_RESET = gql`
  mutation requestPasswordReset($input: RequestPasswordResetInput!) {
    requestPasswordReset(input: $input) {
      success
      errors
    }
  }
`;

const RequestResetPasswordTemplate = () => {
  const alertDispatch = useRedux()[1];

  const [requestPasswordReset, { data, error, loading }] = useMutation(
    REQUEST_PASSWORD_RESET,
    {
      errorPolicy: 'all',
      onError: error => {
        alertDispatch({
          type: 'ALERT_OPEN',
          payload: {
            type: 'error',
            message: error.message,
          },
        });
      },
    }
  );

  useEffect(() => {
    if (data?.requestPasswordReset) {
      if (data.requestPasswordReset?.success) {
        navigate('/login?reset-password-sent=true');
      }
    }

    if (error) {
      alertDispatch({
        type: 'ALERT_OPEN',
        payload: {
          type: 'error',
          message: error.message,
        },
      });
    }
  }, [data, error]);

  return (
    <div className={styles.requestResetPassword}>
      <div className={styles.requestResetPasswordInner}>
        <FormBox title="Request password reset">
          <Formik
            initialValues={{
              email: '',
            }}
            validate={values => {
              const errors = {};

              const requiredValues = ['email'];

              requiredValues.forEach(item => {
                if (!values[item]) {
                  errors[item] = 'Required field';
                }
              });

              return errors;
            }}
            validateOnChange={false}
            onSubmit={values => {
              let host = window.location.origin;
              requestPasswordReset({
                variables: { input: { ...values }, mailer_host: host },
              });
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
                    label="Email"
                    placeholder="Your email"
                    type="email"
                    value={values.email}
                  />
                  <div className={styles.requestResetPasswordButton}>
                    <Button htmlType="submit" type="submit" isDisabled={loading}>
                      Request new password
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

export default RequestResetPasswordTemplate;
