import React, { useContext } from 'react';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import * as styles from './dashboad-card-styles.module.scss';
import CardContent from '@mui/material/CardContent';
import Button from '../../../../../form-button';
import Input from '../../../../../inputs/FormInput/FormInput';
import Grid from '@mui/material/Grid';
import { ZipContext } from '../../../../../state/zipContext';
import { navigate } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const DashboardCarrierLookup = () => {
  const { zipCode, setZipCode } = useContext(ZipContext);
  return (
    <Card
      classes={{ root: styles.profileCarrierCardRoot }}
      className={styles.profileCarrierLookup}
    >
      <CardHeader
        avatar={
          <FontAwesomeIcon icon={faSearch} className={styles.profileSearchTitleIcon} />
        }
        title={'Look Up Carriers'}
        subheader={"We did the research, you don't have to!"}
        classes={{
          title: styles.accountProfileCardTitle,
          subheader: styles.accountProfileCardSubTitle,
        }}
      />
      <CardContent>
        <Grid item xs={12}>
          <div className={styles.accountProfileSearchInput}>
            <Input
              placeholder="Enter Zip Code"
              inputClassName={styles.dashboardZipCodeInput}
              name="zipCode"
              type="number"
              autoComplete="postal-code"
              value={zipCode}
              onChange={e => setZipCode(e.target.value)}
            />
            <Button onClick={() => navigate('/search')}>Search</Button>
          </div>
        </Grid>
      </CardContent>
    </Card>
  );
};

DashboardCarrierLookup.propTypes = {};

export default DashboardCarrierLookup;
