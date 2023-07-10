import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import DashboardLayout from '../../../layout/DashboardLayout';
import SEO from '../../../layout/seo';
import * as styles from './settings.module.scss';
import Grid from '@mui/material/Grid';
import Profile from './components/Profile';
import SettingsCard from './components/SettingsCard';

const Settings = ({ user, updateBreadcrumbs }) => {
  useEffect(() => {
    updateBreadcrumbs({ displayName: 'Settings', link: '/account/settings' });
  }, []);
  return (
    <DashboardLayout title={'Settings'} subTitle={'Need assitance? Contact us.'}>
      <SEO title="Settings" description="Need assitance? Contact us." />
      <h2 className={styles.pageTitle}>Manage your profile information.</h2>
      <Grid direction="column" container spacing={3}>
        <Grid item xs={12} md={10} lg={6}>
          <Profile user={user} />
        </Grid>
        <Grid item xs={12} md={10} lg={6}>
          <SettingsCard />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

Settings.propTypes = {
  user: PropTypes.object,
  updateBreadcrumbs: PropTypes.func.isRequired,
};

export default Settings;
