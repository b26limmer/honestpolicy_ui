import React, { useState } from 'react';
import { Link } from 'gatsby';
import * as styles from './cookies-tool.module.scss';
import Button from '../../button/Button';
import PropTypes from 'prop-types';
import Switch from '../../inputs/Switch/Switch';

const CookiesConsentTool = ({ setShowCookieConsentTool, showCookieConsentTool }) => {
  const [cookieConsent, setCookieConsent] = useState({
    strictlyNecessary: true,
    generalMarketingandAdvertising: true,
    socialMediaAdvertising: true,
    analytics: true,
    performanceAndFunctionality: true,
  });

  const savePreferences = () => {
    localStorage.setItem('cookiesConsent', JSON.stringify(cookieConsent));
    setShowCookieConsentTool(false);
  };
  const checkIfAny = () => {
    let check = false;
    for (let index = 0; index < Object.entries(cookieConsent).length; index++) {
      let cookie = Object.entries(cookieConsent)[index];
      if (cookie[1] && cookie[0] !== 'strictlyNecessary') {
        check = true;
        break;
      }
    }
    return check;
  };
  const countChecked = () => {
    let count = 0;
    for (let index = 0; index < Object.entries(cookieConsent).length; index++) {
      let cookie = Object.entries(cookieConsent)[index];
      if (cookie[1] && cookie[0] !== 'strictlyNecessary') {
        count += 1;
      }
    }
    return count;
  };
  const handleAllSwitches = () => {
    if (checkIfAny()) {
      setCookieConsent({
        strictlyNecessary: true,
        generalMarketingandAdvertising: false,
        socialMediaAdvertising: false,
        analytics: false,
        performanceAndFunctionality: false,
      });
    } else {
      setCookieConsent({
        strictlyNecessary: true,
        generalMarketingandAdvertising: true,
        socialMediaAdvertising: true,
        analytics: true,
        performanceAndFunctionality: true,
      });
    }
  };
  const handleSwitchChange = name => {
    setCookieConsent({ ...cookieConsent, [name]: !cookieConsent[name] });
  };
  const cookiesType = [
    {
      title: 'Strictly Necessary',
      name: 'strictlyNecessary',
      isEditable: false,
      definition:
        'Cookies that are used to operate the website and services, such as to log you in and keep your account secure.',
    },
    {
      title: 'General Marketing and Advertising',
      name: 'generalMarketingandAdvertising',
      isEditable: true,
      definition:
        'Cookies that are used by Honest Policy and our partners to better understand the types of individuals who are interested in our products and services and how we can promote those services based on that information.',
    },
    {
      title: 'Social Media Advertising',
      name: 'socialMediaAdvertising',
      isEditable: true,
      definition:
        'Cookies that are used by Honest Policy and our partners to understand the effectiveness of our advertisements on social media services. These cookies also help them understand your advertising preferences so they can more effectively show you those of our advertisements that are relevant to your interests.',
    },
    {
      title: 'Analytics',
      name: 'analytics',
      isEditable: true,
      definition:
        'Cookies that help us and our partners understand how our customers engage with our websites, such as usage statistics, in order to improve and customise our services.',
    },
    {
      title: 'Performance and Functionality',
      name: 'performanceAndFunctionality',
      isEditable: true,
      definition:
        'Cookies that help us remember your preferences and settings in order to improve your experience when interacting with our sites and services.',
    },
  ];
  return (
    <div
      className={
        showCookieConsentTool ? styles.cookiesConsentToolContainer : styles.hideTool
      }
    >
      <h2 className={styles.cookiesTitle}>Update cookie preferences</h2>
      <p className={styles.brief}>
        Honest Policy uses different categories of cookies to provide, protect, improve
        and promote our website and services. Information on these categories and their
        purposes are described below. For more information, please see our{' '}
        <Link to="/privacypolicy">Privacy Policy</Link> page.
      </p>
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <h3>Categories {`${countChecked()} of 4 allowed`}</h3>
          <Switch checked={checkIfAny()} name="Categories" onChange={handleAllSwitches} />
        </div>
      </div>
      {cookiesType.map((cookie, idx) => (
        <div className={styles.section} key={idx}>
          <div className={styles.sectionHead}>
            <h3>{cookie.title}</h3>
            <Switch
              checked={cookieConsent[cookie.name]}
              name={cookie.name}
              onChange={
                cookie.isEditable ? () => handleSwitchChange(cookie.name) : () => {}
              }
            />
          </div>
          <p>{cookie.definition}</p>
        </div>
      ))}
      <div className={styles.savePreferencesContainer}>
        <Button onClick={savePreferences} className={styles.acceptBtn}>
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

CookiesConsentTool.propTypes = {
  setShowCookieConsentTool: PropTypes.func.isRequired,
  showCookieConsentTool: PropTypes.bool.isRequired,
};

export default CookiesConsentTool;
