import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TabPanel from './TabPanel';
import ErrorIcon from '@mui/icons-material/Error';
import _ from 'lodash';
import PanelFooter from './PanelFooter';

const Discounts = ({ styles, policyData, activeTab, handleEditPolicy }) => {
  const userDiscounts = policyData?.carrier?.discounts;
  return (
    <TabPanel
      value={activeTab}
      index={3}
      styles={styles}
      className={styles.policyPanelCoverageTab}
    >
      <Grid container direction={'row'}>
        <Grid container direction={'row'} className={styles.policyPanelCoverageTabHeader}>
          {_.isEmpty(userDiscounts) ? (
            <Grid item md={12} sm={12} xs={12}>
              <label>There aren&apos;t discounts in your policy</label>
            </Grid>
          ) : (
            <>
              <Grid item md={6} sm={6} xs={6}>
                <label>Coverages</label>
              </Grid>
              <Grid item md={6} sm={6} xs={6} className={styles.policyPanelPadding}>
                <label>Yes/No</label>
              </Grid>
            </>
          )}
        </Grid>
        {userDiscounts?.map((discount, idx) => (
          <Grid key={idx} container>
            <Grid item md={6} sm={6} xs={6} className={styles.policyPanelCoverageInner}>
              <label>{discount.name}</label>
            </Grid>
            <Grid item md={6} sm={6} xs={6} className={styles.policyPanelCoverageInner}>
              <label>
                {discount.value ? 'Yes' : 'No'}
                <ErrorIcon />
              </label>
            </Grid>
            <Grid item md={12}>
              <Divider />
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Grid item md={12} sm={12} xs={12} className={styles.policyPanelCoverageEdit}>
        <PanelFooter
          styles={styles}
          handleEditPolicy={handleEditPolicy}
          policyData={policyData}
        />
      </Grid>
    </TabPanel>
  );
};

Discounts.propTypes = {
  styles: PropTypes.object.isRequired,
  activeTab: PropTypes.number.isRequired,
  handleEditPolicy: PropTypes.func.isRequired,
  policyData: PropTypes.object.isRequired,
};

export default Discounts;
