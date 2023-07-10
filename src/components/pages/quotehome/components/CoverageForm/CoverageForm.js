import React from 'react';
import PropTypes from 'prop-types';
import FormLayout from '../../../../FormLayout';
import FormBlock from '../../../../form/FormBlock';
import Input from '../FormInput/FormInput';
import Select from '../../../../FormSelect/FormSelect';
import {
  MedicalPayments,
  PersonalLiabilities,
  Deductibles,
  HurricaneDeductibles,
  NumberOfChildren,
  DistanceFromCoastLine,
} from '../../data';
import * as styles from './Coverage-form.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShield } from '@fortawesome/pro-regular-svg-icons';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import classNames from 'classnames';
import { capitalizeFirst } from '../../../../../utils/validation';

const CoverageForm = ({ values, errors, handleChange, handleBlur }) => {
  const checkboxTrueFalseOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];
  const coverageOptionsSectionActive = !!values?.effective;
  const homeReplaceCostActive = true;
  const medicalCoverageNeedActive = homeReplaceCostActive && !!values?.homeReplaceCost;
  const costToReplacePersonalPropertyActive =
    medicalCoverageNeedActive &&
    (values?.needsMedicalCoverage === 'No' ||
      (values?.needsMedicalCoverage === 'Yes' && !!values?.medicalCoverageNeed));
  const liabilityCoverageNeedActive =
    costToReplacePersonalPropertyActive &&
    (values?.needsReplacePersonalProperty === 'No' ||
      (values?.needsReplacePersonalProperty === 'Yes' &&
        !!values?.costToReplacePersonalProperty));
  const deductibleSectionActive =
    liabilityCoverageNeedActive &&
    (values?.needsLiabilityCoverageNeed == 'No' ||
      (values?.needsLiabilityCoverageNeed == 'Yes' && !!values?.liabilityCoverageNeed));
  const deductibleActive = true;
  const hurricaneDeductibleActive = deductibleActive && !!values?.deductible;
  const homeDistanceFromCoastActive =
    hurricaneDeductibleActive &&
    (values?.needsHurricaneDeductible === 'No' ||
      (values?.needsHurricaneDeductible === 'Yes' && !!values?.hurricaneDeductible));
  const totalChildrenActive = homeDistanceFromCoastActive;
  return (
    <>
      <div className={styles.FormIntroText}>
        <div className={styles.FormIntroIcon}>
          <FontAwesomeIcon icon={faShield} size={'lg'} />
        </div>
        <FormLayout
          title={`Choose the coverage you need.`}
          index={0}
          delay={0}
          className={styles.FormIntro}
        >
          <p className={styles.FormIntroMiniText}>
            When do you want your new policy to become effective?
          </p>
          <Input
            rootClassName={styles.effectiveDate}
            hasError={errors.effective}
            onChange={handleChange}
            onBlur={handleBlur}
            name="effective"
            type="date"
            value={values?.effective}
          />
        </FormLayout>
      </div>
      {coverageOptionsSectionActive && (
        <FormLayout title={'Coverage Options'}>
          <FormBlock
            title={'How much would it cost to replace your home?'}
            helpText="We roughly estimate this coverage by multiplying your square footage by an average of $250 per square foot, but this varies widely depending on house features and geography."
            isActive={homeReplaceCostActive}
            delay="0s"
          >
            <Input
              hasError={errors.homeReplaceCost}
              onChange={handleChange}
              name="homeReplaceCost"
              type={'number'}
              min={0}
              value={values?.homeReplaceCost || values.homeArea * 250}
              onBlur={handleBlur}
            />
          </FormBlock>
          <FormBlock
            title={'Do you need medical coverage?'}
            isActive={medicalCoverageNeedActive}
            delay="0s"
          >
            <div className={styles.CheckboxGroup}>
              {checkboxTrueFalseOptions.map(({ label, value }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      size="medium"
                      color="default"
                      name="needsMedicalCoverage"
                      onChange={handleChange}
                      value={value}
                      checked={values?.needsMedicalCoverage == value}
                    />
                  }
                  className={classNames(
                    styles.formCheckboxBlock,
                    errors.needsMedicalCoverage ? styles.formCheckboxError : ''
                  )}
                  label={label}
                  key={label}
                />
              ))}
            </div>
            {values?.needsMedicalCoverage === 'Yes' && (
              <FormBlock
                title={'How much medical coverage do you need?'}
                isActive={medicalCoverageNeedActive}
                delay="0s"
              >
                <Select
                  hasError={errors.medicalCoverageNeed}
                  onChange={handleChange}
                  name="medicalCoverageNeed"
                  placeholder="Select"
                  value={values?.medicalCoverageNeed}
                  options={MedicalPayments.map(item => {
                    return {
                      value: item,
                      text: item,
                    };
                  })}
                />
              </FormBlock>
            )}
          </FormBlock>
          <FormBlock
            title={'Do you want to cover your personal property?'}
            isActive={costToReplacePersonalPropertyActive}
            delay="0s"
          >
            <div className={styles.CheckboxGroup}>
              {checkboxTrueFalseOptions.map(({ label, value }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      size="medium"
                      color="default"
                      name="needsReplacePersonalProperty"
                      onChange={handleChange}
                      value={value}
                      checked={values?.needsReplacePersonalProperty == value}
                    />
                  }
                  className={classNames(
                    styles.formCheckboxBlock,
                    errors.needsReplacePersonalProperty ? styles.formCheckboxError : ''
                  )}
                  label={label}
                  key={label}
                />
              ))}
            </div>
            {values?.needsReplacePersonalProperty === 'Yes' && (
              <FormBlock
                title={
                  'How much would it cost to replace personal property in your home?'
                }
                isActive={costToReplacePersonalPropertyActive}
                delay="0s"
              >
                <Input
                  hasError={errors.costToReplacePersonalProperty}
                  onChange={handleChange}
                  name="costToReplacePersonalProperty"
                  type={'number'}
                  min={0}
                  onBlur={handleBlur}
                  value={values?.costToReplacePersonalProperty}
                />
              </FormBlock>
            )}
          </FormBlock>
          <FormBlock
            title={'Do you need personal liability coverage?'}
            isActive={liabilityCoverageNeedActive}
            delay="0s"
          >
            <div className={styles.CheckboxGroup}>
              {checkboxTrueFalseOptions.map(({ label, value }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      size="medium"
                      color="default"
                      name="needsLiabilityCoverageNeed"
                      onChange={handleChange}
                      value={value}
                      checked={values?.needsLiabilityCoverageNeed == value}
                    />
                  }
                  className={classNames(
                    styles.formCheckboxBlock,
                    errors.needsLiabilityCoverageNeed ? styles.formCheckboxError : ''
                  )}
                  label={label}
                  key={label}
                />
              ))}
            </div>
            {values?.needsLiabilityCoverageNeed === 'Yes' && (
              <FormBlock
                title={'How much personal liability coverage do you need?'}
                isActive={liabilityCoverageNeedActive}
                delay="0s"
              >
                <Select
                  hasError={errors.liabilityCoverageNeed}
                  onChange={handleChange}
                  name="liabilityCoverageNeed"
                  placeholder="Select"
                  value={values?.liabilityCoverageNeed}
                  options={PersonalLiabilities.map(item => {
                    return {
                      value: item,
                      text: item,
                    };
                  })}
                />
              </FormBlock>
            )}
          </FormBlock>
        </FormLayout>
      )}
      {deductibleSectionActive && (
        <FormLayout title={'Deductibles'}>
          <FormBlock
            title={'What do you want your deductible to be?'}
            isActive={deductibleActive}
            delay="0s"
          >
            <Select
              hasError={errors.deductible}
              onChange={handleChange}
              name="deductible"
              placeholder="Select"
              value={values?.deductible}
              options={Deductibles.map(item => {
                return {
                  value: item,
                  text: item,
                };
              })}
            />
          </FormBlock>
          <FormBlock
            title={'Do you need hurricane coverage?'}
            isActive={hurricaneDeductibleActive}
            delay="0s"
          >
            <div className={styles.CheckboxGroup}>
              {checkboxTrueFalseOptions.map(({ label, value }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      size="medium"
                      color="default"
                      name="needsHurricaneDeductible"
                      onChange={handleChange}
                      value={value}
                      checked={values?.needsHurricaneDeductible == value}
                    />
                  }
                  className={styles.formCheckboxBlock}
                  label={label}
                  key={label}
                />
              ))}
            </div>
            {values?.needsHurricaneDeductible === 'Yes' && (
              <FormBlock
                title={'What deductible do you need for hurricane coverage?'}
                isActive={hurricaneDeductibleActive}
                delay="0s"
              >
                <Select
                  hasError={errors.hurricaneDeductible}
                  onChange={handleChange}
                  name="hurricaneDeductible"
                  placeholder="Select"
                  value={values?.hurricaneDeductible}
                  options={HurricaneDeductibles.map(item => {
                    return {
                      value: item,
                      text: item,
                    };
                  })}
                />
              </FormBlock>
            )}
          </FormBlock>
          <FormBlock
            title={'How far is your home from the coast?'}
            isActive={homeDistanceFromCoastActive}
            delay="0s"
          >
            <Select
              hasError={errors.homeDistanceFromCoast}
              onChange={handleChange}
              name="homeDistanceFromCoast"
              placeholder="Select"
              value={values?.homeDistanceFromCoast}
              options={DistanceFromCoastLine.map(item => {
                return {
                  value: item,
                  text: item,
                };
              })}
            />
          </FormBlock>
          <FormBlock
            title={'How many children are in your home?'}
            isActive={totalChildrenActive}
            delay="0s"
          >
            <Select
              hasError={errors.totalChildren}
              onChange={handleChange}
              name="totalChildren"
              placeholder="Select"
              value={values?.totalChildren}
              options={NumberOfChildren.map(option => {
                return {
                  value: option,
                  text: capitalizeFirst(option),
                };
              })}
            />
          </FormBlock>
        </FormLayout>
      )}
    </>
  );
};

CoverageForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
};

export default CoverageForm;
