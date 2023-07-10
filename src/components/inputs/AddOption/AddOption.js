import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './addOption.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import classNames from 'classnames';

const AddOption = ({ optionName, onClick, rootClass }) => {
  return (
    <div className={classNames(styles.addAnotherContainer, rootClass)}>
      <button type="button" onClick={onClick} className={styles.addOptionButton}>
        <FontAwesomeIcon className={styles.plusIcon} icon={faPlus} />
        {optionName}
      </button>
    </div>
  );
};

AddOption.propTypes = {
  optionName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  rootClass: PropTypes.string,
};

export default AddOption;
