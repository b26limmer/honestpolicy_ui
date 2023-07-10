import React, { useContext, useState } from 'react';
import * as styles from './settings-card.module.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { Switch } from '@mui/material';
import FormButton from '../../../../form-button/FormButton';
import { useMutation, gql } from '@apollo/client';
import Cookies from 'js-cookie';
import { navigate } from 'gatsby-link';
import { AlertsContext } from '../../../../state/AlertsContext';

const SettingsCard = () => {
  const DELETE_USER = gql`
    mutation deleteUser {
      deleteUser(input: { clientMutationId: "" }) {
        clientMutationId
        success
        errors
        user {
          firstName
          id
        }
      }
    }
  `;
  const { dispatchAlert } = useContext(AlertsContext);
  const [newsChecked, setNewsChecked] = useState(false);
  const showErrorMessage = errorMessage => {
    dispatchAlert(errorMessage);
  };
  const handleNewsChange = value => {
    // TODO: We need to implement api endpoint to update this user settings
    setNewsChecked(value);
  };
  const [deleteUser, { loading: deleteLoading }] = useMutation(DELETE_USER, {
    onCompleted: ({ deleteUser }) => {
      if (deleteUser.success) {
        dispatchAlert(
          "We've deleted your account. You'll be redirected in 3 seconds",
          'success'
        );
        Cookies.remove('token');
        Cookies.remove('user');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        showErrorMessage(
          "We couldn't delete your account. Please try again or contact us"
        );
      }
    },
    onError: error => {
      showErrorMessage("We couldn't delete your account. Please try again or contact us");
      console.error(error);
    },
  });

  const handleDeleteAccount = () => {
    if (confirm('Do you really want to delete your account?')) {
      deleteUser();
    }
  };
  return (
    <Card classes={{ root: styles.cardRoot }}>
      <CardHeader title={'Settings'} classes={{ title: styles.cardHeaderTitle }} />
      <Divider variant={'middle'} />
      <CardContent>
        <div className={styles.settingsRow}>
          <div className={styles.settingsRowHeader}>
            <h3 className={styles.settingsRowTitle}>Receive emails and news</h3>
            <Switch
              color="primary"
              checked={newsChecked}
              inputProps={{ 'aria-label': 'controlled' }}
              classes={{
                checked: styles.switchCheckedColor,
                track: newsChecked ? styles.switchTrack : '',
              }}
              onChange={e => handleNewsChange(e.target.checked)}
            />
          </div>
          <p className={styles.settingsHelptext}>
            Get the latest news from Honest Policy.
          </p>
        </div>
      </CardContent>
      <Divider variant={'middle'} />
      <CardContent>
        <div className={styles.settingsRow}>
          <div className={styles.settingsRowHeader}>
            <h3 className={styles.settingsRowTitle}>Contact Support</h3>
            <FormButton
              onClick={() => navigate('/contact-us')}
              className={styles.settingsButton}
            >
              Contact
            </FormButton>
          </div>
          <p className={styles.settingsHelptext}>Need assistance? We’re here to help.</p>
        </div>
      </CardContent>
      <Divider variant={'middle'} />
      <CardContent>
        <div className={styles.settingsRow}>
          <div className={styles.settingsRowHeader}>
            <h3 className={styles.settingsRowTitle}>Delete Account</h3>
            <FormButton
              isDisabled={deleteLoading}
              onClick={handleDeleteAccount}
              className={styles.deleteButton}
            >
              Delete
            </FormButton>
          </div>
          <p className={styles.settingsHelptext}>
            Opt-out of your HP account and delete your personal data
          </p>
        </div>
      </CardContent>
      <Divider className={styles.lastHr} variant={'middle'} />
    </Card>
  );
};

SettingsCard.propTypes = {};

export default SettingsCard;
