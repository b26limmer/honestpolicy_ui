import React from 'react';
import PropTypes from 'prop-types';
import Input from '../FormInput/FormInput';
import FormLayout from '../../../../FormLayout';
import FormBlock from '../../../../form/FormBlock';
import Select from '../../../../FormSelect/FormSelect';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  ClaimDescriptions,
  CoverageDuration,
  PriorCarrierList,
  ReasonNoPriorClaim,
} from '../../data';
import * as styles from './Past-claims-form.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import OptionsSelect from '../../../../inputs/OptionsSelect/OptionsSelect';
import FormRow from '../../../../form/FormRow/FormRow';
import classNames from 'classnames';
import _ from 'lodash';
import FormButton from '../../../../quoteParts/FormButton/FormButton';
import steps from '../Steps';
import AutocompleteCarriers from '../../../../quoteParts/AutocompleteCarriers';

const PastClaimsForm = ({ values, errors, handleChange, handleBlur }) => {
  const initialOptions = [
    { name: 'Yes', value: false },
    { name: 'No', value: false },
  ];
  const handleInitialUpdatesChange = options => {
    let selected = options.filter(option => option.value == true)[0];
    let newValue = false;
    if (selected.name === 'Yes') {
      newValue = true;
    }
    handleChange({ target: { name: 'hasPreviousCoverage', value: newValue } });
  };
  const checkboxTrueFalseOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];

  const yearsWithPriorCarrierActive = !!values?.previousCoverageCarrier;
  const hadInsuranceCanceledActive =
    yearsWithPriorCarrierActive && !!values?.yearsWithPriorCarrier;
  const previousCoverageDurationActive =
    hadInsuranceCanceledActive && !!values?.hadInsuranceCanceled;
  const hadClaimedActive =
    previousCoverageDurationActive && !!values?.previousCoverageDuration;
  const dateBlockActive = idx => hadClaimedActive && !!values.lossInfo[idx]?.description;
  const claimAmountBlockActive = idx =>
    dateBlockActive(idx) && !!values.lossInfo[idx]?.dateOfIncident;
  const isCatastrophicActive = idx =>
    claimAmountBlockActive(idx) && !!values.lossInfo[idx]?.amount;
  const addOtherIncidentsActive = () =>
    !!values.lossInfo[values.lossInfo.length - 1].catLoss;

  const setNewInfoLoss = newLossInfo =>
    handleChange({ target: { name: 'lossInfo', value: newLossInfo } });
  const handleLossInfoChange = ({ target }, index) => {
    let newLossInfo = _.cloneDeep(values.lossInfo);
    newLossInfo[index][target.name] = target.value;
    setNewInfoLoss(newLossInfo);
  };
  const handleAddOtherIncident = () => {
    let newIncident = _.cloneDeep(steps[4].initialValues.lossInfo[0]);
    let newLossInfo = _.cloneDeep(values.lossInfo);
    newLossInfo.push(newIncident);
    setNewInfoLoss(newLossInfo);
  };

  return (
    <>
      <div className={styles.FormIntroText}>
        <div className={styles.FormIntroIcon}>
          <FontAwesomeIcon icon={faClock} size={'lg'} />
        </div>
        <FormLayout
          title={`Let’s review your coverage history.`}
          index={0}
          delay={0}
          className={styles.FormIntro}
        >
          <p className={styles.FormIntroMiniText}>Do you have prior home coverage?</p>
          <div className={styles.StateFieldWrapper}>
            <OptionsSelect
              options={initialOptions}
              onChange={v => handleInitialUpdatesChange(v)}
              selected={
                values?.hasPreviousCoverage !== undefined
                  ? values?.hasPreviousCoverage
                    ? 'Yes'
                    : 'No'
                  : ''
              }
              multipleSelect={false}
              errors={errors?.hasPreviousCoverage}
            />
          </div>
        </FormLayout>
      </div>
      {!!values?.hasPreviousCoverage && (
        <>
          <FormLayout title={'Previous Coverage'}>
            <FormBlock
              title={'Who did you have previous coverage with?'}
              isActive={true}
              delay="0s"
            >
              <AutocompleteCarriers
                values={values}
                carriers={PriorCarrierList}
                handleChange={handleChange}
                carrierPropertyToChange="previousCoverageCarrier"
                errors={errors}
              />
            </FormBlock>
            <FormBlock
              title={'How long were you with your previous carrier?'}
              isActive={yearsWithPriorCarrierActive}
              delay="0s"
            >
              <Select
                hasError={errors.yearsWithPriorCarrier}
                onChange={handleChange}
                name="yearsWithPriorCarrier"
                placeholder="Choose one..."
                value={values?.yearsWithPriorCarrier || ''}
                options={CoverageDuration.map(year => {
                  return { value: year, text: year };
                })}
              />
            </FormBlock>
            <FormBlock
              title={'Have you ever had your insurance canceled or let it lapse?'}
              isActive={hadInsuranceCanceledActive}
              delay="0s"
            >
              <div className={styles.CheckboxGroup}>
                {checkboxTrueFalseOptions.map(({ label, value }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="medium"
                        color="default"
                        name="hadInsuranceCanceled"
                        onChange={handleChange}
                        value={value}
                        checked={values?.hadInsuranceCanceled == value}
                      />
                    }
                    className={classNames(
                      styles.formCheckboxBlock,
                      errors.hadInsuranceCanceled ? styles.formCheckboxError : ''
                    )}
                    label={label}
                    key={label}
                  />
                ))}
              </div>
            </FormBlock>
            <FormBlock
              title={'How long have you kept continuous coverage?'}
              isActive={previousCoverageDurationActive}
              delay="0s"
            >
              <Select
                hasError={errors.previousCoverageDuration}
                onChange={handleChange}
                name="previousCoverageDuration"
                placeholder="Choose one..."
                value={values?.previousCoverageDuration || ''}
                options={CoverageDuration.map(year => {
                  return { value: year, text: year };
                })}
              />
            </FormBlock>
          </FormLayout>
          {!!hadClaimedActive && (
            <FormLayout title={'Past Claims'}>
              <FormBlock
                title={'Have you had to make a claim in the last 5 years?'}
                isActive={hadClaimedActive}
                delay="0s"
              >
                <div className={styles.CheckboxGroup}>
                  {checkboxTrueFalseOptions.map(({ label, value }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="medium"
                          color="default"
                          name="hadClaimed"
                          onChange={handleChange}
                          value={value}
                          checked={values?.hadClaimed == value}
                        />
                      }
                      className={classNames(
                        styles.formCheckboxBlock,
                        errors.hadClaimed ? styles.formCheckboxError : ''
                      )}
                      label={label}
                      key={label}
                    />
                  ))}
                </div>
              </FormBlock>
              {values?.hadClaimed === 'Yes' &&
                values.lossInfo.map((lossInfo, idx) => (
                  <React.Fragment key={idx}>
                    <FormBlock
                      title={`What type of incident was it?`}
                      rightSideChildren={`Incident ${idx + 1}/${values.lossInfo.length}`}
                      isActive={true}
                      delay="0s"
                      key={idx}
                    >
                      <Select
                        hasError={errors.description}
                        onChange={e => handleLossInfoChange(e, idx)}
                        name="description"
                        placeholder="Choose one..."
                        value={lossInfo?.description || ''}
                        options={ClaimDescriptions.map(year => {
                          return { value: year, text: year };
                        })}
                      />
                    </FormBlock>
                    <FormBlock
                      title={'Claim date'}
                      isActive={dateBlockActive(idx)}
                      delay="0s"
                    >
                      <Input
                        hasError={errors.dateOfIncident}
                        onChange={e => handleLossInfoChange(e, idx)}
                        onBlur={handleBlur}
                        name="dateOfIncident"
                        type="date"
                        value={lossInfo?.dateOfIncident}
                      />
                    </FormBlock>
                    <FormBlock
                      title={'Claim Amount'}
                      isActive={claimAmountBlockActive(idx)}
                      delay="0s"
                    >
                      <FormRow>
                        <Input
                          hasError={errors.amount}
                          onChange={e => handleLossInfoChange(e, idx)}
                          onBlur={handleBlur}
                          name="amount"
                          placeholder="Total claim amount"
                          type={'number'}
                          value={lossInfo?.amount}
                        />
                      </FormRow>
                    </FormBlock>
                    <FormBlock
                      title={
                        'Was it part of a catastrophic event (Like a flood or hurricane)?'
                      }
                      isActive={isCatastrophicActive(idx)}
                      delay="0s"
                    >
                      <div className={styles.CheckboxGroup}>
                        {checkboxTrueFalseOptions.map(({ label, value }) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                size="medium"
                                color="default"
                                name="catLoss"
                                onChange={e => handleLossInfoChange(e, idx)}
                                value={value}
                                checked={lossInfo?.catLoss == value}
                              />
                            }
                            className={classNames(
                              styles.formCheckboxBlock,
                              errors.catLoss ? styles.formCheckboxError : ''
                            )}
                            label={label}
                            key={label}
                          />
                        ))}
                      </div>
                    </FormBlock>
                  </React.Fragment>
                ))}
              <FormBlock
                title={'Did you have any other incidents?'}
                isActive={addOtherIncidentsActive()}
                delay="0s"
              >
                <FormButton onClick={handleAddOtherIncident} isOutline>
                  Add other incident
                </FormButton>
              </FormBlock>
            </FormLayout>
          )}
        </>
      )}
      {values?.hasPreviousCoverage !== undefined && !values?.hasPreviousCoverage && (
        <FormLayout title={'About your home'}>
          <FormBlock
            isActive={true}
            delay="0s"
            title={'Why did you not have prior coverage?'}
          >
            <Select
              hasError={errors.reasonToNotHavePreviousCoverage}
              onChange={handleChange}
              name="reasonToNotHavePreviousCoverage"
              placeholder="Choose one..."
              value={values?.reasonToNotHavePreviousCoverage || ''}
              options={ReasonNoPriorClaim}
            />
          </FormBlock>
        </FormLayout>
      )}
    </>
  );
};
PastClaimsForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
};

export default PastClaimsForm;
