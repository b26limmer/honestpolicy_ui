import React from 'react';
import PropTypes from 'prop-types';
import IconOptions from '../../../../../../../../inputs/IconOptions/IconOptions';
import {
  propertyInsurances,
  vehicleInsurances,
  personalInsurances,
} from '../../../policyFormData';
import InsuredVehicleOptions from './InsuredVehicleOptions';
import InsuredPropertyOptions from './InsuredPropertyOptions';
import InsuredPersonalOptions from './InsuredPersonalOptions';
import RemoveButton from '../../../../../../../../RemoveButton/RemoveButton';

const InsuranceOptions = ({
  styles,
  option,
  insuranceType,
  handleChange,
  formData,
  optionPos,
}) => {
  const formValues = formData.insuranceOptions[optionPos];
  const handleInsuranceClick = info => {
    let prev = formData;
    prev.insuranceOptions[optionPos].selectedInsurance = info;
    if (prev.insuranceType === 'Vehicle') {
      prev.insuranceOptions[optionPos].year = '';
      prev.insuranceOptions[optionPos].make = '';
      prev.insuranceOptions[optionPos].model = '';
    }
    handleChange({ name: 'insuranceOptions', value: prev.insuranceOptions });
  };
  const insuredOptionsErrors =
    formData.errors?.insuranceOptions?.length && formData.errors?.insuranceOptions;
  const returnIconOptions = () => {
    let icons;
    switch (formData.insuranceType) {
      case 'Vehicle':
        icons = vehicleInsurances;
        break;

      case 'Property':
        icons = propertyInsurances;
        break;
      case 'Personal':
        icons = personalInsurances;
        break;
    }
    return icons;
  };
  const options = formData.insuranceOptions;
  const setActiveInsuranceOptions = () => {
    for (let index = 0; index < options.length; index++) {
      let optionToChange = options[index];
      if (index !== optionPos) {
        optionToChange.isBeingEdited = false;
      } else {
        optionToChange.isBeingEdited = true;
      }
    }
    handleChange({ name: 'insuranceOptions', value: options });
  };
  const handleRemoveOption = () => {
    let prev = formData;
    if (prev.insuranceOptions.length < 2) return;
    if (prev.insuranceOptions[optionPos].isBeingEdited) {
      for (let i = 0; i < prev.insuranceOptions.length; i++) {
        if (i !== optionPos) {
          prev.insuranceOptions[i].isBeingEdited = true;
          break;
        }
      }
    }
    prev.insuranceOptions.splice(optionPos, 1);
    handleChange([{ name: 'insuranceOptions', value: prev.insuranceOptions }]);
  };
  return (
    <div
      className={
        option.isBeingEdited ? styles.insuranceOption : styles.inactiveInsuranceOption
      }
      onClickCapture={setActiveInsuranceOptions}
    >
      <h3 className={styles.formSectionTitle}>
        Choose {insuranceType} Insurance
        {options.length > 1 && (
          <RemoveButton rootClassname={styles.removeButton} onClick={handleRemoveOption}>
            <p className={styles.removeOptionText}>Remove</p>
          </RemoveButton>
        )}
      </h3>
      <IconOptions
        options={returnIconOptions()}
        onChange={handleInsuranceClick}
        selected={option.selectedInsurance}
      />
      <div className={styles.assetInfoContainer}>
        <h3 className={styles.formSectionTitle}>{insuranceType} Info</h3>
        {insuranceType === 'Vehicle' ? (
          <InsuredVehicleOptions
            insuredOptionsErrors={insuredOptionsErrors}
            styles={styles}
            formData={formData}
            formValues={formValues}
            optionPos={optionPos}
            handleChange={handleChange}
          />
        ) : insuranceType === 'Property' ? (
          <InsuredPropertyOptions
            insuredOptionsErrors={insuredOptionsErrors}
            styles={styles}
            formData={formData}
            formValues={formValues}
            optionPos={optionPos}
            handleChange={handleChange}
          />
        ) : (
          <InsuredPersonalOptions
            insuredOptionsErrors={insuredOptionsErrors}
            styles={styles}
            formData={formData}
            formValues={formValues}
            optionPos={optionPos}
            handleChange={handleChange}
          />
        )}
      </div>
    </div>
  );
};

InsuranceOptions.propTypes = {
  styles: PropTypes.object.isRequired,
  option: PropTypes.object.isRequired,
  insuranceType: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  optionPos: PropTypes.number.isRequired,
};

export default InsuranceOptions;
