import React from 'react';
import PropTypes from 'prop-types';
import FormFooter from '../FormFooter';
import * as styles from './start.module.scss';
import SEO from '../../../../../../../layout/seo';
import OptionsSelect from '../../../../../../../inputs/OptionsSelect';
import {
  vehicleOptionsType,
  propertyOptionsType,
  personalOptionsType,
} from '../../PolicyFormState';
import { faShield } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InsuranceOptions from './components/InsuranceOptions';
import AddOption from '../../../../../../../inputs/AddOption/AddOption';
import { navigate } from '@reach/router';
import FormBlock from '../../../../../../../form/FormBlock/FormBlock';

const Start = ({
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
  const insuranceTypes = [
    { name: 'Vehicle', value: false },
    { name: 'Property', value: false },
    { name: 'Personal', value: false },
  ];
  const returnInsuranceOptions = type => {
    switch (type) {
      case 'Vehicle':
        return JSON.parse(JSON.stringify(vehicleOptionsType));
      case 'Property':
        return JSON.parse(JSON.stringify(propertyOptionsType));
      case 'Personal':
        return JSON.parse(JSON.stringify(personalOptionsType));
    }
  };
  const setInsuranceType = options => {
    let selected = options.filter(option => option.value == true);
    handleFormChange([
      { name: 'insuranceOptions', value: [returnInsuranceOptions(selected[0].name)] },
      { name: 'insuranceType', value: selected[0].name },
    ]);
  };
  const validateFields = () => {
    return true;
  };
  const handleAddOption = () => {
    if (policyData.insuranceOptions.length < 3 && validateFields()) {
      let prev = policyData;
      let type = prev.insuranceType;
      let optionToAdd = returnInsuranceOptions(type);
      prev.insuranceOptions.push(optionToAdd);
      handleFormChange([{ name: 'insuranceOptions', value: prev.insuranceOptions }]);
    }
  };
  useRouteBaseValidation(
    validateForms,
    routeIdx,
    setPercentageCompleted,
    formSteps,
    setFormSteps,
    updateBreadcrumbs
  );

  return (
    <div className={styles.formContainer}>
      <SEO title="Start" />
      <FormBlock isActive={true} rootClassName={styles.initialContainer}>
        <div className={styles.initialContainer}>
          <FontAwesomeIcon icon={faShield} className={styles.formTopIcon} />
          <h2 className={styles.formTitle}>Tell us about your insurance</h2>
          <p className={styles.questionTitle}>What type of insurance do you have?</p>
          <div className={styles.optionsContainer}>
            <OptionsSelect
              selected={policyData.insuranceType}
              options={insuranceTypes}
              onChange={setInsuranceType}
              multipleSelect={false}
              errors={policyData.errors.insuranceType}
            />
          </div>
        </div>
      </FormBlock>
      {!!policyData.insuranceType && (
        <FormBlock isActive={true} className={styles.formSection}>
          {policyData.insuranceOptions.map((option, idx) => (
            <FormBlock isActive={true} key={idx}>
              <InsuranceOptions
                option={option}
                styles={styles}
                optionPos={idx}
                formData={policyData}
                insuranceType={policyData.insuranceType}
                handleChange={handleFormChange}
              />
            </FormBlock>
          ))}
          <AddOption
            rootClass={styles.addAnotherContainer}
            onClick={handleAddOption}
            optionName={`Add another ${policyData.insuranceType.toLowerCase()}`}
          />
        </FormBlock>
      )}
      <FormFooter
        onSubmit={onSubmit}
        canSubmit={false}
        onReturn={() => navigate('../')}
      />
    </div>
  );
};

Start.propTypes = {
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

export default Start;
