import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../../../../../../inputs/TextInput';

const InsuredPersonalOptions = ({
  styles,
  formData,
  formValues,
  optionPos,
  handleChange,
  insuredOptionsErrors,
}) => {
  const handlePersonalChange = ({ name, value }) => {
    let prev = formData;
    prev.insuranceOptions[optionPos][name] = value;
    handleChange([{ name: 'insuranceOptions', value: prev.insuranceOptions }]);
  };
  return (
    <>
      <div className={styles.itemTitle}>Plan Name</div>
      <div className={styles.formInputs}>
        <TextInput
          value={formValues?.planName}
          placeholder={'Plan Name'}
          onChangeFunc={v => handlePersonalChange({ name: 'planName', value: v })}
          errors={insuredOptionsErrors && insuredOptionsErrors[optionPos]?.planName}
        />
      </div>
    </>
  );
};

InsuredPersonalOptions.propTypes = {
  styles: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  formValues: PropTypes.object.isRequired,
  optionPos: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  insuredOptionsErrors: PropTypes.array,
};

export default InsuredPersonalOptions;
