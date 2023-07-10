import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import FormLayout from '../FormLayout';
import FormBlock from '../../../../form/FormBlock';
import Select from '../../../../FormSelect';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  currentCarriers,
  durations,
  WhyNoInsurance,
  PriorLiabilityLimits,
} from '../../data';
import * as styles from './coverage-form.module.scss';
import Error from '../../../../error/Error';
import AutocompleteCarriers from '../../../../quoteParts/AutocompleteCarriers';

const CoverageForm = ({ handleChange, values, errors }) => {
  const priorLiabilityActive = !!values.current_carrier;
  const timeBlockActive = priorLiabilityActive && !!values.prior_liability;
  const continuousCoverageBlockActive =
    timeBlockActive && !!values.current_carrier_length;
  const healthCoverActive =
    timeBlockActive && (!!values.current_carrier_length || !!values.why_no_insurance);
  const { currently_insured, current_carrier } = values;
  useEffect(() => {
    if (currently_insured == 'No' && current_carrier !== 'No Prior Insurance') {
      handleChange({ target: { name: 'current_carrier', value: 'No Prior Insurance' } });
    } else if (currently_insured == 'Yes' && current_carrier === 'No Prior Insurance') {
      handleChange({ target: { name: 'current_carrier', value: '' } });
    }
  }, [currently_insured]);

  return (
    <>
      <div className={styles.FormIntroText}>
        <div className={styles.FormIntroIcon}>
          <FontAwesomeIcon icon={faShieldAlt} />
        </div>
        <FormLayout
          title={`Lets get you rates in ${values.address_state}!`}
          index={0}
          delay={0}
          className={styles.Coverageohio}
        >
          <p className={styles.Coverageminitext}>Are you currently insured?</p>
          <FormControlLabel
            control={
              <Checkbox
                color="default"
                name="currently_insured"
                value="Yes"
                onClick={handleChange}
                checked={values.currently_insured === 'Yes'}
              />
            }
            label="Yes"
            className={styles.Coverageinputbox}
          />
          <FormControlLabel
            control={
              <Checkbox
                color="default"
                checked={values.currently_insured === 'No'}
                name="currently_insured"
                value="No"
                onClick={handleChange}
              />
            }
            label="No"
            className={styles.Coverageinputbox}
          />
        </FormLayout>
      </div>
      {values.currently_insured === 'Yes' ? (
        <FormLayout title={`Current Carrier`} fontSmall className={styles.CoverageForm}>
          <FormBlock isActive={true}>
            <div className={styles.Coveragecheck}>Who is your current carrier?</div>
            <AutocompleteCarriers
              values={values}
              carriers={currentCarriers}
              handleChange={handleChange}
              carrierPropertyToChange="current_carrier"
              errors={errors}
            />
          </FormBlock>
          <FormBlock isActive={priorLiabilityActive}>
            <div className={styles.Coveragecheck}>
              What is your current amount of liability coverage?
            </div>
            <Select
              hasError={errors.prior_liability}
              onChange={handleChange}
              name="prior_liability"
              placeholder="Coverage Level"
              value={values.prior_liability}
              options={PriorLiabilityLimits.map(({ text, value }) => ({ text, value }))}
            />
          </FormBlock>
          <FormBlock isActive={timeBlockActive} delay="0.4s">
            <div className={styles.Coveragecheck}>
              {`How long have you been with ${values.current_carrier || 'your carrier'}?`}
            </div>
            <Select
              hasError={errors.current_carrier_length}
              onChange={handleChange}
              name="current_carrier_length"
              placeholder="Duration"
              value={values.current_carrier_length}
              options={durations.map(item => ({ value: item, text: item }))}
            />
          </FormBlock>
          <FormBlock isActive={continuousCoverageBlockActive} delay="0.4s">
            <div className={styles.Coveragecheck}>
              How long have you kept continuous coverage?
            </div>
            <Select
              hasError={errors.continuous_coverage}
              onChange={handleChange}
              name="continuous_coverage"
              placeholder="Duration"
              value={values.continuous_coverage}
              options={durations.map(item => ({ value: item, text: item }))}
            />
          </FormBlock>
        </FormLayout>
      ) : (
        values.currently_insured === 'No' && (
          <FormLayout fontSmall className={styles.CoverageForm}>
            <FormBlock isActive={true}>
              <div className={styles.Coveragecheck}>
                Why do you not currently have insurance?
              </div>
              <Select
                hasError={errors.why_no_insurance}
                onChange={handleChange}
                placeholder="Please select an option"
                name="why_no_insurance"
                value={values.why_no_insurance}
                options={[...WhyNoInsurance.map(item => ({ value: item, text: item }))]}
              />
            </FormBlock>
          </FormLayout>
        )
      )}
      {!!values.currently_insured && values.address_state === 'New Jersey' && (
        <FormLayout title={`Special Coverage`} fontSmall className={styles.CoverageForm}>
          {
            <FormBlock
              title="Health cover accident NJ (Only for New Jersey)"
              isActive={healthCoverActive}
              delay="0.6s"
            >
              <div className={styles.checkboxGroup}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="default"
                      name="health_cover_accident_inj"
                      value="Yes"
                      onClick={handleChange}
                      checked={values.health_cover_accident_inj == 'Yes'}
                    />
                  }
                  label="Yes"
                  className={styles.InputSmall}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color="default"
                      name="health_cover_accident_inj"
                      value="No"
                      onClick={handleChange}
                      checked={values.health_cover_accident_inj == 'No'}
                    />
                  }
                  label="No"
                  className={styles.InputSmall}
                />
              </div>
              <Error error={errors.health_cover_accident_inj} />
            </FormBlock>
          }
        </FormLayout>
      )}
    </>
  );
};

CoverageForm.propTypes = {
  first_name: PropTypes.string,
  values: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
};

export default CoverageForm;
