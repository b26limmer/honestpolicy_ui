import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'gatsby';
import Button from '../../../form-button';
import DashboardLayout from '../../../layout/DashboardLayout';
import * as styles from './profile.module.scss';
import SEO from '../../../layout/seo';
import { dateTimeFormat } from '../../../../utils/validation';
import Grid from '@mui/material/Grid';
import { Wallet, Quotes, CarrierLookup } from './components/Cards';
import { navigate } from 'gatsby';

const Profile = ({ updateBreadcrumbs, user }) => {
  useEffect(() => {
    updateBreadcrumbs({ level: 1 });
  }, []);
  return (
    <DashboardLayout
      title={'Dashboard'}
      classes={{ layoutInner: styles.dashboardLayoutInner }}
      subTitle={'How does Honest Policy work?'}
      helpText="Unlike most of the competition, we never sell your data. When you buy a policy, we only share your information with the chosen insurer, and they pay us a small commission for the referral, keeping the service free for you. We never let the commissions influence our suggestions, however, and only use unbiased metrics for our insurer ratings."
      rightSideChildren={
        <Button onClick={() => navigate('/quotes')} className={styles.getQuotesBtn}>
          Get Quotes
        </Button>
      }
    >
      <SEO title="Dashboard" />
      <div className={styles.accountProfile}>
        <div className={styles.accountProfileInner}>
          <Grid container spacing={3}>
            <Grid
              container
              direction={'row'}
              justifyContent={'space-around'}
              className={styles.accountProfileInnerHeader}
            >
              <Grid item xs={12} md={6}>
                <span className={styles.accountProfileInnerHeaderName}>
                  {`${user.firstname} ${user.lastname}`}
                </span>
                <div className={styles.profileEditLink}>
                  <Link to={'/account/settings'}>
                    <FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>Edit Profile
                  </Link>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className={styles.profileDate}>
                  <span>Today is {dateTimeFormat.format(new Date())}</span>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={3} justifyContent={'space-between'}>
              <Grid item xs={12} md={5} sm={12}>
                <Wallet />
              </Grid>
              <Grid item xs={12} md={5} sm={12}>
                <Quotes />
                <CarrierLookup />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </DashboardLayout>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
  updateBreadcrumbs: PropTypes.func.isRequired,
};

export default Profile;
