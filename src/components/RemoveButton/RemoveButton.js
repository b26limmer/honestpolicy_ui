import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './removeButton.module.scss';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-regular-svg-icons';

const RemoveButton = ({ onClick, showClearIcon, rootClassname, children, showText }) => {
  return (
    <button className={classNames(rootClassname, styles.removeButton)} onClick={onClick}>
      {showClearIcon && (
        <FontAwesomeIcon
          icon={faTimes}
          className={classNames(styles.icon, !showText ? styles.justIcon : '')}
        />
      )}
      {showText && (children || 'Remove')}
    </button>
  );
};
RemoveButton.defaultProps = {
  showClearIcon: true,
  showText: true,
};
RemoveButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  showClearIcon: PropTypes.bool,
  rootClassname: PropTypes.string,
  showText: PropTypes.bool,
};

export default RemoveButton;
