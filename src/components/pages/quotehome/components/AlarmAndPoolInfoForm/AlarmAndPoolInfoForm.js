import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from '../../../../FormSelect/FormSelect';
import FormLayout from '../../../../FormLayout';
import FormBlock from '../../../../form/FormBlock';
import * as styles from './Alarm-and-pool-info.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShield } from '@fortawesome/pro-regular-svg-icons';
import OptionsSelect from '../../../../inputs/OptionsSelect/OptionsSelect';
import axios from 'axios';
import {
  AirConditioningTypes,
  AlarmTypes,
  DogBreedTypes,
  HouseInfoIcons,
} from '../../data';
import { convertStateNameToCode } from '../../../../../utils/states';
import classNames from 'classnames';
import { Checkbox, FormControlLabel } from '@mui/material';
import Error from '../../../../error/Error';
import IconOptionButtons from '../IconOptionButtons';

const AlarmAndPoolInfoForm = ({ values, errors, handleChange, handleBlur }) => {
  const [dogBreeds, setDogBreeds] = useState([]);
  const yesNoOptions = [
    { name: 'Yes', value: false },
    { name: 'No', value: false },
  ];
  const handleInitialUpdatesChange = options => {
    let selected = options.filter(option => option.value == true)[0];
    let value = false;
    if (selected.name === 'Yes') {
      value = true;
    }
    handleChange({ target: { name: 'hasSecurityFeatures', value: value } });
  };
  const getDogBreeds = () => {
    let dogBreedsEndpoint = `https://services.hartvillegroup.com/quoting/values/breeds/dog?stateCode=${convertStateNameToCode(
      values.addressState
    )}`;
    axios
      .get(dogBreedsEndpoint)
      .then(({ data }) => setDogBreeds(data))
      .catch(error => console.error(error));
  };
  const getFilteredDogBreedOptions = () => {
    if (dogBreeds.length) {
      let dogBreedType = values.dogBreedType;
      if (dogBreedType) {
        if (values.dogBreedType === 'PureBred') {
          dogBreedType = 'PureBreed';
        }
      }
      return dogBreeds
        .filter(dog => (dogBreedType ? dog.type === dogBreedType : true))
        .map(dogBreed => dogBreed.name);
    } else return [];
  };
  const { swimmingPool: swimmingPoolOptions } = HouseInfoIcons;
  const featureOptions = [
    {
      name: 'Smoke Detector',
      value: values?.hasSmokeDetector,
      property: 'hasSmokeDetector',
    },
    {
      name: 'Sprinkler System',
      value: values?.hasSprinklerSystem,
      property: 'hasSprinklerSystem',
    },
    {
      name: 'Fire Extinguisher',
      value: values?.hasFireExtinguisher,
      property: 'hasFireExtinguisher',
    },
    {
      name: 'Fire Alarm',
      value: values?.hasFireAlarm,
      property: 'hasFireAlarm',
      childQuestions: [
        {
          name: 'Fire Alarm Type',
          value: values?.fireAlarmType,
          options: AlarmTypes,
          property: 'fireAlarmType',
        },
      ],
    },
    { name: 'Dead Bolt', value: values?.hasDeadBolt, property: 'hasDeadBolt' },
    {
      name: 'Burglar Alarm',
      value: values?.hasBurglarAlarm,
      property: 'hasBurglarAlarm',
      childQuestions: [
        {
          name: 'Burglar Alarm Type',
          value: values?.burglarAlarmType,
          options: AlarmTypes,
          property: 'burglarAlarmType',
        },
      ],
    },
    {
      name: 'Dog on Premises',
      value: values?.hasDogOnPremises,
      property: 'hasDogOnPremises',
      childQuestions: [
        {
          name: 'Dog Breed Type',
          value: values?.dogBreedType,
          options: DogBreedTypes,
          property: 'dogBreedType',
        },
        {
          name: 'Dog Breed',
          value: values?.dogBreed,
          options: getFilteredDogBreedOptions(),
          property: 'dogBreed',
        },
        {
          name: 'Animals Bite',
          value: values?.animalsBite,
          options: yesNoOptions,
          property: 'animalsBite',
          questionType: 'bool',
        },
      ],
    },
    {
      name: 'Swimming Pool',
      value: values?.hasSwimmingPool,
      property: 'hasSwimmingPool',
      childQuestions: [
        {
          name: 'Swimming Pool Fenced',
          value: values?.swimmingPoolFenced,
          options: yesNoOptions,
          property: 'swimmingPoolFenced',
          questionType: 'bool',
        },
        {
          name: 'Swimming Pool Type',
          value: values?.swimmingPoolType,
          options: swimmingPoolOptions,
          property: 'swimmingPoolType',
          questionType: 'iconOptions',
        },
      ],
    },
    {
      name: 'Air Conditioner',
      value: values?.hasAirConditioned,
      property: 'hasAirConditioned',
      childQuestions: [
        {
          name: 'Air Conditioning Type',
          value: values?.airConditioningType,
          options: AirConditioningTypes,
          property: 'airConditioningType',
        },
      ],
    },
  ];
  const handleSecurityChange = (name, value) => {
    let info = { target: { name: name, value: value } };
    handleChange(info);
    handleBlur(info);
  };
  useEffect(() => {
    getDogBreeds();
  }, []);

  return (
    <>
      <div className={styles.FormIntroText}>
        <div className={styles.FormIntroIcon}>
          <FontAwesomeIcon icon={faShield} size={'lg'} />
        </div>
        <FormLayout
          title={`Let’s get a few more details.`}
          index={0}
          delay={0}
          className={styles.FormIntro}
        >
          <p className={styles.FormIntroMiniText}>
            Do you want to provide more details in order to get a more accurate quote?
          </p>
          <div className={styles.StateFieldWrapper}>
            <OptionsSelect
              options={yesNoOptions}
              onChange={v => handleInitialUpdatesChange(v)}
              selected={
                values?.hasSecurityFeatures !== undefined
                  ? values?.hasSecurityFeatures
                    ? 'Yes'
                    : 'No'
                  : ''
              }
              multipleSelect={false}
              errors={errors?.hasSecurityFeatures}
            />
          </div>
        </FormLayout>
      </div>
      {!!values?.hasSecurityFeatures && (
        <FormLayout title={'Additional details'}>
          <FormBlock
            title={'Check the features you have:'}
            isActive
            delay="0s"
            rootClassName={styles.featureOptionsContainer}
          >
            {featureOptions.map((option, idx) => (
              <Fragment key={idx}>
                <OptionsSelect
                  options={[{ name: option.name, value: option.value }]}
                  onChange={changedOption =>
                    handleSecurityChange(option.property, changedOption[0].value)
                  }
                  errors={errors[option.property] || errors.featureOptions}
                  hideErrorMessage={!!errors.featureOptions}
                  multipleSelect={false}
                />
                {!!option.childQuestions && option.value && (
                  <div className={styles.optionsContainer}>
                    {option.childQuestions.map(
                      ({ questionType, name, options, property, value }, idx) =>
                        questionType == 'bool' ? (
                          <FormBlock
                            key={idx}
                            title={name}
                            isActive={true}
                            delay="0s"
                            rootClassName={styles.roofInfoBlockChild}
                          >
                            <div className={styles.CheckboxGroup}>
                              {yesNoOptions.map(({ name: label }) => (
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      size="medium"
                                      color="default"
                                      name={property}
                                      onChange={handleChange}
                                      value={label}
                                      checked={values[property] == label}
                                    />
                                  }
                                  className={classNames(
                                    styles.formCheckboxBlock,
                                    errors[property] ? styles.formCheckboxError : ''
                                  )}
                                  label={label}
                                  key={label}
                                />
                              ))}
                            </div>
                          </FormBlock>
                        ) : questionType == 'iconOptions' ? (
                          <FormBlock
                            key={idx}
                            title={name}
                            isActive={true}
                            delay="0s"
                            rootClassName={styles.roofInfoBlockChild}
                          >
                            <IconOptionButtons
                              values={values}
                              options={options}
                              errors={errors}
                              handleChange={handleChange}
                            />
                          </FormBlock>
                        ) : (
                          <FormBlock
                            key={idx}
                            title={name}
                            isActive={true}
                            delay="0s"
                            rootClassName={styles.roofInfoBlockChild}
                          >
                            <Select
                              hasError={errors[property]}
                              onChange={handleChange}
                              name={property}
                              placeholder="Choose one..."
                              value={value || ''}
                              options={options.map(text => {
                                return { value: text, text: text };
                              })}
                            />
                          </FormBlock>
                        )
                    )}
                  </div>
                )}
              </Fragment>
            ))}
          </FormBlock>
          {!!errors.featureOptions && <Error error={errors.featureOptions} />}
        </FormLayout>
      )}
    </>
  );
};

AlarmAndPoolInfoForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
};

export default AlarmAndPoolInfoForm;
