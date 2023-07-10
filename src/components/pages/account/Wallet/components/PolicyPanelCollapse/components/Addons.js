import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TabPanel from './TabPanel';
import ErrorIcon from '@mui/icons-material/Error';
import _ from 'lodash';
import PanelFooter from './PanelFooter';

const Addons = ({ styles, policyData, activeTab, handleEditPolicy }) => {
  const addons = policyData.addons;
  return (
    <TabPanel
      value={activeTab}
      index={2}
      styles={styles}
      className={styles.policyPanelCoverageTab}
    >
      <Grid container direction={'row'}>
        {_.isEmpty(addons) ? (
          <Grid
            container
            direction={'row'}
            className={styles.policyPanelCoverageTabHeader}
          >
            <label>There aren&apos;t any addons in your policy</label>
          </Grid>
        ) : (
          <>
            <Grid
              container
              direction={'row'}
              className={styles.policyPanelCoverageTabHeader}
            >
              <Grid item md={6} sm={6} xs={6}>
                <label>Addon</label>
              </Grid>
              <Grid item md={6} sm={6} xs={6} className={styles.policyPanelPadding}>
                <label>Included?</label>
              </Grid>
            </Grid>
            {Object.entries(addons)?.map((addon, idx) => (
              <Fragment key={idx}>
                <Grid
                  item
                  md={6}
                  sm={6}
                  xs={6}
                  className={styles.policyPanelCoverageInner}
                >
                  <label>{addon[0]}</label>
                </Grid>
                <Grid
                  item
                  md={6}
                  sm={6}
                  xs={6}
                  className={styles.policyPanelCoverageInner}
                >
                  <label>
                    {addon[1] ? 'Yes' : 'No'}
                    <ErrorIcon />
                  </label>
                </Grid>
                <Grid item md={12}>
                  <Divider />
                </Grid>
              </Fragment>
            ))}
          </>
        )}
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

Addons.propTypes = {
  styles: PropTypes.object.isRequired,
  activeTab: PropTypes.number.isRequired,
  handleEditPolicy: PropTypes.func.isRequired,
  policyData: PropTypes.object.isRequired,
};

export default Addons;
