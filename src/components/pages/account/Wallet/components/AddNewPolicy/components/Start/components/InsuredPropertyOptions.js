import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../../../../../../inputs/TextInput';
import SelectInput from '../../../../../../../../inputs/Select/Select';
import { formatToZip, enforceFormat } from '../../../../../../../../../utils/validation';
import { allStates } from '../../../../../../../search/allStates';

const InsuredPropertyOptions = ({
  styles,
  formData,
  formValues,
  optionPos,
  handleChange,
  insuredOptionsErrors,
}) => {
  const handleAddressChange = ({ name, value }) => {
    let prev = formData;
    prev.insuranceOptions[optionPos][name] = value;
    handleChange([{ name: 'insuranceOptions', value: prev.insuranceOptions }]);
  };
  return (
    <div className={styles.formInputs}>
      <div className={styles.itemTitle}>Address</div>
      <TextInput
        value={formValues?.address}
        placeholder={'Street Address'}
        onChangeFunc={v => handleAddressChange({ name: 'address', value: v })}
        errors={insuredOptionsErrors && insuredOptionsErrors[optionPos]?.address}
      />
      <div className={styles.formInputsAddressInner}>
        <TextInput
          onChangeFunc={v => handleAddressChange({ name: 'city', value: v })}
          value={formValues?.city}
          placeholder={'City'}
          errors={insuredOptionsErrors && insuredOptionsErrors[optionPos]?.city}
        />
        <SelectInput
          options={allStates.map(item => {
            return {
              name: item,
              value: item,
            };
          })}
          value={formValues?.state}
          onChange={e =>
            handleAddressChange({
              name: 'state',
              value: e.target.value,
            })
          }
          errors={insuredOptionsErrors && insuredOptionsErrors[optionPos]?.state}
          placeholder={'Choose State'}
        />
        <TextInput
          onChangeFunc={v => handleAddressChange({ name: 'zipCode', value: v })}
          value={formValues?.zipCode}
          placeholder={'ZIP'}
          onKeyUpFunc={e => {
            const zip = formatToZip(e);
            handleAddressChange({ name: 'zipCode', value: zip });
          }}
          onKeyDownFunc={enforceFormat}
          errors={insuredOptionsErrors && insuredOptionsErrors[optionPos]?.zipCode}
        />
      </div>
    </div>
  );
};

InsuredPropertyOptions.propTypes = {
  styles: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  formValues: PropTypes.object.isRequired,
  optionPos: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  insuredOptionsErrors: PropTypes.array,
};

export default InsuredPropertyOptions;
