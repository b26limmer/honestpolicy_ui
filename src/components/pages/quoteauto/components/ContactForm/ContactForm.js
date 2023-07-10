import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLayout from '../FormLayout';
import FormBlock from '../../../../form/FormBlock';
import Input from '../FormInput';
import hpLogo from '../../../../../images/hpLogo.png';
import * as styles from './contact-form.module.scss';
import SecondaryLayout from '../SecondaryLayout';
import { useStaticQuery, graphql } from 'gatsby';
import { getStateNameFromCode } from '../../../../../utils/states';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-regular-svg-icons';
import Error from '../../../../error/Error';

const ContactForm = ({ handleChange, values, errors }) => {
  const {
    allAirtable: { nodes: coverageNodes },
  } = useStaticQuery(graphql`
    query getCoverageDetails {
      allAirtable(filter: { table: { eq: "Packages Coverages" } }) {
        nodes {
          data {
            State
            Package_Name
            Bodily_Injury
            Property_Damage
            Uninsured_Motorist
            Underinsured_Motorist
            Collision_Deductible
            Comprehensive_Deductible
            Towing
            Substitute_Transportation
            PIP__Not_Required_In_All_States_
          }
        }
      }
    }
  `);

  const [coverageDetails, setCoverageDetails] = useState({});
  const handleCoverageDetailsClick = coverageLevel => {
    coverageNodes.forEach(node => {
      let data = node.data;
      let packageName = data.Package_Name;
      let stateName = getStateNameFromCode(data.State);
      let stateOnQuote = values.garage_address_state || values.address_state;
      if (stateOnQuote === stateName && packageName === coverageLevel) {
        let bodilyInjury = data.Bodily_Injury;
        let collisionDeductible = data.Collision_Deductible;
        let comprehensiveDeductible = data.Comprehensive_Deductible;
        let pip = data.PIP__Not_Required_In_All_States_;
        let propertyDamage = data.Property_Damage;
        let substituteTransportation = data.Substitute_Transportation;
        let towing = data.Towing;
        let underInsuredMotorist = data.Underinsured_Motorist;
        let uninsuredMotorist = data.Uninsured_Motorist;
        setCoverageDetails({
          bodilyInjury,
          collisionDeductible,
          comprehensiveDeductible,
          pip,
          propertyDamage,
          substituteTransportation,
          towing,
          underInsuredMotorist,
          uninsuredMotorist,
          stateName,
          packageName,
        });
      }
    });
  };

  const returnReadableName = name => {
    let readableName;
    switch (name) {
      case 'bodilyInjury':
        readableName = 'Bodily Injury';
        break;
      case 'collisionDeductible':
        readableName = 'Collision Deductible';
        break;
      case 'comprehensiveDeductible':
        readableName = 'Comprehensive Deductible';
        break;
      case 'pip':
        readableName = 'PIP (Not Required In All States)';
        break;
      case 'propertyDamage':
        readableName = 'Property Damage';
        break;
      case 'substituteTransportation':
        readableName = 'Substitute Transportation';
        break;
      case 'towing':
        readableName = 'Towing';
        break;
      case 'underInsuredMotorist':
        readableName = 'UnderInsured Motorist';
        break;
      case 'uninsuredMotorist':
        readableName = 'Uninsured Motorist';
        break;
      default:
        break;
    }
    return readableName;
  };
  const agreementActive = !!values?.effectiveDate;
  return (
    <>
      <div className={styles.FormIntroText}>
        <div className={styles.Contacticon}>
          <img src={hpLogo} className={styles.hpLogo} alt="HonestPolicy Logo" />
        </div>
        <FormLayout className={styles.formLayout}>
          <div
            className={styles.formTitle}
          >{`How much protection are you looking for?`}</div>
          <p className={styles.questionText}>Choose your coverage level:</p>
          {!!Object.entries(coverageDetails).length && (
            <div className={styles.coverageDetailsContainer}>
              <button
                className={styles.closeIcon}
                onClick={e => {
                  e.stopPropagation();
                  e.preventDefault();
                  setCoverageDetails({});
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <table>
                <thead>
                  <tr>
                    <th>
                      {coverageDetails.packageName} coverage in{' '}
                      {coverageDetails.stateName}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(coverageDetails).map(
                    ([coverageName, coverageDetail], idx) =>
                      coverageName !== 'packageName' &&
                      coverageName !== 'stateName' && (
                        <tr key={idx}>
                          <td>{returnReadableName(coverageName)}</td>
                          <td>{coverageDetail || '-'}</td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
          )}
          <div className={styles.initialOptionsContainer}>
            <div className={styles.checkboxContainer}>
              <FormControlLabel
                className={styles.Coverageinputbox}
                control={
                  <Checkbox
                    color="default"
                    name="auto_coverage_level"
                    value="Minplus"
                    onClick={handleChange}
                    checked={values.auto_coverage_level === 'Minplus'}
                  />
                }
                label="Minplus"
              />
              <button
                title="Coverage Details"
                className={styles.coverageTooltip}
                onClick={() => handleCoverageDetailsClick('Minplus')}
              >
                i
              </button>
            </div>
            <div className={styles.checkboxContainer}>
              <FormControlLabel
                className={styles.Coverageinputbox}
                control={
                  <Checkbox
                    color="default"
                    name="auto_coverage_level"
                    value="Standard"
                    onClick={handleChange}
                    checked={values.auto_coverage_level === 'Standard'}
                  />
                }
                label="Standard"
              />
              <button
                title="Coverage Details"
                className={styles.coverageTooltip}
                onClick={() => handleCoverageDetailsClick('Standard')}
              >
                i
              </button>
            </div>
            <div className={styles.checkboxContainer}>
              <FormControlLabel
                className={styles.Coverageinputbox}
                control={
                  <Checkbox
                    color="default"
                    name="auto_coverage_level"
                    value="Premium"
                    onClick={handleChange}
                    checked={values.auto_coverage_level === 'Premium'}
                  />
                }
                label="Premium"
              />
              <button
                title="Coverage Details"
                className={styles.coverageTooltip}
                onClick={() => handleCoverageDetailsClick('Premium')}
              >
                i
              </button>
            </div>
          </div>
          {errors?.auto_coverage_level && (
            <p className={styles.error}>Please select a coverage option</p>
          )}
        </FormLayout>
      </div>
      {!!values.auto_coverage_level && (
        <SecondaryLayout title="Effective Date" className={styles.formBlockLayout}>
          <FormBlock isActive={true}>
            <Input
              hasError={errors.effectiveDate}
              onChange={handleChange}
              name="effectiveDate"
              type="date"
              value={values?.effectiveDate}
            />
          </FormBlock>
          <FormBlock isActive={agreementActive}>
            <div className={styles.agreementBox}>
              <Checkbox
                checked={values.contactAgreement}
                onChange={e =>
                  handleChange({
                    target: { name: 'contactAgreement', value: e.target.checked },
                  })
                }
                color="default"
              />
              <p className={styles.agreementText}>
                I consent to be contacted by an agent only after selecting a desired
                insurer on the upcoming quotes page
                <br />
                <Error error={errors.contactAgreement} />
              </p>
            </div>
          </FormBlock>
        </SecondaryLayout>
      )}
    </>
  );
};

ContactForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  isEdit: PropTypes.bool,
  handleChange: PropTypes.func,
};

export default ContactForm;
