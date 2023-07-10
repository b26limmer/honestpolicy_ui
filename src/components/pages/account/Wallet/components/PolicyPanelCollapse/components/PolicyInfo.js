import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TabPanel from './TabPanel';
import ErrorIcon from '@mui/icons-material/Error';
import PanelFooter from './PanelFooter';

const PolicyInfo = ({
  styles,
  policyData,
  activeTab,
  handleEditPolicy,
  insuranceType,
}) => {
  const insuranceOptions = policyData.insuranceOptions;
  const getInsuredAssetsDetails = () => {
    let details = [];
    if (!insuranceOptions) {
      return;
    }
    switch (insuranceType) {
      case 'Vehicle':
        details = insuranceOptions.map(
          option => `${option.year} ${option.make} ${option.model}`
        );
        break;
      case 'Property':
        details = insuranceOptions.map(option => `${option.address}, ${option.state}`);
        break;
      case 'Personal':
        details = insuranceOptions.map(
          option => `${option.selectedInsurance} ${option.planName}`
        );
        break;
    }
    return details;
  };
  return (
    <TabPanel
      value={activeTab}
      index={0}
      styles={styles}
      className={styles.policyPanelPolicyTab}
    >
      <Grid container direction={'row'} justifyContent={'space-between'}>
        <Grid item md={5} xs={12} sm={6} className={styles.policyPanelInfoLeft}>
          <label>
            <span>Policy Holder</span>
            <p className={styles.policyText}>
              {policyData?.firstName} {policyData?.lastName}
            </p>
          </label>
          <Divider />
          <label>
            <span>Mailing Address</span>
            <p className={styles.policyText}>
              {policyData?.address}
              <br />
              {policyData?.city}, {policyData?.state} {policyData?.zip}
            </p>
          </label>
          <Divider />
          <label>
            <span>
              {insuranceType === 'Vehicle'
                ? 'Vehicles'
                : insuranceType === 'Property'
                ? 'Properties'
                : 'Plans'}{' '}
              Covered
            </span>
            {getInsuredAssetsDetails()?.map((text, idx) => (
              <p className={styles.policyText} key={idx}>
                {text}
              </p>
            ))}
          </label>
          <Divider />
        </Grid>
        <Grid item md={5} xs={12} sm={6} className={styles.policyPanelInfoRight}>
          <label>
            <span>Insurance Carrier</span>
            <p className={styles.policyText}>{policyData?.carrier?.name}</p>
          </label>
          <Divider />
          <label>
            <span>Policy Number</span>
            <p className={styles.policyText}>{policyData?.policyNumber}</p>
          </label>
          <Divider />
          <label>
            <span>Effective Date</span>
            <div>
              <p className={styles.policyText}>
                {policyData?.effectiveDateStart} - {policyData?.effectiveDateEnd}
              </p>
              <ErrorIcon />
            </div>
          </label>
          <Divider />
        </Grid>
        <PanelFooter
          styles={styles}
          handleEditPolicy={handleEditPolicy}
          policyData={policyData}
        />
      </Grid>
    </TabPanel>
  );
};

PolicyInfo.propTypes = {
  styles: PropTypes.object.isRequired,
  activeTab: PropTypes.number.isRequired,
  handleEditPolicy: PropTypes.func.isRequired,
  policyData: PropTypes.object.isRequired,
  insuranceType: PropTypes.string.isRequired,
};

export default PolicyInfo;
