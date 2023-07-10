import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SEO from '../../../../../../../layout/seo';
import * as styles from './addons.module.scss';
import FormFooter from '../FormFooter/FormFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStars } from '@fortawesome/pro-regular-svg-icons';
import OptionsSelect from '../../../../../../../inputs/OptionsSelect/OptionsSelect';
import { useStaticQuery } from 'gatsby';
import { graphql } from 'gatsby';
import { navigate } from '@reach/router';
import FormBlock from '../../../../../../../form/FormBlock/FormBlock';
import InfoText from '../../../../../../../InfoText/InfoText';

const Addons = ({
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
  const {
    allAirtable: { nodes: addonsNodes },
  } = useStaticQuery(graphql`
    query getAddons {
      allAirtable(
        filter: { table: { eq: "Coverage Descriptions" } }
        sort: { fields: data___Coverage_Name, order: ASC }
      ) {
        nodes {
          recordId
          data {
            Coverage_Name
            Coverage_Description
            Line_of_Business
            Coverage_Type
          }
        }
      }
    }
  `);
  const routeBaseValidationCompleted = useRouteBaseValidation(
    validateForms,
    routeIdx,
    setPercentageCompleted,
    formSteps,
    setFormSteps,
    updateBreadcrumbs
  );
  let insuranceType =
    policyData.insuranceType === 'Vehicle'
      ? 'auto'
      : policyData.insuranceType === 'Property'
      ? 'home'
      : 'personal';

  useEffect(() => {
    if (routeBaseValidationCompleted && !policyData.addons.length) {
      let newAddons = [];
      addonsNodes.forEach(node => {
        let coverageData = node.data;
        let coverageName = coverageData.Coverage_Name.split('_').join(' ');
        let lineOfBusiness = coverageData.Line_of_Business.toLowerCase();
        coverageData.Coverage_Type === 'Optional' &&
          lineOfBusiness === insuranceType &&
          newAddons.push({
            id: node.recordId,
            name: coverageName,
            helpText: coverageData.Coverage_Description,
            coverageType: coverageData.Coverage_Type,
            lineOfBusiness: lineOfBusiness,
            value: false,
          });
      });
      handleFormChange([{ name: 'addons', value: newAddons }]);
    }
  }, [routeBaseValidationCompleted, addonsNodes]);
  const additionalCoverageOptions = [
    { name: 'Yes', value: false },
    { name: 'No', value: false },
  ];
  const handleAdditionalCoverageChange = options => {
    let selected = options.filter(option => option.value == true)[0];
    if (selected.name === 'Yes') {
      handleFormChange([{ name: 'hasAdditionalAddons', value: true }]);
    } else {
      handleFormChange([{ name: 'hasAdditionalAddons', value: false }]);
    }
  };
  const handleAddOption = () => {
    let prev = policyData.addons;
    let newCustomOption = {
      id: '',
      name: '',
      helpText: '',
      coverageType: 'Optional',
      lineOfBusiness: insuranceType,
      value: true,
      isCustomOption: true,
    };
    prev = [...prev, newCustomOption];
    handleFormChange([{ name: 'addons', value: prev }]);
  };
  return (
    <>
      <SEO title="Addons" />
      <FormBlock isActive={true} rootClassName={styles.initialContainer}>
        <div className={styles.initialContainer}>
          <FontAwesomeIcon icon={faStars} className={styles.formTopIcon} />
          <h2 className={styles.formTitle}>Let’s include your addons.</h2>
          <p className={styles.questionTitle}>
            Do you have additional coverage?
            <InfoText
              helpText="Many insurers offer additional addons for specific use-cases. Common ones include roadside assistance, GAP coverage, and rideshare insurance."
              className={styles.tooltip}
            />
          </p>
          <div className={styles.optionsContainer}>
            <OptionsSelect
              options={additionalCoverageOptions}
              onChange={v => handleAdditionalCoverageChange(v)}
              selected={
                policyData.hasAdditionalAddons === undefined
                  ? ''
                  : policyData.hasAdditionalAddons === true
                  ? 'Yes'
                  : 'No'
              }
              multipleSelect={false}
              errors={policyData.errors.hasAdditionalAddons}
            />
          </div>
        </div>
      </FormBlock>
      {policyData.hasAdditionalAddons && (
        <div className={styles.formSection}>
          <FormBlock rootClassName={styles.questionBlock} isActive={true} block="start">
            <h3 className={styles.formSectionTitle}>Additional Coverage</h3>
            <OptionsSelect
              options={policyData.addons}
              canAddEditableOption={true}
              handleAddOption={handleAddOption}
              onChange={changedOptions =>
                handleFormChange([{ name: 'addons', value: changedOptions }])
              }
              multipleSelect={true}
              errors={policyData.errors.addons}
              addOptionButtonText="Add special addon"
            />
          </FormBlock>
        </div>
      )}
      <FormFooter
        returnButtonText="Back"
        onReturn={() => navigate('./details')}
        onSubmit={onSubmit}
        canSubmit={false}
      />
    </>
  );
};

Addons.propTypes = {
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

export default Addons;
