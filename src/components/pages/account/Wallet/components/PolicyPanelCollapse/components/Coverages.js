import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TabPanel from './TabPanel';
import ErrorIcon from '@mui/icons-material/Error';
import { vehicleCoverageNames, propertyCoverageNames } from './coverageNames';
import { formatToCurrency } from '../../../../../../../utils/validation';
import PanelFooter from './PanelFooter';

const Coverages = ({
  styles,
  activeTab,
  handleEditPolicy,
  policyData,
  insuranceType,
}) => {
  const insuredAssets = policyData.insuranceOptions;
  const getAssetTitle = asset => {
    let title;
    switch (insuranceType) {
      case 'Vehicle':
        title = `${asset.year} ${asset.make} ${asset.model}`;
        break;
      case 'Property':
        title = `${asset.address} ${asset.city} ${asset.state}`;
        break;
      case 'Personal':
        title = `${asset.selectedInsurance} ${asset.planName}`;
        break;
    }
    return title;
  };
  let coverageNames =
    insuranceType === 'Vehicle' ? vehicleCoverageNames : propertyCoverageNames;
  const checkShow = (detail, coverageDetails) => {
    if (!(detail[0] in coverageNames)) return false;
    if (!coverageNames[detail[0]].show) return false;
    if (coverageNames[detail[0]].dependsOn.length) {
      let dependencies = coverageNames[detail[0]].dependsOn;
      let show;
      for (let i = 0; i < dependencies.length; i++) {
        let dep = dependencies[i];
        let falseDependency = dep.search('!');
        if (falseDependency === -1) {
          show = coverageDetails[dep];
        } else {
          show = !coverageDetails[dep.slice(1)];
        }
        if (!show) {
          break;
        }
      }
      return show;
    }
    return true;
  };
  const formatValue = detail => {
    let value = detail[1];
    let type = coverageNames[detail[0]].type || typeof value;
    switch (type) {
      case 'number':
        value = formatToCurrency(value);
        break;
      case 'boolean':
        if (value) value = <i className="fas fa-check-circle" />;
        else value = <i className="far fa-times-circle" />;
        break;
      case 'percentage':
        value = value + '%';
        break;
    }
    return value;
  };
  return (
    <TabPanel
      styles={styles}
      value={activeTab}
      index={1}
      className={styles.policyPanelCoverageTab}
    >
      <Grid container direction={'row'}>
        <Grid container direction={'row'} className={styles.policyPanelCoverageTabHeader}>
          <Grid item md={6} sm={6} xs={6}>
            <label>Coverages</label>
          </Grid>
          <Grid item md={6} sm={6} xs={6} className={styles.policyPanelPadding}>
            <label>Amount</label>
          </Grid>
        </Grid>
        {insuredAssets.map((asset, idx) => (
          <Grid key={idx} container>
            <Grid container direction={'row'} className={styles.policyPanelCoverageInner}>
              <Grid item md={12} sm={12} xs={12}>
                <h2 className={styles.coverageDetailsAssetTitle}>
                  {getAssetTitle(asset)}
                </h2>
              </Grid>
            </Grid>
            <Grid item md={12}>
              <Divider />
            </Grid>
            {Object.entries(asset.coverageDetails).map((detail, idx) => {
              if (checkShow(detail, asset.coverageDetails))
                return (
                  <Grid container key={idx}>
                    <Grid
                      item
                      md={6}
                      sm={6}
                      xs={6}
                      className={styles.policyPanelCoverageInner}
                    >
                      <label>{coverageNames[detail[0]].title}</label>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      sm={6}
                      xs={6}
                      className={styles.policyPanelCoverageInner}
                    >
                      <label>
                        {formatValue(detail)}
                        <ErrorIcon />
                      </label>
                    </Grid>
                    <Grid item md={12}>
                      <Divider />
                    </Grid>
                  </Grid>
                );
            })}
          </Grid>
        ))}
      </Grid>
      <Grid className={styles.policyPanelCoverageEdit}>
        <PanelFooter
          styles={styles}
          handleEditPolicy={handleEditPolicy}
          policyData={policyData}
        />
      </Grid>
    </TabPanel>
  );
};

Coverages.propTypes = {
  styles: PropTypes.object.isRequired,
  activeTab: PropTypes.number.isRequired,
  handleEditPolicy: PropTypes.func.isRequired,
  policyData: PropTypes.object.isRequired,
  insuranceType: PropTypes.string.isRequired,
};

export default Coverages;
