import React from 'react';
import PropTypes from 'prop-types';
import DarkBgPopup from '../../../../../popups/DarkBgPopup/DarkBgPopup';
import * as styles from './leaving-honest-policy.module.scss';
import letterLogo from '../../../../../../images/logos/hpLetterLogo.png';
import shieldLogo from '../../../../../../images/logos/hpDoubleShield.png';

const LeavingHonestPolicyPopup = ({ carrierName }) => {
  return (
    <DarkBgPopup>
      <div className={styles.popupContainer}>
        <div className={styles.logoContainer}>
          <img className={styles.shieldLogo} src={shieldLogo} alt="Shield Logo" />
          <img className={styles.letterLogo} src={letterLogo} alt="Letter Logo" />
        </div>
        <p className={styles.leavingText}>
          Taking you to {carrierName} to bind your policy—hold tight!
        </p>
        <p className={styles.notifText}>
          You are being redirected to a third-party website to complete your quote.
        </p>
      </div>
    </DarkBgPopup>
  );
};

LeavingHonestPolicyPopup.propTypes = {
  carrierName: PropTypes.string.isRequired,
};

export default LeavingHonestPolicyPopup;
