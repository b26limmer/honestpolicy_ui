import React from 'react';
import FormLayout from '../FormLayout';
import FormRow from '../../../../form/FormRow';
import FormBlock from '../../../../form/FormBlock';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '../FormInput';
import Select from '../../../../FormSelect';
import { allStates as states } from '../../../search/allStates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import * as styles from './demographics-form.module.scss';
import { currentLivingSituation } from '../../data';
import Error from '../../../../error/Error';
import {
  enforceFormat,
  formatToPhone,
  formatToZip,
} from '../../../../../utils/validation';
import AccountHandlerField from '../../../../quoteParts/AccountHandlerField';
import { demographicProps } from '../../../../quoteParts/reusableProps/demographicProps';

const DemographicsForm = ({
  handleChange,
  handleBlur,
  values,
  errors,
  setShowLoginPopup,
}) => {
  const contactInfoBlockActive = !!values.first_name && !!values.last_name;
  const phoneBlockActive = contactInfoBlockActive && values?.email;
  const rentOrOwnBlockActive = phoneBlockActive && values?.phone;
  const addressBlockActive = rentOrOwnBlockActive && values.rent_or_own;
  const parkBlockActive =
    addressBlockActive &&
    values.address1 &&
    values.address_city &&
    values.address_state &&
    values.address_zip;
  const carParkedBlockActive = parkBlockActive && values.same_garaged;
  const sameAddressBlockActive = parkBlockActive && !!values.same_garaged;
  const agreementActive = sameAddressBlockActive && !!values.same_address;

  return (
    <>
      <div className={styles.FormIntroText}>
        <div className={styles.FormIntroIcon}>
          <FontAwesomeIcon icon={faFlag} />
        </div>
        <FormLayout
          title={`Tell us about yourself.`}
          index={0}
          delay={0}
          className={styles.FormIntro}
        >
          <p className={styles.FormIntroMiniText}>Which state do you live in?</p>
          <div className={styles.StateFieldWrapper}>
            <Select
              hasError={errors.address_state}
              onChange={handleChange}
              name="address_state"
              placeholder="State"
              value={values.address_state}
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
      {values.address_state && (
        <FormLayout title="Your Demography" fontSmall>
          <FormBlock title="What's your name?" isActive={true}>
            <FormRow>
              <Input
                hasError={errors.first_name}
                onChange={handleChange}
                name="first_name"
                placeholder="First Name"
                type="first_name"
                value={values.first_name}
                autoComplete="given-name"
              />
              <Input
                hasError={errors.last_name}
                onChange={handleChange}
                name="last_name"
                placeholder="Last Name"
                type="last_name"
                value={values.last_name}
                autoComplete="family-name"
              />
            </FormRow>
          </FormBlock>
          <AccountHandlerField
            isActive={contactInfoBlockActive}
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
          <FormBlock
            title="What's your current living situation?"
            isActive={rentOrOwnBlockActive}
          >
            <Select
              hasError={errors.rent_or_own}
              onChange={handleChange}
              name="rent_or_own"
              placeholder="Select"
              value={values.rent_or_own}
              options={currentLivingSituation.map(item => ({ value: item, text: item }))}
            />
          </FormBlock>
          <FormBlock
            title="What's your address?"
            isActive={addressBlockActive}
            delay="0.4s"
          >
            <Input
              hasError={errors.address1}
              onChange={handleChange}
              name="address1"
              autoComplete="address-line1"
              placeholder="Address line 1"
              type="address1"
              value={values.address1}
            />
            <Input
              hasError={errors.address2}
              onChange={handleChange}
              name="address2"
              autoComplete="address-line2"
              placeholder="Address line 2"
              type="address2"
              value={values.address2}
            />
            <FormRow>
              <Input
                hasError={errors.address_city}
                onChange={handleChange}
                name="address_city"
                placeholder="City"
                autoComplete="address-level2"
                type="address_city"
                value={values.address_city}
              />
              <Input
                hasError={errors.address_zip}
                onChange={handleChange}
                autoComplete="postal-code"
                name="address_zip"
                placeholder="ZIP"
                type="text"
                onKeyUp={e => {
                  const zip = formatToZip(e);
                  handleChange({ target: { name: 'address_zip', value: zip } });
                }}
                onKeyDown={enforceFormat}
                value={values.address_zip}
              />
            </FormRow>
          </FormBlock>
          <FormBlock
            title="Is your current address where you park your car at night?"
            isActive={parkBlockActive}
            delay="0.6s"
          >
            <div className={styles.checkboxGroup}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    name="same_garaged"
                    value="Yes"
                    onClick={handleChange}
                    checked={values.same_garaged == 'Yes'}
                  />
                }
                label="Yes"
                className={styles.InputSmall}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    name="same_garaged"
                    value="No"
                    onClick={handleChange}
                    checked={values.same_garaged == 'No'}
                  />
                }
                label="No"
                className={styles.InputSmall}
              />
            </div>
          </FormBlock>
          {values.same_garaged === 'No' && (
            <FormBlock
              isActive={carParkedBlockActive}
              title="What’s your Car Parked address?"
            >
              <Input
                hasError={errors.garage_address1}
                onChange={handleChange}
                name="garage_address1"
                placeholder="Address line 1"
                type="garage_address1"
                value={values.garage_address1}
              />
              <Input
                hasError={errors.garage_address2}
                onChange={handleChange}
                name="garage_address2"
                placeholder="Address line 2"
                type="garage_address2"
                value={values.garage_address2}
              />
              <FormRow>
                <Input
                  hasError={errors.garage_address_city}
                  onChange={handleChange}
                  name="garage_address_city"
                  placeholder="City"
                  type="garage_address_city"
                  value={values.garage_address_city}
                />
                <Select
                  hasError={errors.garage_address_state}
                  onChange={handleChange}
                  name="garage_address_state"
                  placeholder="State"
                  value={values.garage_address_state}
                  options={states.map(item => {
                    return {
                      value: item,
                      text: item,
                    };
                  })}
                />
                <Input
                  hasError={errors.garage_address_zip}
                  onChange={handleChange}
                  name="garage_address_zip"
                  placeholder="ZIP"
                  value={values.garage_address_zip}
                  onKeyUp={e => {
                    const zip = formatToZip(e);
                    handleChange({ target: { name: 'garage_address_zip', value: zip } });
                  }}
                  onKeyDown={enforceFormat}
                />
              </FormRow>
            </FormBlock>
          )}
          <FormBlock
            title="Have you been at this address more than 3 years?"
            isActive={sameAddressBlockActive}
          >
            <div className={styles.checkboxGroup}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    name="same_address"
                    value="Yes"
                    onClick={handleChange}
                    checked={values.same_address == 'Yes'}
                  />
                }
                label="Yes"
                className={styles.InputSmall}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    name="same_address"
                    value="No"
                    onClick={handleChange}
                    checked={values.same_address == 'No'}
                  />
                }
                label="No"
                className={styles.InputSmall}
              />
            </div>
            {values.same_address === 'No' && (
              <FormBlock title="Prior address" isActive={values.same_address === 'No'}>
                <Input
                  hasError={errors.previous_address1}
                  onChange={handleChange}
                  name="previous_address1"
                  placeholder="Address line 1"
                  type="text"
                  value={values.previous_address1}
                />
                <Input
                  hasError={errors.previous_address2}
                  onChange={handleChange}
                  name="previous_address2"
                  placeholder="Address line 2"
                  type="text"
                  value={values.previous_address2}
                />
                <FormRow>
                  <Input
                    hasError={errors.previous_address_city}
                    onChange={handleChange}
                    name="previous_address_city"
                    placeholder="City"
                    type="text"
                    value={values.previous_address_city}
                  />
                  <Select
                    hasError={errors.previous_address_state}
                    onChange={handleChange}
                    name="previous_address_state"
                    placeholder="State"
                    value={values.previous_address_state}
                    options={states.map(item => {
                      return {
                        value: item,
                        text: item,
                      };
                    })}
                  />
                  <Input
                    hasError={errors.previous_address_zip}
                    onChange={handleChange}
                    name="previous_address_zip"
                    placeholder="ZIP"
                    type="string"
                    value={values.previous_address_zip}
                    onKeyUp={e => {
                      const zip = formatToZip(e);
                      handleChange({
                        target: { name: 'previous_address_zip', value: zip },
                      });
                    }}
                    onKeyDown={enforceFormat}
                  />
                </FormRow>
              </FormBlock>
            )}
          </FormBlock>
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

DemographicsForm.propTypes = demographicProps;

export default DemographicsForm;
