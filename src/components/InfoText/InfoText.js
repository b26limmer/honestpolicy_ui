import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as styles from './info-text.module.scss';
import classNames from 'classnames';

const InfoText = ({ text, helpText, className }) => {
  const [showHelpText, setShowHelpText] = useState(false);
  return (
    <span
      className={classNames(styles.infoContainer, className)}
      onMouseLeave={() => setShowHelpText(false)}
      onMouseOver={() => setShowHelpText(true)}
      onClick={e => e.stopPropagation() && e.preventDefault()}
    >
      <i className={classNames(styles.infoIcon, text ? styles.mr : '')}>i</i>
      {!!text && <p className={styles.infoText}>{text}</p>}
      {!!showHelpText && !!helpText && (
        <span className={styles.helpTextContainer}>
          <span>{helpText}</span>
        </span>
      )}
    </span>
  );
};

InfoText.propTypes = {
  text: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  helpText: PropTypes.string,
  className: PropTypes.string,
};

export default InfoText;
