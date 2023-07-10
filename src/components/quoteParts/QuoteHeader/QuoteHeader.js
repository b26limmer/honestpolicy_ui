import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './quote-header.module.scss';
import { faCar, faHome, faKey } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../images/main-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'gatsby';
import RequestCallButton from './RequestCallButton';

const QuoteHeader = ({ navItems, step, insuranceType, navSize, requestACall }) => {
  const innsuranceIcons = {
    Home: faHome,
    Car: faCar,
    Renter: faKey,
  };

  return (
    <>
      <div style={{ '--cols': navSize }} className={styles.gridCol}>
        {navItems.map(elm => (
          <span className={elm.step <= step ? styles.hl : styles.alt_bg} key={elm.step} />
        ))}
      </div>
      <div className={styles.quoteHeader}>
        <Link to="/" title="Go Home">
          <img
            loading="lazy"
            alt="Honest Policy Logo"
            src={logo}
            className={styles.logo}
          />
        </Link>
        <div className={styles.vl}></div>
        <span className={styles.carIcon}>
          <FontAwesomeIcon icon={innsuranceIcons[insuranceType]} size="2x" />
        </span>
        <div className={styles.titleBlock}>
          <h2 className={styles.formTitle}>{`Get ${insuranceType} Insurance Quotes`}</h2>
          <h2 className={styles.titleSubText}>
            Need assistance? Call us at{' '}
            <a title="Call us" href="tel:+18772908182">
              (877) 290-8182
            </a>
          </h2>
        </div>
        <RequestCallButton requestACall={requestACall} step={step} />
      </div>
    </>
  );
};

QuoteHeader.propTypes = {
  navItems: PropTypes.array,
  step: PropTypes.number.isRequired,
  insuranceType: PropTypes.string,
  navSize: PropTypes.number,
  requestACall: PropTypes.func.isRequired,
};

export default QuoteHeader;
