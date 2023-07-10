import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, TextField } from '@mui/material';
import * as styles from './autocomplete-carriers.module.scss';
import Error from '../../error/Error';
import classNames from 'classnames';

const AutocompleteCarriers = ({
  values,
  carriers,
  handleChange,
  carrierPropertyToChange,
  errors,
}) => {
  return (
    <>
      <Autocomplete
        autoHighlight={true}
        handleHomeEndKeys={true}
        disableClearable={false}
        classes={{
          focused: styles.inputFocused,
          inputRoot: classNames(
            styles.autoCompleteRoot,
            errors[carrierPropertyToChange] ? 'input-has-err' : '',
            errors[carrierPropertyToChange] ? styles.hasError : ''
          ),
          option: styles.autocompleteOption,
        }}
        autoComplete
        clearOnBlur={false}
        value={values[carrierPropertyToChange]}
        options={carriers.map(item => ({ value: item, label: item }))}
        onChange={(e, selected) => {
          e.preventDefault();
          handleChange({
            target: { value: selected?.value || selected, name: carrierPropertyToChange },
          });
        }}
        isOptionEqualToValue={(option, value) => {
          return option.value == value;
        }}
        renderInput={params => (
          <TextField placeholder="Select carrier" variant="outlined" {...params} />
        )}
      />
      {!!errors[carrierPropertyToChange] && (
        <Error error={errors[carrierPropertyToChange]} />
      )}
    </>
  );
};

AutocompleteCarriers.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  carriers: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  carrierPropertyToChange: PropTypes.string.isRequired,
};

export default AutocompleteCarriers;
