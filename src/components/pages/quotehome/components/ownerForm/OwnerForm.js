import React from 'react';
import FormBlock from '../../../../form/FormBlock';
import FormRow from '../../../../form/FormRow';
import Input from '../FormInput/FormInput';
import {
  enforceFormat,
  formatToPhone,
  formatToZip,
} from '../../../../../utils/validation';
import Select from '../../../../FormSelect/FormSelect';
import { allStates as states } from '../../../search/allStates';
import * as styles from '../../quote-home.module.scss';
import FormLayout from '../../../../FormLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Error from '../../../../error/Error';
import classNames from 'classnames';
import { HomeOrCondo, statesAllowedWithUnspecifiedGender } from '../../data';
import { IndustryEnums, Ocuppations } from '../../../quoteauto/data';
import { convertStateNameToCode } from '../../../../../utils/states';
import AccountHandlerField from '../../../../quoteParts/AccountHandlerField';
import { demographicProps } from '../../../../quoteParts/reusableProps/demographicProps';

const checkBoxItems = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

const OwnerForm = ({ values, errors, handleChange, handleBlur, setShowLoginPopup }) => {
  const emailBlockActive = !!values.firstName && !!values.lastName;
  const phoneBlockActive = emailBlockActive && !!values.email;
  const dateBlockActive = emailBlockActive && !!values.phone;
  const genderBlockActive = dateBlockActive && !!values.dob;
  const maritalBlockActive = dateBlockActive && !!values?.gender;
  const industryBlockActive = maritalBlockActive && values?.maritalStatus;
  const occupationBlockActive = industryBlockActive && values?.industry;
  const currentLivingSituationActive = occupationBlockActive && !!values?.occupation;
  const addressBlockActive = currentLivingSituationActive && !!values.home_or_condo;
  const livedAtOnePlaceBlock =
    addressBlockActive &&
    !!values?.address1 &&
    !!values?.addressCity &&
    !!values?.addressState &&
    !!values?.addressZip;
  const agreementActive = livedAtOnePlaceBlock && !!values.livedAtleast3Yrs;
  return (
    <>
      <div className={styles.FormIntroText}>
        <div className={styles.FormIntroIcon}>
          <FontAwesomeIcon icon={faFlag} size={'lg'} />
        </div>
        <FormLayout
          title={`Let's begin.`}
          index={0}
          delay={0}
          className={styles.FormIntro}
        >
          <p className={styles.FormIntroMiniText}>Which state is your home located in?</p>
          <div className={styles.StateFieldWrapper}>
            <Select
              hasError={errors.addressState}
              onChange={handleChange}
              name="addressState"
              placeholder="Choose one..."
              value={values.addressState}
              options={states.map(item => {
                return {
                  value: item,
                  text: item,
                };
              })}
            />
          </div>
        </FormLayout>
      </div>
      {values.addressState && (
        <FormLayout title="About Yourself">
          <FormBlock title="Your Name" isActive={values.addressState} delay="0s">
            <FormRow>
              <Input
                hasError={errors.firstName}
                onChange={handleChange}
                name="firstName"
                placeholder="First Name"
                onBlur={handleBlur}
                autoComplete="given-name"
                value={values.firstName}
              />
              <Input
                hasError={errors.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                name="lastName"
                placeholder="Last Name"
                autoComplete="family-name"
                value={values.lastName}
              />
            </FormRow>
          </FormBlock>
          <AccountHandlerField
            isActive={emailBlockActive}
            email={values.email}
            handleChange={handleChange}
            password={values.password}
            handleBlur={handleBlur}
            errors={errors}
            setShowLoginPopup={setShowLoginPopup}
          />
          <FormBlock title="What's your phone" isActive={phoneBlockActive}>
            <Input
              hasError={errors.phone}
              onChange={handleChange}
              name="phone"
              placeholder="(xxx) xxx-xxxx"
              value={values.phone}
              onKeyDown={enforceFormat}
              onKeyUp={e => {
                const phone = formatToPhone(e);
                handleChange({ target: { name: 'phone', value: phone } });
              }}
            />
          </FormBlock>
          <FormBlock title="Date of Birth" isActive={dateBlockActive} delay="0.4s">
            <Input
              hasError={errors.dob}
              onChange={handleChange}
              onBlur={handleBlur}
              name="dob"
              type="date"
              value={values?.dob}
            />
          </FormBlock>
          <FormBlock title="Sex" isActive={genderBlockActive} delay="0.2s">
            <div className={styles.CheckboxGroup}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    value="Male"
                    name="gender"
                    onClick={handleChange}
                    checked={values.gender === 'Male'}
                  />
                }
                label="Male"
                className={styles.formCheckboxBlock}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    value="Female"
                    name="gender"
                    onClick={handleChange}
                    checked={values.gender === 'Female'}
                  />
                }
                label="Female"
                className={styles.formCheckboxBlock}
              />
              {statesAllowedWithUnspecifiedGender.includes(
                convertStateNameToCode(values.addressState)
              ) && (
                <FormControlLabel
                  control={
                    <Checkbox
                      color="default"
                      value="Not Specified"
                      name="gender"
                      onClick={handleChange}
                      checked={values.gender === 'Not Specified'}
                    />
                  }
                  label="Not Specified"
                  className={styles.formCheckboxBlock}
                />
              )}
            </div>
            <Error error={errors.gender} />
          </FormBlock>
          <FormBlock title="Marital Status" isActive={maritalBlockActive} delay="0.4s">
            <Select
              hasError={errors.maritalStatus}
              onChange={handleChange}
              onBlur={handleBlur}
              name="maritalStatus"
              placeholder="Choose one..."
              value={values?.maritalStatus}
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
          <FormBlock title="Industry" isActive={industryBlockActive} delay="1s">
            <Select
              hasError={errors.industry}
              onChange={handleChange}
              name="industry"
              placeholder="Industry"
              value={values?.industry}
              options={IndustryEnums}
            />
          </FormBlock>
          <FormBlock title="Occupation" isActive={occupationBlockActive} delay="1.2s">
            <Select
              hasError={errors.occupation}
              onChange={handleChange}
              name="occupation"
              placeholder="Occupation"
              value={values?.occupation}
              options={values?.industry ? Ocuppations?.[values?.industry] : []}
            />
          </FormBlock>
          <FormBlock
            title="Are you insuring a Home or Condo?"
            isActive={currentLivingSituationActive}
            delay="0.2s"
          >
            <div className={styles.CheckboxGroup}>
              {HomeOrCondo.map((item, idx) => (
                <FormControlLabel
                  key={idx}
                  control={
                    <Checkbox
                      size="medium"
                      color="default"
                      name="home_or_condo"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={item}
                      checked={values?.home_or_condo == item}
                    />
                  }
                  className={classNames(
                    styles.formCheckboxBlock,
                    errors.home_or_condo ? styles.formCheckboxError : ''
                  )}
                  label={item}
                />
              ))}
            </div>
            <Error error={errors.home_or_condo} />
          </FormBlock>
          <FormBlock
            title="Address to be insured"
            isActive={addressBlockActive}
            delay="0.4s"
          >
            <Input
              hasError={errors.address1}
              onBlur={handleBlur}
              onChange={handleChange}
              name="address1"
              placeholder="Address Line 1"
              type="address1"
              autoComplete="adress-line1"
              value={values.address1}
            />
            <Input
              hasError={errors.address2}
              onBlur={handleBlur}
              onChange={handleChange}
              name="address2"
              placeholder="Address Line 2"
              type="address2"
              autoComplete="adress-line2"
              value={values.address2}
            />
            <FormRow>
              <Input
                hasError={errors.addressCity}
                onBlur={handleBlur}
                onChange={handleChange}
                name="addressCity"
                placeholder="City"
                type="text"
                value={values.addressCity}
              />
              <Select
                hasError={errors.addressState}
                onChange={handleChange}
                onBlur={handleBlur}
                name="addressState"
                placeholder="State"
                value={values.addressState}
                options={states.map(item => {
                  return {
                    value: item,
                    text: item,
                  };
                })}
              />
              <Input
                hasError={errors.addressZip}
                onChange={handleChange}
                onBlur={handleBlur}
                name="addressZip"
                placeholder="ZIP"
                type="addressZip"
                onKeyUp={e => {
                  const zip = formatToZip(e);
                  handleChange({ target: { name: 'addressZip', value: zip } });
                }}
                onKeyDown={enforceFormat}
                value={values.addressZip}
              />
            </FormRow>
          </FormBlock>
          <FormBlock
            title="Have you lived at this address for at least 3 years?"
            isActive={livedAtOnePlaceBlock}
            delay="0.2s"
          >
            <div className={styles.CheckboxGroup}>
              {checkBoxItems.map(({ label, value }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      size="medium"
                      color="default"
                      name="livedAtleast3Yrs"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={value}
                      checked={values?.livedAtleast3Yrs == value}
                    />
                  }
                  className={classNames(
                    styles.formCheckboxBlock,
                    errors.livedAtleast3Yrs ? styles.formCheckboxError : ''
                  )}
                  label={label}
                  key={label}
                />
              ))}
            </div>
            <Error error={errors.livedAtleast3Yrs} />
          </FormBlock>
          {values?.livedAtleast3Yrs == 'No' && (
            <FormBlock
              title="Previous Address"
              isActive={values?.livedAtleast3Yrs == 'No'}
              delay="0.4s"
            >
              <Input
                hasError={errors.currentAddress1}
                onChange={handleChange}
                name="currentAddress1"
                onBlur={handleBlur}
                placeholder="Address Line 1"
                type="address1"
                value={values.currentAddress1}
              />
              <Input
                hasError={errors.currentAddress2}
                onChange={handleChange}
                name="currentAddress2"
                onBlur={handleBlur}
                placeholder="Address Line 2"
                type="address1"
                value={values.currentAddress2}
              />
              <FormRow>
                <Input
                  hasError={errors.currentCity}
                  onChange={handleChange}
                  name="currentCity"
                  onBlur={handleBlur}
                  placeholder="City"
                  type="text"
                  value={values.currentCity}
                />
                <Select
                  hasError={errors.currentState}
                  onChange={handleChange}
                  name="currentState"
                  placeholder="State"
                  onBlur={handleBlur}
                  value={values.currentState}
                  options={states.map(item => {
                    return {
                      value: item,
                      text: item,
                    };
                  })}
                />
                <Input
                  hasError={errors.currentZip}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="currentZip"
                  placeholder="ZIP"
                  type="addressZip"
                  onKeyUp={e => {
                    const zip = formatToZip(e);
                    handleChange({ target: { name: 'currentZip', value: zip } });
                  }}
                  onKeyDown={enforceFormat}
                  value={values.currentZip}
                />
              </FormRow>
            </FormBlock>
          )}
          <FormBlock isActive={agreementActive}>
            <div className={styles.agreementBox}>
              <Checkbox
                checked={values.agreement}
                onChange={e =>
                  handleChange({
                    target: { name: 'agreement', value: e.target.checked },
                  })
                }
                color="default"
              />
              <p className={styles.agreementText}>
                I acknowledge Honest Policy&apos;s{' '}
                <a
                  href="/privacypolicy"
                  title="Privacy Policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  privacy policy
                </a>{' '}
                and agree to the{' '}
                <a
                  href="/terms"
                  title="Terms of service"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  terms of service
                </a>{' '}
                and use of my information for the purpose of getting insurance rates and
                improving Honest Policy services
                <br />
                <Error error={errors.agreement} />
              </p>
            </div>
          </FormBlock>
        </FormLayout>
      )}
    </>
  );
};

OwnerForm.propTypes = demographicProps;

export default OwnerForm;
