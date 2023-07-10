import React from 'react';
import * as styles from '../../quote-renters.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/fontawesome-pro-solid';
import FormLayout from '../../../../FormLayout/FormLayout';
import Select from '../../../../FormSelect/FormSelect';
import FormBlock from '../../../../form/FormBlock';
import FormRow from '../../../../form/FormRow';
import Input from '../../../quotehome/components/FormInput/FormInput';
import {
  enforceFormat,
  formatToPhone,
  formatToZip,
} from '../../../../../utils/validation';
import Error from '../../../../error/Error';
import { Checkbox, FormControlLabel } from '@mui/material';
import { statesList as states } from '../../../../../utils/states';
import { MaritalStatus } from '../data';
import { statesAllowedWithUnspecifiedGender } from '../../../quotehome/data';
import AgreementBox from './AgreementBox';
import AccountHandlerField from '../../../../quoteParts/AccountHandlerField';
import { demographicProps } from '../../../../quoteParts/reusableProps/demographicProps';

const DemograhicForm = ({
  values,
  errors,
  handleChange,
  handleBlur,
  setShowLoginPopup,
}) => {
  const emailBlockActive = !!values.firstName && !!values.lastName;
  const phoneBlockActive = emailBlockActive && !!values.email;
  const dateBlockActive = phoneBlockActive && !!values.phone;
  const genderBlockActive = dateBlockActive && !!values.dob;
  const maritalBlockActive = genderBlockActive && !!values.gender;
  const addressBlockActive = maritalBlockActive && !!values.maritalStatus;
  const agreementActive =
    addressBlockActive &&
    !!values.address1 &&
    !!values.addressCity &&
    !!values.addressZip;
  const genderOptions = ['Male', 'Female', 'Not Specified'];

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
              options={states}
            />
          </div>
        </FormLayout>
      </div>
      {!!values.addressState && (
        <FormLayout title="About Yourself">
          <FormBlock title="Your Name" isActive={!!values.addressState} delay="0s">
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
              {genderOptions.map(
                (option, idx) =>
                  ((option == 'Not Specified' &&
                    statesAllowedWithUnspecifiedGender.includes(values.addressState)) ||
                    option !== 'Not Specified') && (
                    <FormControlLabel
                      key={idx}
                      control={
                        <Checkbox
                          color="default"
                          value={option}
                          name="gender"
                          onClick={handleChange}
                          checked={values.gender === option}
                        />
                      }
                      label={option}
                      className={styles.formCheckboxBlock}
                    />
                  )
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
              options={MaritalStatus}
            />
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
          <FormBlock isActive={agreementActive}>
            <AgreementBox errors={errors} handleChange={handleChange} values={values} />
          </FormBlock>
        </FormLayout>
      )}
    </>
  );
};

DemograhicForm.propTypes = demographicProps;

export default DemograhicForm;
