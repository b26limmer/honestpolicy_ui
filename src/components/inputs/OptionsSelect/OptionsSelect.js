import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as styles from './optionsSelect.module.scss';
import { Checkbox } from '@mui/material';
import classNames from 'classnames';
import AddOption from '../AddOption/AddOption';
import TextInput from '../TextInput';
import RemoveButton from '../../RemoveButton/RemoveButton';
import InfoText from '../../InfoText/InfoText';

const OptionsSelect = ({
  options,
  onChange,
  multipleSelect,
  errors,
  selected,
  onCheckComponent,
  canAddEditableOption,
  handleAddOption,
  addOptionButtonText,
  hideErrorMessage,
}) => {
  const [hideOptions, setHideOptions] = useState(true);
  const handleEvent = e => {
    e && e.stopPropagation();
  };
  const handleChange = (e, changedOption, optionIndex) => {
    handleEvent(e);
    let prevOptions = options;
    if (multipleSelect) {
      prevOptions[optionIndex].value = !changedOption.value;
      prevOptions[optionIndex].name = changedOption.name;
    } else {
      prevOptions.forEach((option, idx) => {
        if (idx === optionIndex) {
          option.value = !changedOption.value;
        } else {
          option.value = false;
        }
      });
    }
    onChange(prevOptions);
  };
  const handleCustomOptionChange = (newName, option, idx) => {
    let changedOption = option;
    changedOption.name = newName;
    changedOption.value = !option.value;
    handleChange(false, changedOption, idx);
  };
  const handleRemoveOption = (e, idx) => {
    handleEvent(e);
    let prevOptions = options;
    prevOptions.splice(idx, 1);
    onChange(prevOptions);
  };
  const optionsLength = options?.length;
  return (
    <>
      <div
        className={styles.container}
        style={{ '--columns': optionsLength > 10 ? 2 : 1 }}
      >
        {options?.map((option, idx) => (
          <div
            key={idx}
            className={classNames(
              styles.optionContainer,
              idx > 10 && hideOptions ? styles.hideOption : ''
            )}
          >
            <button
              className={classNames(styles.optionButton, errors ? styles.hasError : '')}
              onClick={e => handleChange(e, option, idx)}
            >
              <div className={styles.checkNameContainer}>
                <Checkbox
                  color="default"
                  classes={{ root: styles.checked }}
                  checked={
                    selected !== undefined ? selected === option.name : option.value
                  }
                  onClick={e => handleChange(e, option, idx)}
                  onChange={e => handleEvent(e)}
                />
                {option.isCustomOption ? (
                  <TextInput
                    onClick={e => handleEvent(e)}
                    onKeyDownFunc={e => handleEvent(e)}
                    onKeyUpFunc={e => handleEvent(e)}
                    value={option.name}
                    onChangeFunc={newName =>
                      handleCustomOptionChange(newName, option, idx)
                    }
                  />
                ) : (
                  <p className={styles.optionName}>{option.name}</p>
                )}
              </div>
              {!!option?.helpText && (
                <InfoText className={styles.infoText} helpText={option.helpText} />
              )}
              {!!option.value && onCheckComponent}
            </button>
            {!!option.isCustomOption && (
              <RemoveButton
                rootClassname={styles.removeButton}
                onClick={e => handleRemoveOption(e, idx)}
                showText={false}
              />
            )}
          </div>
        ))}
        {!!hideOptions && options?.length > 10 && (
          <button className={styles.showMoreButton} onClick={() => setHideOptions(false)}>
            Show more ({options?.length})
          </button>
        )}
      </div>
      <p className={errors && !hideErrorMessage ? styles.hasError : styles.hide}>
        {errors}
      </p>
      {!!canAddEditableOption && (
        <AddOption onClick={handleAddOption} optionName={addOptionButtonText} />
      )}
    </>
  );
};
OptionsSelect.defaulProps = {
  multipleSelect: false,
  canAddEditableOption: false,
  hideErrorMessage: false,
  handleAddOption: () => {},
};
OptionsSelect.propTypes = {
  selected: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  multipleSelect: PropTypes.bool,
  errors: PropTypes.string,
  onCheckComponent: PropTypes.node,
  canAddEditableOption: PropTypes.bool,
  handleAddOption: PropTypes.func,
  addOptionButtonText: PropTypes.string,
  hideErrorMessage: PropTypes.bool,
};

export default OptionsSelect;
