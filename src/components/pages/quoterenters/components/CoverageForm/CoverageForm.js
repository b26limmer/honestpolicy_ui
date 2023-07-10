import React from 'react';
import PropTypes from 'prop-types';
import * as styles from '../../quote-renters.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormLayout from '../../../../FormLayout';
import { faShield } from '@fortawesome/pro-regular-svg-icons';
import FormInput from '../../../quotehome/components/FormInput/FormInput';
import FormBlock from '../../../../form/FormBlock';
import Select from '../../../../FormSelect/FormSelect';
import { getYearsToDateArray } from '../../../quotehome/data';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import {
  Deductible,
  PersonalProperty,
  PersonalLiability,
  MedicalPayments,
  ContentsCoverage,
  Residence,
  YesNoOptions,
} from '../data';
import IconOptionButtons from '../../../quotehome/components/IconOptionButtons';

const CoverageForm = ({ values, errors, handleChange, handleBlur }) => {
  const createOptions = list =>
    list.map(text => {
      return { text: text, value: text };
    });
  const DeductibleActive = true;
  const PersonalPropertyActive = DeductibleActive && !!values.deductible;
  const PersonalLiabilityActive = PersonalPropertyActive && !!values.personalProperty;
  const MedicalPaymentsActive = PersonalLiabilityActive && !!values.personalLiability;
  const ContentsCoverageActive = MedicalPaymentsActive && !!values.medicalPayments;
  const ResidenceActive = ContentsCoverageActive && !!values.contentsCoverage;
  const YearOccupiedActive = ResidenceActive && !!values.residence;

  const SafetyFeaturesActive = YearOccupiedActive && !!values.yearOccupied;
  const CentralBurglarAlarmActive = SafetyFeaturesActive && !!values.safetyFeatures;
  const CentralFireAlarmActive =
    CentralBurglarAlarmActive && !!values.centralBurglarAlarm;

  const selectableOptions = [
    {
      name: 'deductible',
      title: 'Deductible',
      options: Deductible,
      active: DeductibleActive,
    },
    {
      name: 'personalProperty',
      title: 'Personal Property Coverage',
      options: PersonalProperty,
      active: PersonalPropertyActive,
    },
    {
      name: 'personalLiability',
      title: 'Coverage amount for alternative living expenses',
      options: PersonalLiability,
      active: PersonalLiabilityActive,
    },
    {
      name: 'medicalPayments',
      title: 'Medical expenses',
      options: MedicalPayments,
      active: MedicalPaymentsActive,
    },
    {
      name: 'contentsCoverage',
      title: 'Contents Coverage',
      options: ContentsCoverage,
      active: ContentsCoverageActive,
    },
    {
      name: 'residence',
      title: 'Residence Type',
      options: Residence.sort((a, b) => {
        if (a.title > b.title) return 1;
        else return -1;
      }),
      icons: true,
      active: ResidenceActive,
    },
    {
      name: 'yearOccupied',
      title: 'Year occupied',
      options: getYearsToDateArray().map(year => year - 1),
      active: YearOccupiedActive,
    },
  ];
  const binaryOptions = [
    {
      name: 'safetyFeatures',
      title: 'Do you have smoke alarm, dead bolt and fire extinguisher?',
      options: YesNoOptions,
      active: SafetyFeaturesActive,
    },
    {
      name: 'centralBurglarAlarm',
      title: 'Do you have a central burglar alarm reporting?',
      options: YesNoOptions,
      active: CentralBurglarAlarmActive,
    },
    {
      name: 'centralFireAlarm',
      title: 'Do you have a central fire alarm reporting?',
      options: YesNoOptions,
      active: CentralFireAlarmActive,
    },
  ];
  return (
    <>
      <div className={styles.FormIntroText}>
        <div className={styles.FormIntroIcon}>
          <FontAwesomeIcon icon={faShield} size={'lg'} />
        </div>
        <FormLayout title={`Coverage`} index={0} delay={0} className={styles.FormIntro}>
          <p className={styles.FormIntroMiniText}>
            When do you want your new policy to become effective?
          </p>
          <div className={styles.StateFieldWrapper}>
            <FormInput
              rootClassName={styles.effectiveDate}
              hasError={errors.effective}
              onChange={handleChange}
              onBlur={handleBlur}
              name="effective"
              type="date"
              value={values?.effective}
            />
          </div>
        </FormLayout>
      </div>
      {!!values.effective && (
        <FormLayout title="Coverage Levels">
          {selectableOptions.map(({ title, active, name, options, icons }, idx) => (
            <FormBlock key={idx} title={title} isActive={active} delay="0s">
              {icons ? (
                <IconOptionButtons
                  options={options}
                  values={values}
                  handleChange={handleChange}
                  errors={errors}
                />
              ) : (
                <Select
                  hasError={errors[name]}
                  onChange={handleChange}
                  name={name}
                  placeholder="Choose one"
                  value={values[name]}
                  options={createOptions(options)}
                />
              )}
            </FormBlock>
          ))}
          {binaryOptions.map(({ title, active, name, options }, idx) => (
            <FormBlock title={title} isActive={active} delay="0.2s" key={idx}>
              <div className={styles.CheckboxGroup}>
                {options.map((option, idy) => (
                  <FormControlLabel
                    key={idy}
                    control={
                      <Checkbox
                        color="default"
                        value={option}
                        name={name}
                        onClick={handleChange}
                        checked={values[name] === option}
                      />
                    }
                    label={option}
                    className={styles.formCheckboxBlock}
                  />
                ))}
              </div>
            </FormBlock>
          ))}
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
