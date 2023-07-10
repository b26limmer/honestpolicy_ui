import React from 'react';
import PropTypes from 'prop-types';
import FormLayout from '../../../../FormLayout';
import FormBlock from '../../../../form/FormBlock';
import Select from '../../../../FormSelect/FormSelect';
import * as styles from './Roof-info-form.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChimney } from '@fortawesome/pro-regular-svg-icons';
import OptionsSelect from '../../../../inputs/OptionsSelect/OptionsSelect';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { getYearsToDateArray } from '../../data';
import Error from '../../../../error/Error';
import classNames from 'classnames';

const RoofInfoForm = ({ values, errors, handleChange, handleBlur }) => {
  const initialUpdatesBlockActive = !!values?.propertyUpdates;
  const initialUpdatesOptions = [
    { name: 'Yes', value: false },
    { name: 'No', value: false },
  ];
  const hasCircuitBreakerOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];
  const updateOptions = [
    { label: 'Completely', value: 'COMPLETE UPDATE' },
    { label: 'Partial Update', value: 'PARTIAL UPDATE' },
  ];
  const handleInitialUpdatesChange = options => {
    let selected = options.filter(option => option.value == true)[0];
    let value = false;
    if (selected.name === 'Yes') {
      value = true;
    }
    handleChange({ target: { name: 'propertyUpdates', value: value } });
  };
  const handleInfoChange = (name, value) => {
    let info = { target: { name: name, value: value } };
    handleChange(info);
    handleBlur(info);
  };

  let howMuchUpdatedTitle = 'How much have you updated?';

  return (
    <>
      <div className={styles.FormIntroText}>
        <div className={styles.FormIntroIcon}>
          <FontAwesomeIcon icon={faChimney} size={'lg'} />
        </div>
        <FormLayout
          title={`Let's review updates.`}
          index={0}
          delay={0}
          className={styles.FormIntro}
        >
          <p className={styles.FormIntroMiniText}>
            Have you made updates to the property?
          </p>
          <div className={styles.StateFieldWrapper}>
            <OptionsSelect
              options={initialUpdatesOptions}
              onChange={v => handleInitialUpdatesChange(v)}
              selected={
                values?.propertyUpdates !== undefined
                  ? values?.propertyUpdates
                    ? 'Yes'
                    : 'No'
                  : ''
              }
              multipleSelect={false}
              errors={errors?.propertyUpdates}
            />
          </div>
        </FormLayout>
      </div>
      {initialUpdatesBlockActive && (
        <FormLayout title={'About the updates'}>
          <FormBlock title={'What updates have you made?'} isActive delay="0s">
            <OptionsSelect
              hideErrorMessage
              options={[
                {
                  name: 'Roof',
                  value: values?.hasUpdatedRoof,
                },
              ]}
              onChange={option => handleInfoChange('hasUpdatedRoof', option[0].value)}
              multipleSelect={false}
              errors={errors?.hasUpdatedRoof}
            />
            {!!values?.hasUpdatedRoof && (
              <div className={styles.optionsContainer}>
                <FormBlock
                  title={howMuchUpdatedTitle}
                  isActive={!!values?.hasUpdatedRoof}
                  delay="0s"
                  rootClassName={styles.roofInfoBlockChild}
                >
                  <div className={styles.CheckboxGroup}>
                    {updateOptions.map(({ label, value }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="medium"
                            color="default"
                            name="roofUpdate"
                            onChange={handleChange}
                            value={value}
                            checked={values?.roofUpdate == value}
                          />
                        }
                        className={classNames(
                          styles.formCheckboxBlock,
                          errors?.roofUpdate ? styles.formCheckboxError : ''
                        )}
                        label={label}
                        key={label}
                      />
                    ))}
                  </div>
                  <Error error={errors?.roofUpdate} />
                </FormBlock>
                <FormBlock
                  title={'What year did you update your roof?'}
                  isActive={!!values?.roofUpdate}
                  delay="0s"
                  rootClassName={styles.roofInfoBlockChild}
                >
                  <Select
                    hasError={errors.roofUpdateYear}
                    onChange={handleChange}
                    name="roofUpdateYear"
                    placeholder="Choose one..."
                    value={values?.roofUpdateYear || ''}
                    options={getYearsToDateArray().map(year => {
                      return { value: year, text: year };
                    })}
                  />
                </FormBlock>
              </div>
            )}
            <OptionsSelect
              hideErrorMessage
              options={[
                {
                  name: 'Plumbing',
                  value: values?.hasUpdatedPlumbing,
                },
              ]}
              onChange={option => handleInfoChange('hasUpdatedPlumbing', option[0].value)}
              multipleSelect={false}
              errors={errors?.hasUpdatedPlumbing}
            />
            {!!values?.hasUpdatedPlumbing && (
              <div className={styles.optionsContainer}>
                <FormBlock
                  title={howMuchUpdatedTitle}
                  isActive={!!values?.hasUpdatedPlumbing}
                  delay="0s"
                  rootClassName={styles.roofInfoBlockChild}
                >
                  <div className={styles.CheckboxGroup}>
                    {updateOptions.map(({ label, value }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="medium"
                            color="default"
                            name="plumbingUpdate"
                            onChange={handleChange}
                            value={value}
                            checked={values?.plumbingUpdate == value}
                          />
                        }
                        className={classNames(
                          styles.formCheckboxBlock,
                          errors?.plumbingUpdate ? styles.formCheckboxError : ''
                        )}
                        label={label}
                        key={label}
                      />
                    ))}
                  </div>
                </FormBlock>
                <FormBlock
                  title={'What year did you update your plumbing?'}
                  isActive={!!values?.plumbingUpdate}
                  delay="0s"
                  rootClassName={styles.roofInfoBlockChild}
                >
                  <Select
                    hasError={errors.plumbingUpdateYear}
                    onChange={handleChange}
                    name="plumbingUpdateYear"
                    placeholder="Choose one..."
                    value={values?.plumbingUpdateYear || ''}
                    options={getYearsToDateArray().map(year => {
                      return { value: year, text: year };
                    })}
                  />
                </FormBlock>
              </div>
            )}
            <OptionsSelect
              hideErrorMessage
              options={[
                {
                  name: 'Electrical',
                  value: values?.hasUpdatedElectrical,
                },
              ]}
              onChange={option =>
                handleInfoChange('hasUpdatedElectrical', option[0].value)
              }
              multipleSelect={false}
              errors={errors?.hasUpdatedElectrical}
            />
            {!!values?.hasUpdatedElectrical && (
              <div className={styles.optionsContainer}>
                <FormBlock
                  title={howMuchUpdatedTitle}
                  isActive={!!values?.hasUpdatedElectrical}
                  delay="0s"
                  rootClassName={styles.roofInfoBlockChild}
                >
                  <div className={styles.CheckboxGroup}>
                    {updateOptions.map(({ label, value }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="medium"
                            color="default"
                            name="electricalUpdate"
                            onChange={handleChange}
                            value={value}
                            checked={values?.electricalUpdate == value}
                          />
                        }
                        className={classNames(
                          styles.formCheckboxBlock,
                          errors?.electricalUpdate ? styles.formCheckboxError : ''
                        )}
                        label={label}
                        key={label}
                      />
                    ))}
                  </div>
                </FormBlock>
                <FormBlock
                  title={'What year did you update your electrical?'}
                  isActive={!!values?.electricalUpdate}
                  delay="0s"
                  rootClassName={styles.roofInfoBlockChild}
                >
                  <Select
                    hasError={errors.electricalUpdateYear}
                    onChange={handleChange}
                    name="electricalUpdateYear"
                    placeholder="Choose one..."
                    value={values?.electricalUpdateYear || ''}
                    options={getYearsToDateArray().map(year => {
                      return { value: year, text: year };
                    })}
                  />
                </FormBlock>
              </div>
            )}
            <OptionsSelect
              hideErrorMessage
              options={[
                {
                  name: 'Heating',
                  value: values?.hasUpdatedHeatingSystem,
                },
              ]}
              onChange={option =>
                handleInfoChange('hasUpdatedHeatingSystem', option[0].value)
              }
              multipleSelect={false}
              errors={errors.hasUpdatedHeatingSystem}
            />
            {!!values?.hasUpdatedHeatingSystem && (
              <div className={styles.optionsContainer}>
                <FormBlock
                  title={howMuchUpdatedTitle}
                  isActive={!!values?.hasUpdatedHeatingSystem}
                  delay="0s"
                  rootClassName={styles.roofInfoBlockChild}
                >
                  <div className={styles.CheckboxGroup}>
                    {updateOptions.map(({ label, value }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="medium"
                            color="default"
                            name="heatingSystemUpdate"
                            onChange={handleChange}
                            value={value}
                            checked={values?.heatingSystemUpdate == value}
                          />
                        }
                        className={classNames(
                          styles.formCheckboxBlock,
                          errors?.heatingSystemUpdate ? styles.formCheckboxError : ''
                        )}
                        label={label}
                        key={label}
                      />
                    ))}
                  </div>
                </FormBlock>
                <FormBlock
                  title={'What year did you update your heating?'}
                  isActive={!!values?.heatingSystemUpdate}
                  delay="0s"
                  rootClassName={styles.roofInfoBlockChild}
                >
                  <Select
                    hasError={errors.heatingSystemUpdateYear}
                    onChange={handleChange}
                    name="heatingSystemUpdateYear"
                    placeholder="Choose one..."
                    value={values?.heatingSystemUpdateYear || ''}
                    options={getYearsToDateArray().map(year => {
                      return { value: year, text: year };
                    })}
                  />
                </FormBlock>
              </div>
            )}
          </FormBlock>
          <FormBlock
            title={'Does your home have a circuit breaker?'}
            isActive={true}
            delay="0s"
            rootClassName={styles.roofInfoBlockChild}
          >
            <div className={styles.CheckboxGroup}>
              {hasCircuitBreakerOptions.map(({ label, value }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      size="medium"
                      color="default"
                      name="hasCircuitBreaker"
                      onChange={handleChange}
                      value={value}
                      checked={values?.hasCircuitBreaker == value}
                    />
                  }
                  className={classNames(
                    styles.formCheckboxBlock,
                    errors.hasCircuitBreaker ? styles.formCheckboxError : ''
                  )}
                  label={label}
                  key={label}
                />
              ))}
            </div>
            <Error error={errors.hasCircuitBreaker} />
          </FormBlock>
        </FormLayout>
      )}
    </>
  );
};

RoofInfoForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
};

export default RoofInfoForm;
