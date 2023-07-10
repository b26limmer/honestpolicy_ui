import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as styles from './plus-icon.module.scss';

const PlusIcon = ({ root, onClick }) => {
  return (
    <button onClick={onClick} className={classNames(styles.plusIcon, root)}>
      +
    </button>
  );
};
PlusIcon.defaultProps = {
  onClick: () => {},
};
PlusIcon.propTypes = {
  root: PropTypes.object,
  onClick: PropTypes.func,
};

export default PlusIcon;
