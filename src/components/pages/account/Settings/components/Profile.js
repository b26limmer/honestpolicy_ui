import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Button from '../../../../form-button';
import * as styles from './profile.module.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useMutation, gql } from '@apollo/client';
import { CircularProgress } from '@mui/material';
import { AlertsContext } from '../../../../state/AlertsContext';

const Profile = ({ user }) => {
  const UPDATE_PROFILE = gql`
    mutation updateProfile($input: UpdateProfileInput!) {
      updateProfile(input: $input) {
        errors
        success
        user {
          profile {
            firstName
            id
          }
        }
      }
    }
  `;

  const initialProfileData = {
    firstName: {
      value: '',
      label: 'First name',
      type: 'text',
      placeholer: 'John',
      error: '',
      autocomplete: 'given-name',
    },
    lastName: {
      value: '',
      label: 'Last name',
      type: 'text',
      placeholer: 'Doe',
      error: '',
      autocomplete: 'family-name',
    },
    email: {
      value: '',
      label: 'Email',
      type: 'email',
      placeholer: 'john.doe@companyinc.com',
      error: '',
      autocomplete: 'email',
    },
    phone: {
      value: '',
      label: 'Phone',
      type: 'tel',
      placeholer: '123 123 1234',
      error: '',
      autocomplete: 'tel',
    },
    currentPassword: {
      value: '',
      label: 'Current Password',
      type: 'password',
      placeholer: '********',
      error: '',
      autocomplete: 'current-password',
    },
    newPassword: {
      value: '',
      label: 'New Password',
      type: 'password',
      placeholer: '********',
      error: '',
      autocomplete: 'new-password',
    },
    repeatNewPassword: {
      value: '',
      label: 'Repeat New Password',
      type: 'password',
      placeholer: '********',
      error: '',
      autocomplete: 'new-password',
    },
  };
  const { dispatchAlert } = useContext(AlertsContext);
  const [profileData, setProfileData] = useState(initialProfileData);
  const [allowChangePassword, setAllowChangePassword] = useState(false);
  const [updateProfile, { loading: profileMutationLoading }] = useMutation(
    UPDATE_PROFILE,
    {
      onCompleted: ({ updateProfile }) => {
        if (updateProfile?.errors?.length > 0) {
          let newErrors = '';
          updateProfile.errors.forEach(error => (newErrors += `${error}. `));
          showErrorMessage(newErrors);
        } else if (updateProfile?.success) {
          dispatchAlert('Your profile has been updated!', 'success');
        }
      },
      onError: error => console.error(error),
    }
  );
  const showErrorMessage = errorMessage => {
    dispatchAlert(errorMessage);
  };

  useEffect(() => {
    let newProfileData = JSON.parse(JSON.stringify(profileData));
    newProfileData.firstName.value = user.firstname || '';
    newProfileData.lastName.value = user.lastname || '';
    newProfileData.email.value = user.email || '';
    newProfileData.phone.value = user.phone || '';
    setProfileData(newProfileData);
  }, [user]);
  const handleChange = (field, event) => {
    let fieldToUpdate = profileData[field];
    fieldToUpdate.value = event.target.value;
    setProfileData({ ...profileData, [field]: { ...fieldToUpdate } });
  };
  const handleProfileUpdate = () => {
    let variables = {
      firstName: profileData.firstName.value,
      lastName: profileData.lastName.value,
      phone: profileData.phone.value,
    };
    let currentPassword = profileData.currentPassword.value;
    let newPassword = profileData.newPassword.value;
    let repeatNewPassword = profileData.repeatNewPassword.value;
    if (newPassword || repeatNewPassword) {
      if (!currentPassword) {
        showErrorMessage('Please provide your current password');
        return;
      }
      if (newPassword !== repeatNewPassword) {
        showErrorMessage("Passwords doesn't match");
        return;
      }
      variables.password = newPassword;
      variables.passwordConfirmation = repeatNewPassword;
      variables.currentPassword = currentPassword;
    }
    updateProfile({
      variables: {
        input: variables,
      },
    });
  };
  return (
    <Card classes={{ root: styles.cardRoot }}>
      <CardHeader title={'Profile'} classes={{ title: styles.cardHeaderTitle }} />
      <Divider variant={'middle'} />
      {!!profileMutationLoading && (
        <div className={styles.loadingContainer}>
          <CircularProgress />
        </div>
      )}
      <form>
        <CardContent>
          <div className={styles.settingsForm}>
            {Object.entries(profileData).map(
              (field, idx) =>
                field[0].search('Password') === -1 && (
                  <div key={idx} className={styles.inputContainer}>
                    <label htmlFor={field[0]}>{field[1].label}</label>
                    <input
                      className={classNames(
                        styles.input,
                        field[1].error ? styles.inputError : ''
                      )}
                      required
                      type={field[1].type}
                      autoComplete={field[1].autocomplete}
                      name={field[0]}
                      value={field[1].value}
                      placeholder={field[1].placeholer}
                      onChange={e => handleChange(field[0], e)}
                    />
                    <span className={styles.formError}>{field[1].error}</span>
                  </div>
                )
            )}
          </div>
        </CardContent>
        <CardHeader
          title={'Password'}
          classes={{ title: styles.cardHeaderTitle }}
          action={
            <button
              className={styles.changePasswordToggle}
              type="button"
              onClick={() => {
                allowChangePassword
                  ? setAllowChangePassword(false)
                  : setAllowChangePassword(true);
              }}
            >
              Change Password
            </button>
          }
        />
        {!!allowChangePassword && (
          <>
            <Divider variant={'middle'} />
            <CardContent>
              <form>
                {Object.entries(profileData).map(
                  (field, idx) =>
                    field[0].search('Password') !== -1 && (
                      <div key={idx} className={styles.inputContainer}>
                        <label htmlFor={field[0]}>{field[1].label} </label>
                        <input
                          className={classNames(
                            styles.input,
                            field[1].error ? styles.inputError : ''
                          )}
                          autoComplete={field[1].autocomplete}
                          type={field[1].type}
                          name={field[0]}
                          value={field[1].value}
                          placeholder={field[1].placeholer}
                          onChange={e => handleChange(field[0], e)}
                        />
                        <span className={styles.formError}>{field[1].error}</span>
                      </div>
                    )
                )}
              </form>
            </CardContent>
          </>
        )}
        <CardContent className={styles.saveButtonContainer}>
          <Button
            onClick={handleProfileUpdate}
            type="button"
            className={styles.saveButton}
          >
            Save
          </Button>
        </CardContent>
      </form>
    </Card>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
};

export default Profile;
