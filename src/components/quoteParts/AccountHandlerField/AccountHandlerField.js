import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FormBlock from '../../form/FormBlock';
import FormInput from '../../inputs/FormInput/FormInput';
import Cookies from 'js-cookie';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../utils/queries';
import _ from 'lodash';

const AccountHandlerField = ({
  isActive,
  email,
  handleChange,
  handleBlur,
  errors,
  setShowLoginPopup,
  password,
}) => {
  const [canSetPassword, setCanSetPassword] = useState(true);
  const user = JSON.parse(Cookies.get('user') || '{}');
  const notLoggedIn = _.isEmpty(user);
  const [createUser, { loading }] = useMutation(CREATE_USER);
  const checkEmailOnBlur = e => {
    let userExistsErrorMessage = 'Email has already been taken';
    handleBlur(e);
    let newEmail = e.target.value;
    if (notLoggedIn && newEmail) {
      createUser({
        variables: {
          input: {
            email: newEmail,
            password: '',
            passwordConfirmation: '',
          },
        },
        onError: ({ message }) => {
          if (message.search(userExistsErrorMessage) == -1) {
            handleChange({ target: { name: 'password', value: '' } });
            setCanSetPassword(true);
          } else {
            setCanSetPassword(true);
            handleChange({ target: { name: 'email', value: '' } });
            setShowLoginPopup(true);
          }
        },
      });
    }
  };
  useEffect(() => {
    if (!email && !notLoggedIn) {
      handleChange({ target: { name: 'email', value: user.email } });
    }
    if (email && !notLoggedIn && !password) {
      handleChange({ target: { name: 'password', value: 'undefined' } });
    }
  }, [user]);

  return (
    <form onSubmit={e => e.preventDefault()}>
      <FormBlock title="What's your email?" isActive={isActive} delay="0.2s">
        <FormInput
          isDisabled={loading}
          hasError={errors.email}
          onChange={e => {
            if (e.target.value.length - email.length > 1) {
              checkEmailOnBlur(e);
            }
            handleChange(e);
          }}
          onBlur={checkEmailOnBlur}
          name="email"
          placeholder="Email"
          autoComplete="email"
          type="email"
          value={email}
        />
      </FormBlock>
      {!!canSetPassword && !errors.email && notLoggedIn && (
        <FormBlock title="Set a password" isActive={!!email} delay="0.2s">
          <FormInput
            hasError={errors.password}
            isDisabled={loading}
            onChange={handleChange}
            onBlur={handleBlur}
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            type="password"
            value={password}
          />
        </FormBlock>
      )}
    </form>
  );
};

AccountHandlerField.propTypes = {
  isActive: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setShowLoginPopup: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
};

export default AccountHandlerField;
