import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as styles from './coverageDetails.module.scss';
import SEO from '../../../../../../../layout/seo';
import FormFooter from '../FormFooter';
import classNames from 'classnames';
import PropertyDetails from './components/PropertyDetails';
import VehicleDetails from './components/VehicleDetails';
import { navigate } from '@reach/router';

const CoverageDetails = ({
  onSubmit,
  handleFormChange,
  policyData,
  validateForms,
  routeIdx,
  useRouteBaseValidation,
  setPercentageCompleted,
  formSteps,
  setFormSteps,
  updateBreadcrumbs,
}) => {
  const [currentAsset, setCurrentAsset] = useState(0);

  useEffect(() => {
    let isMounted = true;
    if (policyData.insuranceType === 'Personal') {
      navigate('./addons');
    }
    let prev = policyData.insuranceOptions;
    prev.forEach((asset, idx) => {
      if (idx <= currentAsset) {
        asset.isBeingEdited = true;
      } else {
        asset.isBeingEdited = false;
      }
    });
    if (isMounted) {
      handleFormChange([{ name: 'insuranceOptions', value: prev }]);
    }
    return () => {
      isMounted = false;
    };
  }, [currentAsset]);

  useRouteBaseValidation(
    validateForms,
    routeIdx,
    setPercentageCompleted,
    formSteps,
    setFormSteps,
    updateBreadcrumbs
  );
  const handleAssetChange = () => {
    if (currentAsset < policyData.insuranceOptions.length - 1) {
      setCurrentAsset(currentAsset + 1);
    } else {
      onSubmit();
    }
  };
  const handleAssetCoverageChange = (assetIdx, field, value) => {
    let prev = policyData.insuranceOptions;
    prev[assetIdx].coverageDetails[field] = value;
    handleFormChange([{ name: 'insuranceOptions', value: prev }]);
  };
  let coverageDetailsErrors =
    policyData?.errors?.coverageDetails?.length &&
    policyData.errors.coverageDetails.length === policyData.insuranceOptions.length
      ? policyData.errors.coverageDetails
      : undefined;

  return (
    <>
      <SEO title="Coverage Details" />
      {policyData.insuranceOptions.map((asset, idx) => (
        <div
          className={classNames(
            styles.formContainer,
            !asset.isBeingEdited && styles.optionsInactive
          )}
          key={idx}
        >
          {policyData.insuranceType === 'Vehicle' ? (
            <VehicleDetails
              styles={styles}
              handleAssetCoverageChange={handleAssetCoverageChange}
              idx={idx}
              asset={asset}
              coverageDetailsErrors={coverageDetailsErrors}
              handleFormChange={handleFormChange}
              policyData={policyData}
            />
          ) : policyData.insuranceType === 'Property' ? (
            <PropertyDetails
              styles={styles}
              handleAssetCoverageChange={handleAssetCoverageChange}
              idx={idx}
              asset={asset}
              coverageDetailsErrors={coverageDetailsErrors}
            />
          ) : (
            ''
          )}
        </div>
      ))}
      <FormFooter
        onSubmit={handleAssetChange}
        returnButtonText="Back"
        canSubmit={false}
        onReturn={() => {
          navigate('./info');
        }}
      />
    </>
  );
};

CoverageDetails.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  policyData: PropTypes.object.isRequired,
  validateForms: PropTypes.func.isRequired,
  routeIdx: PropTypes.number.isRequired,
  useRouteBaseValidation: PropTypes.func.isRequired,
  setPercentageCompleted: PropTypes.func.isRequired,
  formSteps: PropTypes.array.isRequired,
  setFormSteps: PropTypes.func.isRequired,
  updateBreadcrumbs: PropTypes.func.isRequired,
};

export default CoverageDetails;
