import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLayout from '../FormLayout';
import FormBlock from '../../../../form/FormBlock';
import Select from '../../../../FormSelect';
import Input from '../FormInput';
import { faCar, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import * as styles from './vehicles-form.module.scss';
import SecondaryLayout from '../SecondaryLayout';
import { getYears, getMakes, getModels, getStyles } from './api';
import { durations, ownershipType, primaryUseOptions } from '../../data';
import { AlertsContext } from '../../../../state/AlertsContext';

const checkBoxItems = [
  { label: 'One', name: 'one', value: 'one' },
  { label: 'Two', name: 'two', value: 'two' },
  { label: 'Three or more', name: 'threeOrMore', value: 'threeOrMore' },
];

const VehiclesForm = ({
  values,
  errors,
  handleChange,
  handleChangeArr,
  handleAddNewItem,
  handleAddOnCheck,
  handleRemoveOnCheck,
}) => {
  const [yearOption, setYearOption] = useState([]);
  const [makeOption, setMakeOption] = useState([]);
  const [modelOption, setModelOption] = useState([]);
  const [trimOption, setTrimOption] = useState([]);
  const [bindablePrepolutadedVin, setBindablePrepolutadedVin] = useState(null);

  const [yearLoading, setYearLoading] = useState(true);
  const [makeLoading, setMakeLoading] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);
  const [trimsLoading, setTrimsLoading] = useState(false);

  const { dispatchAlert } = useContext(AlertsContext);

  useEffect(() => {
    if (values.numberOfVehicles == 'one' && values.vehicles.length > 1)
      handleRemoveOnCheck('vehicles', 1);

    if (values.numberOfVehicles == 'two' && values.vehicles.length < 2)
      handleAddOnCheck('vehicles');

    if (values.numberOfVehicles == 'two' && values.vehicles.length > 2)
      handleRemoveOnCheck('vehicles', 2);

    if (values.numberOfVehicles == 'threeOrMore' && values.vehicles.length < 3)
      handleAddOnCheck('vehicles');

    if (values.numberOfVehicles == 'threeOrMore' && values.vehicles.length > 3)
      handleRemoveOnCheck('vehicles', 3);
  }, [values.numberOfVehicles]);

  useEffect(() => {
    getYears()
      .then(res => {
        const selectorYear = res?.data?.years;
        selectorYear.sort((a, b) => b - a);
        setYearOption(selectorYear);
        setYearLoading(false);
      })
      .catch(error => {
        console.error(error);
        dispatchAlert('Something went wrong! Please try again later');
      });
    values.vehicles.forEach(vehicle => {
      let { year, make, model } = vehicle;
      if (year) {
        GetMakes(year);
      }
      if (make) {
        GetModels(year, make);
      }
      if (model) {
        GetStyles({ year, make, model });
      }
    });
  }, []);

  const GetMakes = year => {
    setMakeLoading(true);
    getMakes({ year: year })
      .then(({ data }) => {
        setMakeLoading(false);
        setMakeOption(data.make);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const GetModels = (year, makeId) => {
    setModelLoading(true);
    getModels({ year, make: makeId })
      .then(({ data }) => {
        const models = data.model;
        if (_.isEmpty(models)) {
          setModelOption(['No model available']);
        } else {
          setModelOption(models);
        }
        setModelLoading(false);
      })
      .catch(err => {
        console.error(err);
      });
  };
  const GetStyles = ({ year, make, model }) => {
    setTrimsLoading(true);
    getStyles({ year, make, model })
      .then(({ data }) => {
        const trim = data.trim;
        if (_.isEmpty(trim)) {
          setTrimOption(['No trim available']);
        } else {
          setTrimOption(trim);
        }
        setTrimsLoading(false);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const formItems = [
    { label: 'Year', name: 'year', options: yearOption, loading: yearLoading },
    {
      label: 'Make',
      name: 'make',
      previous: 'year',
      options: makeOption,
      loading: makeLoading,
    },
    {
      label: 'Model',
      name: 'model',
      previous: 'make',
      options: modelOption,
      loading: modelLoading,
    },
    {
      label: 'Trim',
      name: 'trim',
      previous: 'model',
      options: trimOption,
      loading: trimsLoading,
    },
  ];

  const handleChangeData = (item, key) => {
    let clonedItem = _.cloneDeep(item);
    let { name, value } = clonedItem.target;
    let resetFields = [];
    if (name == 'year') {
      resetFields.push('make', 'model', 'trim', 'vin');
    } else if (name == 'make') {
      resetFields.push('model', 'trim', 'vin');
    } else if (name == 'model') {
      resetFields.push('trim', 'vin');
    }
    handleChangeArr({ ...clonedItem, field: 'vehicles', key, resetFields });
    if (name === 'trim' && value) {
      let newVin = value.split('|')[1];
      setBindablePrepolutadedVin({
        target: { name: 'vin', value: newVin },
        field: 'vehicles',
        key,
      });
    }
  };
  const vinActive = key => !!values.vehicles[key].trim;
  const annualMileageActive = key => vinActive(key) && !!values.vehicles[key].vin;
  const lengthOwnedActive = key =>
    annualMileageActive(key) && !!values.vehicles[key].annualMileage;
  const ownershipTypeActive = key =>
    lengthOwnedActive(key) && !!values.vehicles[key].lengthOwned;
  const primaryUseActive = key =>
    ownershipTypeActive(key) && !!values.vehicles[key].ownershipType;
  useEffect(() => {
    if (bindablePrepolutadedVin) {
      handleChangeArr(bindablePrepolutadedVin);
    }
  }, [bindablePrepolutadedVin]);
  const resolveOptions = (options, values, key, name) => {
    if (options.length === 0) {
      return [
        {
          text: values.vehicles[key][name],
          value: values.vehicles[key][name],
        },
      ];
    } else {
      if (name === 'trim') {
        return options.map(option => {
          return { text: option?.split('|')[0], value: option };
        });
      } else {
        return options.map(option => {
          return { text: option, value: option };
        });
      }
    }
  };
  const isCurrentVehicleActive = idx => {
    if (idx == 0) {
      return true;
    } else {
      let isFilled = true;
      let prevVehicle = values.vehicles[idx - 1];
      Object.values(prevVehicle).forEach(field => {
        if (!field) {
          isFilled = false;
        }
      });
      return isFilled;
    }
  };
  return (
    <>
      <div className={styles.FormIntroText}>
        <div className={styles.FormIntroIcon}>
          <FontAwesomeIcon icon={faCar} />
        </div>
        <FormLayout className={styles.formLayout}>
          <div className={styles.formTitle}>{`Next, let's add your vehicles`}</div>
          <p className={styles.questionText}>How many vehicles do you want to insure?</p>
          {checkBoxItems.map(({ label, name }) => (
            <FormControlLabel
              control={
                <Checkbox
                  color="default"
                  size="medium"
                  checked={name == values?.numberOfVehicles}
                  name={'numberOfVehicles'}
                  value={name}
                  onChange={handleChange}
                />
              }
              label={label}
              className={styles.Vehicleinputbox}
              key={name}
            />
          ))}
        </FormLayout>
      </div>
      {values?.numberOfVehicles && (
        <div>
          {values.vehicles.map((item, key) => (
            <SecondaryLayout
              title={
                key == 0
                  ? 'Primary Vehicle'
                  : key == 1
                  ? 'Second Vehicle'
                  : `Vehicle #${key + 1}`
              }
              fontSmall={true}
              className={styles.formBlockLayout}
              key={key}
            >
              {formItems.map(({ label, name, options, previous, loading }) => (
                <FormBlock
                  title={label}
                  isActive={
                    (name == 'year' || item[previous]) && isCurrentVehicleActive(key)
                  }
                  key={key + name}
                >
                  <Select
                    hasError={errors.make}
                    optionsLoading={loading}
                    onChange={event => {
                      handleChangeData(event, key);
                      name === 'year' && GetMakes(event.target.value);
                      name === 'make' &&
                        GetModels(values.vehicles[key].year, event.target.value);
                      name === 'model' &&
                        GetStyles({
                          year: values.vehicles[key].year,
                          make: values.vehicles[key].make,
                          model: event.target.value,
                        });
                    }}
                    inputClassName={styles.inputElement}
                    name={name}
                    placeholder="Choose one..."
                    value={values.vehicles[key][name]}
                    options={resolveOptions(options, values, key, name)}
                    key={'vehicles' + key + name}
                  />
                </FormBlock>
              ))}
              <FormBlock title="VIN" isActive={vinActive(key)}>
                <Input
                  hasError={errors.vin}
                  onChange={e => handleChangeData(e, key)}
                  name="vin"
                  placeholder="VIN"
                  type="text"
                  value={values.vehicles[key].vin}
                />
              </FormBlock>
              <FormBlock title="Annual Mileage" isActive={annualMileageActive(key)}>
                <Input
                  hasError={errors.annualMileage}
                  onChange={e => handleChangeData(e, key)}
                  name="annualMileage"
                  max={99999}
                  min={1000}
                  placeholder="10000"
                  type="number"
                  value={values.vehicles[key].annualMileage}
                />
              </FormBlock>
              <FormBlock title="Length Owned" isActive={lengthOwnedActive(key)}>
                <Select
                  hasError={errors.lengthOwned}
                  onChange={event => handleChangeData(event, key)}
                  inputClassName={styles.inputElement}
                  name={'lengthOwned'}
                  placeholder="Choose one..."
                  value={values.vehicles[key].lengthOwned}
                  options={durations.map(data => {
                    return { text: data, value: data };
                  })}
                />
              </FormBlock>
              <FormBlock title="Ownership Type" isActive={ownershipTypeActive(key)}>
                <Select
                  hasError={errors.ownershipType}
                  onChange={event => handleChangeData(event, key)}
                  inputClassName={styles.inputElement}
                  name={'ownershipType'}
                  placeholder="Choose one..."
                  value={values.vehicles[key].ownershipType}
                  options={ownershipType.map(data => {
                    return { text: data, value: data };
                  })}
                />
              </FormBlock>
              <FormBlock title="Primary Use" isActive={primaryUseActive(key)}>
                <Select
                  hasError={errors.primaryUse}
                  onChange={event => handleChangeData(event, key)}
                  inputClassName={styles.inputElement}
                  name={'primaryUse'}
                  placeholder="Choose one..."
                  value={values.vehicles[key].primaryUse}
                  options={primaryUseOptions.map(data => {
                    return { text: data, value: data };
                  })}
                />
              </FormBlock>
            </SecondaryLayout>
          ))}
          {values.numberOfVehicles == 'threeOrMore' && (
            <div
              className={styles.addVehicleBlock}
              onClick={() => handleAddNewItem('vehicles')}
            >
              <FontAwesomeIcon icon={faPlus} size="sm" />
              &nbsp;&nbsp;
              <a title="Add additional vehicle">Add additional vehicle</a>
            </div>
          )}
        </div>
      )}
    </>
  );
};

VehiclesForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  checkedValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handleCheckbox: PropTypes.func,
  selectedDriver: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  years: PropTypes.array,
  isEdit: PropTypes.bool,
  handleAddNewItem: PropTypes.func,
  handleChange: PropTypes.func,
  setSelectedDriver: PropTypes.func,
  handleChangeItem: PropTypes.func,
  handleRemoveItem: PropTypes.func,
  handleAddOnCheck: PropTypes.func,
  handleRemoveOnCheck: PropTypes.func,
  handleUserFirstStepDetails: PropTypes.func,
  handleChangeArr: PropTypes.func,
};

export default VehiclesForm;
