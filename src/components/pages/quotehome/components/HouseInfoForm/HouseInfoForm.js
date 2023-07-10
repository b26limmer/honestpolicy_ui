import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormLayout from '../../../../FormLayout';
import FormBlock from '../../../../form/FormBlock';
import Input from '../FormInput/FormInput';
import Select from '../../../../FormSelect/FormSelect';
import {
  DistanceToFireStation,
  DistanceToFireHydrant,
  HouseConstructionType,
  NoOfStories,
  getYearsToDateArray,
  familyType,
  HouseInfoIcons,
  RoofTypes,
  HeatingTypes,
} from '../../data';
import * as styles from './House-info-form.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import FormRow from '../../../../form/FormRow';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Error from '../../../../error/Error';
import classNames from 'classnames';
import IconOptionButtons from '../IconOptionButtons';
import { StaticAlert } from '../../../../alert';

const HouseInfoForm = ({ values, errors, handleChange, handleBlur }) => {
  const [bathroomDescription, setBathroomDescription] = useState('');
  const yesNoOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];
  const purchasePriceBlockActive = !!values?.homeUse;
  const dateBlockMonthActive = !!values?.purchasePrice && purchasePriceBlockActive;
  const constructionBlockActive = dateBlockMonthActive && !!values?.purchaseDate;
  const yearBuiltBlockActive = constructionBlockActive && !!values?.homeUnderConstruction;
  const familiesBlockActive = yearBuiltBlockActive && !!values?.homeBuiltYear;
  const squareFeetBlockActive = familiesBlockActive && !!values.familyType;
  const fullBathsBlockActive = squareFeetBlockActive && !!values?.homeArea;
  const housingStructureBlockActive = fullBathsBlockActive && !!values?.fullBaths;
  const houseConstructionBlockActive =
    housingStructureBlockActive && !!values?.homeStructure;
  const roofTypeActive = houseConstructionBlockActive && !!values?.constructionType;
  const roofShapeActive = roofTypeActive && !!values?.roofType;
  const storiesBlockActive = roofShapeActive && !!values?.roofShape;
  const heatingSystemTypeActive = storiesBlockActive && !!values?.noOfStories;
  const garageBlockActive = heatingSystemTypeActive && !!values?.heatingSystemType;
  const locationBlockActive = garageBlockActive && !!values?.garagesAndCarports;
  const fireDistrictBlockActive = locationBlockActive && !!values?.isWithinCityLimit;
  const fireHydrantDistanceActive = fireDistrictBlockActive && !!values?.isFireDistrict;
  const fireStationDistanceActive =
    fireHydrantDistanceActive && !!values?.fireHydrantDistance;
  const {
    bathrooms: bathroomsOptions,
    carport: carportOptions,
    houseType: houseTypeOptions,
    roofShape: roofShapeOptions,
  } = HouseInfoIcons;

  const handleQuantityChange = (op, option, currentValue) => {
    currentValue = parseInt(currentValue);
    let newValue = op == '+' ? currentValue + 1 : currentValue - 1;
    if (newValue < 0) {
      newValue = 0;
    } else if (newValue > 20) {
      newValue = 20;
    } else if (option.property == 'fullBaths' && newValue < 1) {
      newValue = 1;
    }
    handleChange({ target: { name: option.property, value: newValue.toString() } });
  };
  return (
    <>
      <div className={styles.FormIntroText}>
        <div className={styles.FormIntroIcon}>
          <FontAwesomeIcon icon={faUser} size={'lg'} />
        </div>
        <FormLayout
          title={`Let's get you rates in ${values?.addressState}!`}
          index={0}
          delay={0}
          className={styles.FormIntro}
        >
          <p className={styles.FormIntroMiniText}>How are you using this home?</p>
          <div className={styles.StateFieldWrapper}>
            <Select
              hasError={errors.homeUse}
              onChange={handleChange}
              name="homeUse"
              placeholder="Choose one..."
              value={values.homeUse}
              options={['Primary', 'Secondary', 'Vacant', 'Rented']?.map(item => {
                return { text: item, value: item };
              })}
            />
          </div>
        </FormLayout>
      </div>
      {!!values?.homeUse && (
        <FormLayout title={'About the Property'}>
          <FormBlock
            title={'Purchase Price'}
            isActive={purchasePriceBlockActive}
            delay="0s"
          >
            <FormRow>
              <Input
                hasError={errors.purchasePrice}
                onChange={handleChange}
                name="purchasePrice"
                placeholder="Total price"
                min={1}
                type={'number'}
                value={values?.purchasePrice}
              />
            </FormRow>
          </FormBlock>
          <FormBlock title={'Purchase date'} isActive={dateBlockMonthActive} delay="0s">
            <FormRow>
              <Input
                hasError={errors.purchaseDate}
                onChange={handleChange}
                onBlur={handleBlur}
                name="purchaseDate"
                type="date"
                value={values?.purchaseDate}
              />
            </FormRow>
          </FormBlock>
          <FormBlock
            title="Is your home under construction?"
            isActive={constructionBlockActive}
            delay="0.2s"
          >
            <div className={styles.CheckboxGroup}>
              {yesNoOptions.map(({ label, value }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      size="medium"
                      color="default"
                      name="homeUnderConstruction"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={value}
                      checked={values?.homeUnderConstruction == value}
                    />
                  }
                  className={classNames(
                    styles.formCheckboxBlock,
                    errors.homeUnderConstruction ? styles.formCheckboxError : ''
                  )}
                  label={label}
                  key={label}
                />
              ))}
            </div>
            <Error error={errors.homeUnderConstruction} />
          </FormBlock>
          <FormBlock
            title="What year was your home built?"
            isActive={yearBuiltBlockActive}
            delay="0.4s"
          >
            <Select
              hasError={errors.homeBuiltYear}
              onChange={handleChange}
              onBlur={handleBlur}
              name="homeBuiltYear"
              placeholder="Choose one..."
              value={values?.homeBuiltYear || ''}
              options={getYearsToDateArray(130).map(year => {
                return { value: year, text: year };
              })}
            />
          </FormBlock>
          <FormBlock
            title={'How many families are in this home?'}
            isActive={familiesBlockActive}
            delay="0s"
          >
            <Select
              hasError={errors.familyType}
              onChange={handleChange}
              handleBlur={handleBlur}
              name="familyType"
              placeholder="Select"
              value={values?.familyType}
              options={familyType.map(item => {
                return {
                  value: item,
                  text: item,
                };
              })}
            />
          </FormBlock>
        </FormLayout>
      )}
      {!!values?.familyType && (
        <FormLayout title={'Additional Info'}>
          <FormBlock
            title={'How many square feet?'}
            isActive={squareFeetBlockActive}
            delay="0s"
          >
            <Input
              hasError={errors.homeArea}
              onBlur={handleBlur}
              onChange={handleChange}
              name="homeArea"
              placeholder="XXXX"
              type="number"
              value={values.homeArea}
            />
          </FormBlock>
          <FormBlock
            title={'How many baths does you house have?'}
            isActive={fullBathsBlockActive}
            delay="0s"
          >
            <div className={styles.bathroomOptionsContainer}>
              {bathroomsOptions.map((option, idx) => (
                <div
                  key={idx}
                  className={classNames(
                    styles.bathroomOption,
                    errors[option.property] ? styles.bathroomOptionError : ''
                  )}
                  onMouseEnter={() => setBathroomDescription(option.description)}
                >
                  <img
                    src={option.image}
                    alt={option.title}
                    className={styles.bathroomIcon}
                  />
                  <p className={styles.bathroomOptionTitle}>{option.title}</p>
                  <div className={styles.quantityInputContainer}>
                    <button
                      title={`Reduce ${option.title}`}
                      className={styles.changeQuantityButton}
                      onClick={() =>
                        handleQuantityChange('-', option, values[option.property])
                      }
                    >
                      -
                    </button>
                    <p className={styles.changeQuantityIndicator}>
                      {values[option.property]}
                    </p>
                    <button
                      title={`Add ${option.title}`}
                      className={styles.changeQuantityButton}
                      onClick={() =>
                        handleQuantityChange('+', option, values[option.property])
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {!!bathroomDescription && (
              <StaticAlert message={bathroomDescription} alertType="info" />
            )}
          </FormBlock>
          <FormBlock
            title={'What is the housing structure?'}
            isActive={housingStructureBlockActive}
            delay="0s"
          >
            <IconOptionButtons
              values={values}
              options={houseTypeOptions}
              errors={errors}
              handleChange={handleChange}
            />
          </FormBlock>
          <FormBlock
            title={'What type of construction is it?'}
            isActive={houseConstructionBlockActive}
            delay="0s"
          >
            <Select
              hasError={errors.constructionType}
              onChange={handleChange}
              handleBlur={handleBlur}
              name="constructionType"
              placeholder="Select"
              value={values?.constructionType}
              options={HouseConstructionType.map(item => {
                return {
                  value: item,
                  text: item,
                };
              })}
            />
          </FormBlock>
          <FormBlock
            title={'What kind of roof do you have?'}
            isActive={roofTypeActive}
            delay="0s"
          >
            <Select
              hasError={errors.roofType}
              onChange={handleChange}
              name="roofType"
              placeholder="Choose one..."
              value={values?.roofType || ''}
              options={RoofTypes.map(item => {
                return { value: item, text: item };
              })}
            />
          </FormBlock>
          <FormBlock
            title={'What is the shape of your roof?'}
            isActive={roofShapeActive}
            delay="0s"
          >
            <IconOptionButtons
              values={values}
              options={roofShapeOptions}
              errors={errors}
              handleChange={handleChange}
            />
          </FormBlock>
          <FormBlock
            title={'How many stories do you have?'}
            isActive={storiesBlockActive}
            delay="0s"
          >
            <Select
              hasError={errors.noOfStories}
              onChange={handleChange}
              handleBlur={handleBlur}
              name="noOfStories"
              placeholder="Select"
              value={values?.noOfStories}
              options={NoOfStories.map(item => {
                return {
                  value: item,
                  text: item,
                };
              })}
            />
          </FormBlock>
          <FormBlock
            title={'What type of heating system do you have?'}
            isActive={heatingSystemTypeActive}
            delay="0s"
          >
            <Select
              hasError={errors.heatingSystemType}
              onChange={handleChange}
              name="heatingSystemType"
              placeholder="Choose one..."
              value={values?.heatingSystemType || ''}
              options={HeatingTypes.map(item => {
                return { value: item, text: item };
              })}
            />
          </FormBlock>
          <FormBlock
            title="Do you have a garage?"
            isActive={garageBlockActive}
            delay="0.2s"
          >
            <div className={styles.CheckboxGroup}>
              {yesNoOptions.map(({ label, value }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      size="medium"
                      color="default"
                      name="isGarageAvailable"
                      onChange={handleChange}
                      value={value}
                      checked={values?.isGarageAvailable == value}
                    />
                  }
                  className={classNames(
                    styles.formCheckboxBlock,
                    errors.isGarageAvailable ? styles.formCheckboxError : ''
                  )}
                  label={label}
                  key={label}
                />
              ))}
            </div>
            <Error error={errors.isGarageAvailable} />
          </FormBlock>
          {values.isGarageAvailable == 'Yes' && (
            <FormBlock
              title={'How many carports available?'}
              isActive={storiesBlockActive}
              delay="0s"
            >
              <IconOptionButtons
                values={values}
                options={carportOptions}
                errors={errors}
                handleChange={handleChange}
              />
            </FormBlock>
          )}
        </FormLayout>
      )}
      {!!values?.isGarageAvailable && (
        <FormLayout title={'Location'}>
          <FormBlock
            title="Is it within the city limits?"
            isActive={locationBlockActive}
            delay="0.2s"
          >
            <div className={styles.CheckboxGroup}>
              {yesNoOptions.map(({ label, value }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      size="medium"
                      color="default"
                      name="isWithinCityLimit"
                      onChange={handleChange}
                      value={value}
                      checked={values?.isWithinCityLimit == value}
                    />
                  }
                  className={classNames(
                    styles.formCheckboxBlock,
                    errors.isWithinCityLimit ? styles.formCheckboxError : ''
                  )}
                  label={label}
                  key={label}
                />
              ))}
            </div>
            <Error error={errors.isWithinCityLimit} />
          </FormBlock>
          <FormBlock
            title="Is it serviced by a fire department?"
            isActive={fireDistrictBlockActive}
            delay="0.2s"
          >
            <div className={styles.CheckboxGroup}>
              {yesNoOptions.map(({ label, value }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      size="medium"
                      color="default"
                      name="isFireDistrict"
                      onChange={handleChange}
                      value={value}
                      checked={values?.isFireDistrict == value}
                    />
                  }
                  className={classNames(
                    styles.formCheckboxBlock,
                    errors.isFireDistrict ? styles.formCheckboxError : ''
                  )}
                  label={label}
                  key={label}
                />
              ))}
            </div>
            <Error error={errors.isFireDistrict} />
          </FormBlock>
          <FormBlock
            title={'Distance to fire hydrant (in feet)?'}
            isActive={fireHydrantDistanceActive}
            delay="0s"
          >
            <Select
              hasError={errors.fireHydrantDistance}
              onChange={handleChange}
              handleBlur={handleBlur}
              name="fireHydrantDistance"
              placeholder="Select"
              value={values?.fireHydrantDistance}
              options={DistanceToFireHydrant.map(item => {
                return {
                  value: item,
                  text: item,
                };
              })}
            />
          </FormBlock>
          <FormBlock
            title={'Distance to fire station (in miles)?'}
            isActive={fireStationDistanceActive}
            delay="0s"
          >
            <Select
              hasError={errors.fireStationDistance}
              onChange={handleChange}
              handleBlur={handleBlur}
              name="fireStationDistance"
              placeholder="Select"
              value={values?.fireStationDistance}
              options={DistanceToFireStation.map(item => {
                return {
                  value: item,
                  text: item,
                };
              })}
            />
          </FormBlock>
        </FormLayout>
      )}
    </>
  );
};

HouseInfoForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
};

export default HouseInfoForm;
