import React from 'react';
import PropTypes from 'prop-types';
import DarkBgPopup from '../../../../../popups/DarkBgPopup/DarkBgPopup';
import hpLogo from '../../../../../../images/main-logo.png';
import Button from '../../../../../form-button/FormButton';
import * as styles from './selected-popup.module.scss';
import isBindableOpen from '../../../../../../utils/isBindableOpen';

const SelectedQuotePopup = ({ closeFunc }) => {
  const isOpenMessage = `\
  Great choice! An Honest Policy Agent will call you now to finish binding this
  policy for you.
  <br />
  <br />
  If you prefer, you can call us at <a title="Call us" href="tel:+18772908182">
    (877) 290-8182
  </a>`;
  const isCloseMessage = `\
  An agent is not currently available, but one will \
  call during our regular hours of 8 AM - 9 PM EST M-F and \
  10 AM - 6 PM EST on Saturdays`;
  const message = isBindableOpen() ? isOpenMessage : isCloseMessage;
  return (
    <DarkBgPopup>
      <div className={styles.popupContainer}>
        <img src={hpLogo} className={styles.hpLogo} alt="HonestPolicy Logo" />
        <p dangerouslySetInnerHTML={{ __html: message }} />
        <Button onClick={() => closeFunc()}>Close</Button>
      </div>
    </DarkBgPopup>
  );
};

SelectedQuotePopup.propTypes = {
  closeFunc: PropTypes.func.isRequired,
};

export default SelectedQuotePopup;
