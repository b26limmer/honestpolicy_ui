import React, { createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import FormLayout from '../FormLayout';
import FormRow from '../../../../form/FormRow';
import FormBlock from '../../../../form/FormBlock';
import Input from '../FormInput';
import Select from '../../../../FormSelect';
import FormMultipleItems from '../FormMultipleItems';
import Checkbox from '../../../../inputs/Checkbox/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import { allStates as states } from '../../../search/allStates';
import { IndustryEnums, Ocuppations } from '../../data';
import * as styles from './drivers-form.module.scss';
import steps from '../../quoteSteps';
import Error from '../../../../error/Error';
import { statesAllowedWithUnspecifiedGender } from '../../../quotehome/data';
import { convertStateNameToCode } from '../../../../../utils/states';

const DriversForm = ({
  handleChangeArr,
  handleChange,
  handleBlur,
  selectedDriver,
  handleAddNewItem,
  handleChangeDriver,
  handleRemoveItem,
  setSelectedDriver,
  values,
  errors,
  handleUserFirstStepDetails,
  isEdit = false,
  setValues,
  setActionButtonText,
}) => {
  const ddRefEl = createRef(null);
  const yyRefEl = createRef(null);

  const handleChangeData = item => {
    handleChangeArr({ ...item, field: 'drivers', key: selectedDriver });
  };

  const handleDateChange = item => {
    if (item.target.name === 'mm' && item.target.value.length >= 2) {
      ddRefEl.current.focus();
    } else if (item.target.name == 'dd' && item.target.value.length >= 2) {
      yyRefEl.current.focus();
    }
    handleChangeData(item);
  };

  const genderBlockActive =
    values?.drivers?.[selectedDriver]?.first_name &&
    values?.drivers?.[selectedDriver]?.last_name;
  const dateBlockActive = genderBlockActive && values?.drivers?.[selectedDriver]?.gender;
  const maritalBlockActive = dateBlockActive && values?.drivers?.[selectedDriver]?.dob;
  const educationBlockActive =
    maritalBlockActive && values?.drivers?.[selectedDriver]?.marital_status;
  const industryBlockActive =
    educationBlockActive && values?.drivers?.[selectedDriver]?.education;
  const occupationBlockActive =
    industryBlockActive && values?.drivers?.[selectedDriver]?.industry;
  const currentLicenceStateActive =
    occupationBlockActive && values?.drivers?.[selectedDriver]?.occupation;
  const ageFirstLicensedBlockActive =
    currentLicenceStateActive && values?.drivers?.[selectedDriver]?.current_license_state;
  const stateFirstLicensedBlockActive =
    ageFirstLicensedBlockActive && values?.drivers?.[selectedDriver]?.ageFirstLicensed;
  const healthcareBlockActive =
    stateFirstLicensedBlockActive &&
    values?.drivers?.[selectedDriver]?.current_license_state;

  const handleInitialDriversSet = drivers => {
    let newValues = _.cloneDeep(values);
    const createInitialDriversValues = numberOfObjects => {
      let initialValues = [];
      Array.from({ length: numberOfObjects }).forEach(() =>
        initialValues.push(
          _.cloneDeep(steps.find(step => step.step === 3).initialValues.drivers[0])
        )
      );
      return initialValues;
    };
    newValues.policy_holders = drivers;
    switch (drivers) {
      case 'Just me':
        newValues.drivers = createInitialDriversValues(1);
        break;
      case '2 people':
        newValues.drivers = createInitialDriversValues(2);
        break;
      case '3+ people':
        newValues.drivers = createInitialDriversValues(3);
        break;
    }
    setSelectedDriver(0);
    setValues(newValues);
  };
  useEffect(() => {
    let policy_holders = values.policy_holders;
    let options = ['Just me', '2 people', '3+ people'];
    let correctOption;
    if (policy_holders) {
      switch (values.drivers.length) {
        case 1:
          if (policy_holders !== options[0]) {
            correctOption = options[0];
          }
          break;
        case 2:
          if (policy_holders !== options[1]) {
            correctOption = options[1];
          }
          break;
        default:
          if (policy_holders !== options[2]) {
            correctOption = options[2];
          }
          break;
      }
    }
    if (correctOption) {
      handleChange({
        target: {
          name: 'policy_holders',
          value: correctOption,
        },
      });
    }
  }, [values]);

  useEffect(() => {
    if (!values.drivers[0].current_license_state) {
      let newValues = _.cloneDeep(values);
      newValues.drivers[0].current_license_state = values.address_state;
      setValues(newValues);
    }
  }, []);
  const returnTitleWithDriversIdxConditionally = title => {
    let holders = values.policy_holders;
    if (holders && holders !== 'Just me') {
      let driversNumber = parseInt(selectedDriver) + 1;
      title = title + ' ' + driversNumber;
    }
    return title;
  };
  useEffect(() => {
    let driversLength = values.drivers.length;
    if (driversLength > 1 && selectedDriver + 1 < driversLength) {
      setActionButtonText(`Next: Driver ${selectedDriver + 2}`);
    } else setActionButtonText('');
  }, [selectedDriver, values.drivers.length]);

  return (
    <>
      <div className={styles.FormIntroText}>
        <div className={styles.FormIntroIcon}>
          <FontAwesomeIcon icon={faFlag} />
        </div>
        <FormLayout
          title={`Great, who is driving on this policy?`}
          index={0}
          delay={0}
          className={styles.FormIntro}
        >
          <div className={styles.Coveragecheck}>How many drivers do you want to add?</div>
          <div className={styles.IntroCheckboxGroup}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  name="policy_holders"
                  value="Just me"
                  onClick={() => handleInitialDriversSet('Just me')}
                  checked={values.policy_holders === 'Just me'}
                />
              }
              label="Just me"
              className={styles.InputSmallIntro}
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  name="policy_holders"
                  value="2 people"
                  onClick={() => handleInitialDriversSet('2 people')}
                  checked={values.policy_holders === '2 people'}
                />
              }
              label="2 people"
              className={styles.InputSmallIntro}
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  name="policy_holders"
                  value="3+ people"
                  onClick={() => handleInitialDriversSet('3+ people')}
                  checked={values.policy_holders === '3+ people'}
                />
              }
              label="3+ people"
              className={styles.InputSmallIntro}
            />
          </div>
          {!!values.policy_holders && values.policy_holders !== 'Just me' && (
            <FormMultipleItems
              items={values?.drivers?.map((item, key) => {
                return {
                  title: item?.first_name + ' ' + item?.last_name,
                  subTitle: `Driver ${key + 1}`,
                  isActive: key === selectedDriver,
                };
              })}
              handleDelete={item => handleRemoveItem('drivers', item)}
              isEdit={isEdit}
              handleSelectItem={item => handleChangeDriver(item)}
              handleAddNewItem={() => handleAddNewItem('drivers')}
            />
          )}
        </FormLayout>
      </div>
      {values.policy_holders && (
        <FormLayout
          title={returnTitleWithDriversIdxConditionally('Policy Holder')}
          fontSmall
        >
          <FormBlock
            title={returnTitleWithDriversIdxConditionally('Driver Name')}
            isActive={true}
            key={'driver_name'}
            rightSideChildren={
              selectedDriver === 0 && (
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={e => handleUserFirstStepDetails(e, 'drivers')}
                      color="primary"
                    />
                  }
                  label={<>Use name from Step 1?</>}
                />
              )
            }
          >
            <FormRow>
              <Input
                hasError={errors.first_name}
                onBlur={handleBlur}
                onChange={handleChangeData}
                name="first_name"
                placeholder="First Name"
                type="first_name"
                value={values?.drivers?.[selectedDriver]?.first_name || ''}
              />
              <Input
                hasError={errors.last_name}
                onChange={handleChangeData}
                onBlur={handleBlur}
                name="last_name"
                placeholder="Last Name"
                type="last_name"
                value={values?.drivers?.[selectedDriver]?.last_name || ''}
              />
            </FormRow>
          </FormBlock>
          <FormBlock
            title="Sex Listed on Driver's License"
            isActive={genderBlockActive}
            delay="0.2s"
          >
            <div className={styles.CheckboxGroup}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    value="Male"
                    name="gender"
                    key={'gender_male'}
                    onClick={handleChangeData}
                    checked={values.drivers?.[selectedDriver]?.gender === 'Male'}
                  />
                }
                label="Male"
                className={styles.InputSmall}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    value="Female"
                    name="gender"
                    key={'gender_female'}
                    onClick={handleChangeData}
                    checked={values.drivers?.[selectedDriver]?.gender === 'Female'}
                  />
                }
                label="Female"
                className={styles.InputSmall}
              />
              {statesAllowedWithUnspecifiedGender.includes(
                convertStateNameToCode(values.address_state)
              ) && (
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      value="Not Specified"
                      name="gender"
                      onClick={handleChangeData}
                      checked={
                        values.drivers?.[selectedDriver]?.gender === 'Not Specified'
                      }
                    />
                  }
                  label="Not Specified"
                  className={styles.InputSmall}
                />
              )}
            </div>
            <Error error={errors.gender} />
          </FormBlock>
          <FormBlock
            title="Date of birth"
            isActive={dateBlockActive}
            dely="0.4s"
            key={'dob_block'}
          >
            <Input
              hasError={errors.dob}
              onChange={handleDateChange}
              onBlur={handleBlur}
              name="dob"
              type="date"
              value={values?.drivers?.[selectedDriver]?.dob || ''}
            />
          </FormBlock>
          <FormBlock
            title="Marital status"
            isActive={maritalBlockActive}
            delay="0.6s"
            key={'marital_status'}
          >
            <Select
              hasError={errors.marital_status}
              onChange={handleChangeData}
              name="marital_status"
              placeholder="Marital Status"
              value={values?.drivers?.[selectedDriver]?.marital_status || ''}
              options={[
                { value: 'Single', text: 'Single' },
                { value: 'Married', text: 'Married' },
                { value: 'Domestic Partner', text: 'Domestic Partner' },
                { value: 'Widowed', text: 'Widowed' },
                { value: 'Separated', text: 'Separated' },
                { value: 'Divorced', text: 'Divorced' },
              ]}
            />
          </FormBlock>
          <FormBlock title="Education" isActive={educationBlockActive} delay="0.8s">
            <Select
              hasError={errors.education}
              onChange={handleChangeData}
              name="education"
              placeholder="Education"
              value={values?.drivers?.[selectedDriver]?.education || ''}
              options={[
                { value: 'No High School Diploma', text: 'No High School Diploma' },
                { value: 'High School Diploma', text: 'High School Diploma' },
                { value: 'In College', text: 'In College' },
                { value: 'Some College - No Degree', text: 'Some College - No Degree' },
                {
                  value: 'Vocational/Technical Degree',
                  text: 'Vocational/Technical Degree',
                },
                { value: 'Associates Degree', text: 'Associates Degree' },
                { value: 'Bachelors', text: 'Bachelors' },
                { value: 'Masters', text: 'Masters' },
                { value: 'Phd', text: 'Phd' },
                { value: 'Medical Degree', text: 'Medical Degree' },
                { value: 'Law Degree', text: 'Law Degree' },
              ]}
            />
          </FormBlock>
          <FormBlock title="Industry" isActive={industryBlockActive} delay="1s">
            <Select
              hasError={errors.industry}
              onChange={handleChangeData}
              name="industry"
              placeholder="Industry"
              value={values?.drivers?.[selectedDriver]?.industry || ''}
              options={IndustryEnums}
            />
          </FormBlock>
          <FormBlock title="Occupation" isActive={occupationBlockActive} delay="1.2s">
            <Select
              hasError={errors.occupation}
              onChange={handleChangeData}
              name="occupation"
              placeholder="Occupation"
              value={values?.drivers?.[selectedDriver]?.occupation || ''}
              options={
                values?.drivers?.[selectedDriver]?.industry
                  ? Ocuppations?.[values?.drivers?.[selectedDriver]?.industry]
                  : []
              }
            />
          </FormBlock>
          <FormBlock
            title="What is your current driver's license state?"
            isActive={currentLicenceStateActive}
            delay="1.4s"
          >
            <Select
              hasError={errors.current_license_state}
              onChange={handleChangeData}
              name="current_license_state"
              placeholder="State"
              value={values?.drivers?.[selectedDriver]?.current_license_state || ''}
              options={states.map(item => {
                return {
                  value: item,
                  text: item,
                };
              })}
            />
          </FormBlock>
          <FormBlock
            title="How old were you when you first got your driver's license?"
            isActive={ageFirstLicensedBlockActive}
            delay="1.2s"
          >
            <Select
              hasError={errors.ageFirstLicensed}
              onChange={handleChangeData}
              name="ageFirstLicensed"
              placeholder="Age"
              value={values?.drivers?.[selectedDriver]?.ageFirstLicensed || ''}
              options={Array.from({ length: 86 }, (_, i) => i + 14).map(n => {
                return { value: parseInt(n), text: parseInt(n) };
              })}
            />
          </FormBlock>
          <FormBlock
            title="What state did you receive your first license?"
            isActive={stateFirstLicensedBlockActive}
            delay="1.2s"
          >
            <Select
              hasError={errors.stateFirstLicensed}
              onChange={handleChangeData}
              name="stateFirstLicensed"
              placeholder="State"
              value={values?.drivers?.[selectedDriver]?.stateFirstLicensed || ''}
              options={states.map(item => {
                return {
                  value: item,
                  text: item,
                };
              })}
            />
          </FormBlock>
          {values?.address_state === 'Michigan' && (
            <FormBlock
              title="Healthcare plan (only for Michigan drivers)"
              isActive={healthcareBlockActive}
              delay="1.6s"
            >
              <Select
                hasError={errors.healthcare_plan}
                onChange={handleChangeData}
                name="healthcare_plan"
                placeholder="Healthcare plan"
                value={values?.drivers?.[selectedDriver]?.healthcare_plan || ''}
                options={[
                  { value: 'qualified', text: 'Qualified Private Healthcare Plan' },
                  {
                    value: 'other_PIP',
                    text: 'PIP Medical Coverage Under Another Auto Policy',
                  },
                  { value: 'medicare', text: 'Medicare Parts A & B' },
                  { value: 'medicaid', text: 'Medicaid' },
                  {
                    value: 'federal',
                    text: 'Federal Government Benefits (e.g. Military or VA)',
                  },
                  { value: 'other', text: 'Other' },
                  { value: 'idk', text: "I don't know" },
                  { value: 'none', text: 'No Qualified Healthcare Plan' },
                ]}
              />
            </FormBlock>
          )}
          <div
            onClick={() => handleAddNewItem('drivers')}
            className={styles.addAnotherWrapper}
          >
            <FontAwesomeIcon icon={faPlus} size="sm" />
            &nbsp;&nbsp;
            <a title="Add additional drivers">Add additional driver</a>
          </div>
        </FormLayout>
      )}
    </>
  );
};

DriversForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  isEdit: PropTypes.bool,
  handleBlur: PropTypes.func,
  selectedDriver: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChangeDriver: PropTypes.func,
  handleAddNewItem: PropTypes.func,
  handleUserFirstStepDetails: PropTypes.func,
  handleChangeArr: PropTypes.func,
  handleRemoveItem: PropTypes.func,
  handleChange: PropTypes.func,
  setValues: PropTypes.func,
  setSelectedDriver: PropTypes.func,
  setActionButtonText: PropTypes.func.isRequired,
};

export default DriversForm;
