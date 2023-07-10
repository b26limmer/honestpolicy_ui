import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from './iconOption.module.scss';
import classNames from 'classnames';

const IconOptions = ({ options, onChange, multipleSelect, selected }) => {
  const handleChange = (e, option) => {
    e.preventDefault();
    e.stopPropagation();
    let previous = selected;
    if (multipleSelect) {
      onChange([...previous, option]);
    } else {
      onChange(option);
    }
  };
  return (
    <div className={styles.container}>
      {options.map((option, idx) => (
        <button
          key={idx}
          className={classNames(
            styles.iconOptionButton,
            !multipleSelect ? (selected.text === option.text ? styles.selected : '') : ''
          )}
          onClick={e => handleChange(e, option)}
        >
          <FontAwesomeIcon className={styles.icon} icon={option.icon} />
          <p className={styles.iconName}>{option.text}</p>
        </button>
      ))}
    </div>
  );
};
IconOptions.defaulProps = {
  multipleSelect: false,
};
IconOptions.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  multipleSelect: PropTypes.bool,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
};

export default IconOptions;
