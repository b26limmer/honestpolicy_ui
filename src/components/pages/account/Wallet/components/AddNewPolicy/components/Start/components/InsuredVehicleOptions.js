import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { years } from '../../../policyFormData';
import { CircularProgress } from '@mui/material';
import TextInput from '../../../../../../../../inputs/TextInput';
import SelectInput from '../../../../../../../../inputs/Select/Select';
import {
  getMakes,
  getModels,
  getStyles,
} from '../../../../../../../quoteauto/components/VehiclesForm/api';

const InsuredVehicleOptions = ({
  styles,
  formData,
  formValues,
  optionPos,
  handleChange,
  insuredOptionsErrors,
}) => {
  const [loadingMake, setLoadingMake] = useState(false);
  const [loadingModel, setLoadingModel] = useState(false);
  const [loadingTrims, setLoadingTrims] = useState(false);
  const mounted = useRef();

  let requests = formData.insuranceOptions[optionPos].requests;
  const categoryId = formData.insuranceOptions[optionPos].selectedInsurance.id;
  const handleChangeYear = ({ value }) => {
    let prev = formData;
    prev.insuranceOptions[optionPos].year = value;
    prev.insuranceOptions[optionPos].make = '';
    prev.insuranceOptions[optionPos].model = '';
    prev.insuranceOptions[optionPos].style = '';
    handleChange([{ name: 'insuranceOptions', value: prev.insuranceOptions }]);
    if (categoryId) {
      setLoadingMake(true);
      getMakes({ year: value }).then(({ data }) => {
        if (mounted.current) {
          prev.insuranceOptions[optionPos].requests = {
            makes: data.make,
            models: [],
            styles: [],
          };
          handleChange([
            {
              name: 'insuranceOptions',
              value: prev.insuranceOptions,
            },
          ]);
          setLoadingMake(false);
        }
      });
    }
  };
  const handleChangeMake = ({ value }) => {
    let prev = formData;
    prev.insuranceOptions[optionPos].make = value;
    prev.insuranceOptions[optionPos].model = '';
    prev.insuranceOptions[optionPos].style = '';
    handleChange([{ name: 'insuranceOptions', value: prev.insuranceOptions }]);
    if (categoryId) {
      setLoadingModel(true);
      getModels({
        year: formValues.year,
        make: value,
      }).then(({ data }) => {
        if (mounted.current) {
          prev.insuranceOptions[optionPos].requests = {
            ...requests,
            models: data.model,
            styles: [],
          };
          handleChange([
            {
              name: 'insuranceOptions',
              value: prev.insuranceOptions,
            },
          ]);
          setLoadingModel(false);
        }
      });
    }
  };
  const handleModelChange = ({ value }) => {
    let prev = formData;
    prev.insuranceOptions[optionPos].model = value;
    prev.insuranceOptions[optionPos].style = '';
    if (!categoryId) {
      prev.insuranceOptions[optionPos].style = 'no-trim-available';
    }
    let { year, make } = prev.insuranceOptions[optionPos];
    handleChange([{ name: 'insuranceOptions', value: prev.insuranceOptions }]);
    if (categoryId) {
      setLoadingTrims(true);
      getStyles({
        year: year,
        make: make,
        model: value,
      }).then(({ data }) => {
        setLoadingTrims(false);
        let prev = formData;
        if (!data.trim.length) {
          prev.insuranceOptions[optionPos].style = 'no-trim-available';
        } else {
          prev.insuranceOptions[optionPos].requests = {
            ...requests,
            styles: data.trim,
          };
        }
        handleChange({
          name: 'insuranceOptions',
          value: prev.insuranceOptions,
        });
      });
    }
  };
  const handleTrimChange = ({ value }) => {
    let prev = formData;
    prev.insuranceOptions[optionPos].style = value;
    handleChange([{ name: 'insuranceOptions', value: prev.insuranceOptions }]);
  };
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <>
      <div className={styles.itemTitle}>Year</div>
      <SelectInput
        title="Year"
        errors={insuredOptionsErrors && insuredOptionsErrors[optionPos]?.year}
        options={years.map(year => {
          return { name: year.year, value: year.year };
        })}
        value={formValues?.year}
        onChange={e =>
          handleChangeYear({
            value: e.target.value,
          })
        }
      />
      {!categoryId ? (
        <>
          <div className={styles.itemTitle}>Make</div>
          <TextInput
            placeholder="What type of vehicle is this"
            value={formValues?.make}
            errors={insuredOptionsErrors && insuredOptionsErrors[optionPos]?.make}
            onChangeFunc={value => handleChangeMake({ value })}
          />
          <div className={styles.itemTitle}>Model</div>
          <TextInput
            placeholder="What's the model type"
            value={formValues?.model}
            errors={insuredOptionsErrors && insuredOptionsErrors[optionPos]?.model}
            onChangeFunc={value => handleModelChange({ value })}
          />
        </>
      ) : (
        <>
          <div className={styles.itemTitle}>Make</div>
          {loadingMake ? (
            <CircularProgress />
          ) : (
            <SelectInput
              title="Make"
              errors={insuredOptionsErrors && insuredOptionsErrors[optionPos]?.make}
              options={requests?.makes?.map(make => {
                return {
                  name: make,
                  value: make,
                };
              })}
              value={formValues?.make}
              onChange={e =>
                handleChangeMake({
                  value: e.target.value,
                })
              }
            />
          )}
          <div className={styles.itemTitle}>Model</div>
          {loadingModel ? (
            <CircularProgress />
          ) : (
            <SelectInput
              title="Model"
              errors={insuredOptionsErrors && insuredOptionsErrors[optionPos]?.model}
              options={requests?.models?.map(model => {
                return {
                  name: model,
                  value: model,
                };
              })}
              value={formValues?.model}
              onChange={e =>
                handleModelChange({
                  value: e.target.value,
                })
              }
            />
          )}
          {loadingTrims ? (
            <>
              <div className={styles.itemTitle}>Style</div>
              <CircularProgress />
            </>
          ) : (
            <>
              <div className={styles.itemTitle}>Style</div>
              <SelectInput
                title="Trim"
                errors={insuredOptionsErrors && insuredOptionsErrors[optionPos]?.style}
                options={requests?.styles?.map(name => {
                  return {
                    name: name,
                    value: name,
                  };
                })}
                value={formValues?.style}
                onChange={e =>
                  handleTrimChange({
                    value: e.target.value,
                  })
                }
              />
            </>
          )}
        </>
      )}
    </>
  );
};

InsuredVehicleOptions.propTypes = {
  styles: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  formValues: PropTypes.object.isRequired,
  optionPos: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  insuredOptionsErrors: PropTypes.array,
};

export default InsuredVehicleOptions;
