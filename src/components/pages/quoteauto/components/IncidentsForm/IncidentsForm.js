import React from 'react';
import PropTypes from 'prop-types';
import FormLayout from '../FormLayout';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormBlock from '../../../../form/FormBlock';
import Select from '../../../../FormSelect';
import Input from '../FormInput';
import SecondaryLayout from '../SecondaryLayout';
import { faPlus, faCar, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from './incidents-form.module.scss';
import { incidentDescriptions, incidentType } from '../../data';
import { enforceFormat } from '../../../../../utils/validation';
import RemoveButton from '../../../../RemoveButton/RemoveButton';
import Error from '../../../../error/Error';
import classNames from 'classnames';

const IncidentsForm = ({
  values,
  errors,
  handleChange,
  handleChangeArr,
  handleAddNewItem,
  handleRemoveItem,
}) => {
  const handleChangeData = (item, key) => {
    handleChangeArr({ ...item, field: 'incidents', key });
  };

  const checkBoxItems = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];
  const stateOnQuote = values.garage_address_state || values.address_state;

  const getIncidentValue = (field, idx) => !!values.incidents[idx][field];
  const VehicleBlockActive = idx => getIncidentValue('driver', idx);
  const IncidentTypeBlockActive = idx => getIncidentValue('vehicle', idx);
  const DescriptionBlockActive = idx => getIncidentValue('type', idx);
  const IncidentDateBlockActive = idx => getIncidentValue('description', idx);
  const BodilyInjuryBlockActive = idx => getIncidentValue('date', idx);
  const PropertyDamageBlockActive = idx => getIncidentValue('bodily_injury', idx);
  const LossValueBlockActive = idx => getIncidentValue('date', idx);
  const PrayerForJudmentActive = idx => {
    let incident = values.incidents[idx];
    if (incident.type == 'loss') {
      return getIncidentValue('loss_value', idx);
    } else if (incident.type == 'accident') {
      return getIncidentValue('property_damage', idx);
    } else {
      return getIncidentValue('date', idx);
    }
  };

  return (
    <>
      <div className={styles.FormIntroText}>
        <div className={styles.FormIntroIcon}>
          <FontAwesomeIcon icon={faCar} />
        </div>
        <FormLayout className={styles.formLayout}>
          <div className={styles.formTitle}>{`Tell us about  your driving history`}</div>
          <p className={styles.questionText}>
            Have you been involved in a car incident in the last 6 years? &nbsp;&nbsp;{' '}
            <FontAwesomeIcon icon={faInfoCircle} color={'#008462'} />
          </p>
          {checkBoxItems.map(({ label, value }) => (
            <FormControlLabel
              control={
                <Checkbox
                  color="default"
                  size="medium"
                  name="hasIncidents"
                  value={value}
                  checked={values?.hasIncidents == value}
                  onChange={handleChange}
                />
              }
              label={label}
              className={classNames(
                styles.Historyinputbox,
                errors.hasIncidents ? styles.hasIncidentError : ''
              )}
              key={'incident-' + label}
            />
          ))}
        </FormLayout>
        {!!errors.hasIncidents && <Error error={errors.hasIncidents} />}
      </div>
      {values?.hasIncidents == 'Yes' && (
        <>
          {values?.incidents?.map((incident, idx) => (
            <SecondaryLayout
              title={
                <div className={styles.incidentTitle}>
                  Incident #{idx + 1}
                  {values.incidents.length > 1 && (
                    <RemoveButton onClick={() => handleRemoveItem('incidents', idx)} />
                  )}
                </div>
              }
              fontSmall={true}
              className={styles.formBlockLayout}
              key={`incidents-item-${idx}`}
            >
              <FormBlock isActive={true} title="Driver">
                <Select
                  hasError={
                    errors?.incidents?.length ? errors?.incidents[idx]?.driver : ''
                  }
                  onChange={data => {
                    handleChangeData(data, idx);
                  }}
                  inputClassName={styles.inputElement}
                  name="driver"
                  placeholder="Choose one..."
                  value={incident.driver}
                  options={values.drivers.map((driver, idx) => ({
                    text: `${driver.first_name} ${driver.last_name}`,
                    value: idx + 1,
                  }))}
                />
              </FormBlock>
              <FormBlock isActive={VehicleBlockActive(idx)} title="Vehicle">
                <Select
                  hasError={
                    errors?.incidents?.length ? errors?.incidents[idx]?.vehicle : ''
                  }
                  onChange={data => {
                    handleChangeData(data, idx);
                  }}
                  inputClassName={styles.inputElement}
                  name="vehicle"
                  placeholder="Choose one..."
                  value={incident.vehicle}
                  options={values.vehicles
                    .map((vehicle, idx) => ({
                      text: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
                      value: idx + 1,
                    }))
                    .concat([{ text: 'Other/Not listed', value: 0 }])}
                />
              </FormBlock>
              <FormBlock isActive={IncidentTypeBlockActive(idx)} title="Incident Type">
                <Select
                  hasError={errors?.incidents?.length ? errors?.incidents[idx]?.type : ''}
                  onChange={data => {
                    handleChangeData(data, idx);
                  }}
                  inputClassName={styles.inputElement}
                  name="type"
                  placeholder="Choose one..."
                  value={incident.type}
                  options={incidentType}
                />
              </FormBlock>
              <FormBlock isActive={DescriptionBlockActive(idx)} title="Description">
                <Select
                  hasError={
                    errors?.incidents?.length ? errors?.incidents[idx]?.description : ''
                  }
                  onChange={data => {
                    handleChangeData(data, idx);
                  }}
                  inputClassName={styles.inputElement}
                  name="description"
                  placeholder="Choose one..."
                  value={incident.description}
                  options={
                    incidentDescriptions[values.incidents[idx]?.type]?.map(value => ({
                      text: value,
                      value,
                    })) || []
                  }
                />
              </FormBlock>
              <FormBlock isActive={IncidentDateBlockActive(idx)} title="Incident Date">
                <Input
                  hasError={errors?.incidents?.length ? errors?.incidents[idx]?.date : ''}
                  onChange={e => handleChangeData(e, idx)}
                  name="date"
                  type="date"
                  max={new Date().toISOString().split('T')[0]}
                  value={incident?.date}
                />
              </FormBlock>
              {incident.type == 'accident' && (
                <>
                  <FormBlock
                    isActive={BodilyInjuryBlockActive(idx)}
                    title="Bodily Injury Damage Amount"
                  >
                    <Input
                      hasError={
                        errors?.incidents?.length
                          ? errors?.incidents[idx]?.bodily_injury
                          : ''
                      }
                      onKeyDown={enforceFormat}
                      onChange={e => handleChangeData(e, idx)}
                      name="bodily_injury"
                      type="number"
                      placeholder="Bodily Injury"
                      min={0}
                      value={incident?.bodily_injury}
                    />
                  </FormBlock>
                  <FormBlock
                    isActive={PropertyDamageBlockActive(idx)}
                    title="Property Damage Amount"
                  >
                    <Input
                      hasError={
                        errors?.incidents?.length
                          ? errors?.incidents[idx]?.property_damage
                          : ''
                      }
                      onKeyDown={enforceFormat}
                      onChange={e => handleChangeData(e, idx)}
                      name="property_damage"
                      type="number"
                      placeholder="Property Damage"
                      min={0}
                      value={incident?.property_damage}
                    />
                  </FormBlock>
                </>
              )}
              {incident.type == 'loss' && (
                <FormBlock isActive={LossValueBlockActive(idx)} title="Loss Value">
                  <Input
                    hasError={
                      errors?.incidents?.length ? errors?.incidents[idx]?.loss_value : ''
                    }
                    onKeyDown={enforceFormat}
                    onChange={e => handleChangeData(e, idx)}
                    name="loss_value"
                    type="number"
                    placeholder="Loss Value"
                    min={0}
                    value={incident?.loss_value}
                  />
                </FormBlock>
              )}
              {stateOnQuote == 'North Carolina' && (
                <FormBlock
                  title="Prayer for Judment?"
                  isActive={PrayerForJudmentActive(idx)}
                >
                  <div className={styles.checkboxGroup}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="default"
                          name="prayer_for_judgement"
                          value="yes"
                          onClick={e => handleChangeData(e, idx)}
                          checked={incident.prayer_for_judgement == 'yes'}
                        />
                      }
                      label="Yes"
                      className={styles.InputSmall}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="default"
                          name="prayer_for_judgement"
                          value="no"
                          onClick={e => handleChangeData(e, idx)}
                          checked={incident.prayer_for_judgement == 'no'}
                        />
                      }
                      label="No"
                      className={styles.InputSmall}
                    />
                  </div>
                  <Error
                    error={
                      errors?.incidents?.length
                        ? errors?.incidents[idx]?.prayer_for_judgement
                        : ''
                    }
                  />
                </FormBlock>
              )}
            </SecondaryLayout>
          ))}
          <div
            className={styles.additionalBlock}
            onClick={() => handleAddNewItem('incidents')}
          >
            <FontAwesomeIcon icon={faPlus} size="sm" />
            &nbsp;&nbsp;
            <a title="Add additional incident">Add additional incident</a>
          </div>
        </>
      )}
    </>
  );
};

IncidentsForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  selectedDriver: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChangeArr: PropTypes.func,
  handleChange: PropTypes.func,
  setSelectedDriver: PropTypes.func,
  handleAddNewItem: PropTypes.func,
  handleRemoveItem: PropTypes.func,
};

export default IncidentsForm;
