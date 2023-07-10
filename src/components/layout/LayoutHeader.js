import React from 'react';
import * as styles from '../scss/layout/layout-header.module.scss';
import logo from '../../images/main-logo.png';
import { Link } from 'gatsby';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

const LayoutHeader = ({ setShowLoginPopup }) => {
  const isLoggedIn = !!Cookies.get('token');
  return (
    <div className={styles.layoutHeader}>
      <img loading="lazy" alt="Honest Policy Logo" src={logo} className={styles.logo} />
      <div className={styles.formlink}>
        <span>Already have quotes?&nbsp;</span>
        {isLoggedIn ? (
          <Link to={'/account/quotes'}>Quotes</Link>
        ) : (
          <button onClick={setShowLoginPopup}>Login</button>
        )}
      </div>
    </div>
  );
};
LayoutHeader.propTypes = {
  setShowLoginPopup: PropTypes.func.isRequired,
};
export default LayoutHeader;
