import React, { useEffect, useRef, useState } from 'react';
import * as styles from './icon-option-buttons.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { StaticAlert } from '../../../../alert';

const IconOptionButton = ({ options, handleChange, values, errors }) => {
  const [message, setMessage] = useState('');
  const alertRef = useRef();

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        alertRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 800);
    }
  }, [message]);

  return (
    <>
      <div className={styles.houseIconsContainer}>
        {options.map((option, idx) => (
          <button
            key={idx}
            type="button"
            onTouchEnd={e => e.stopPropagation()}
            onClick={e => {
              e.stopPropagation();
              handleChange({
                target: { name: option.property, value: option.value },
              });
              if (option.description) {
                setMessage(option.description, 'info');
              }
            }}
            className={classNames(
              values[option.property] == option.value
                ? styles.houseIconButtonSelected
                : styles.houseIconButton,
              errors[option.property] ? styles.optionIconHasError : ''
            )}
          >
            <img src={option.image} className={styles.iconOptionImage} />
            {option.title}
          </button>
        ))}
      </div>
      <div ref={alertRef}>
        <StaticAlert message={message} alertType="info" />
      </div>
    </>
  );
};

IconOptionButton.propTypes = {
  options: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

export default IconOptionButton;
