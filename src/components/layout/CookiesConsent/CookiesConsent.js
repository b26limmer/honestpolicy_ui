import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import * as styles from './cookies.module.scss';
import Button from '../../button/Button';
import PropTypes from 'prop-types';

const CookiesConsent = ({ setShowCookieConsentTool }) => {
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    let hasAnswered = localStorage.getItem('cookiesConsent');
    if (!hasAnswered) {
      setShowBar(true);
    }
  }, []);
  const handleConsentClick = consent => {
    let acceptedCookies = {
      strictlyNecessary: true,
      generalMarketingandAdvertising: true,
      socialMediaAdvertising: true,
      analytics: true,
      performanceAndFunctionality: true,
    };
    let declinedCookies = {
      strictlyNecessary: true,
      generalMarketingandAdvertising: false,
      socialMediaAdvertising: false,
      analytics: false,
      performanceAndFunctionality: false,
    };
    if (consent) {
      localStorage.setItem('cookiesConsent', JSON.stringify(acceptedCookies));
    } else {
      localStorage.setItem('cookiesConsent', JSON.stringify(declinedCookies));
    }
    setShowBar(false);
  };
  const handleConsentToolClick = () => {
    setShowCookieConsentTool(true);
    setShowBar(false);
  };
  return (
    <div className={showBar ? styles.cookiesConsentContainer : styles.hideBar}>
      <p className={styles.text}>
        We use cookies to provide, improve, protect and promote our services. Visit our{' '}
        <Link to="/privacypolicy">Privacy Policy</Link> to learn more. You can manage your
        personal preferences in our{' '}
        <button
          type="button"
          title="Open Cookie Consent Tool"
          className={styles.cookieConsentToolToggle}
          onClick={handleConsentToolClick}
        >
          Cookie Consent Tool
        </button>
        .
      </p>
      <div className={styles.buttonsContainer}>
        <Button onClick={() => handleConsentClick(false)} className={styles.declineBtn}>
          Decline
        </Button>
        <Button onClick={() => handleConsentClick(true)} className={styles.acceptBtn}>
          Accept All
        </Button>
      </div>
    </div>
  );
};

CookiesConsent.propTypes = {
  setShowCookieConsentTool: PropTypes.func.isRequired,
};

export default CookiesConsent;
