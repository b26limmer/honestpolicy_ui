import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Header from './header';
import Footer from './Footer';
import '../scss/layout/fonts.css';
import CookiesConsent from './CookiesConsent/CookiesConsent';
import CookiesConsentTool from './CookiesConsentTool/CookiesConsentTool';
import AlertMessage from '../alert/Alert';

const Layout = ({ children, header = {}, hasFooter = true }) => {
  const [showCookieConsentTool, setShowCookieConsentTool] = useState(false);
  return (
    <>
      <Header {...header} />
      <main>{children}</main>
      {hasFooter && <Footer />}
      <CookiesConsent setShowCookieConsentTool={setShowCookieConsentTool} />
      <CookiesConsentTool
        showCookieConsentTool={showCookieConsentTool}
        setShowCookieConsentTool={setShowCookieConsentTool}
      />
      <AlertMessage />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  hasFooter: PropTypes.bool,
  header: PropTypes.object,
};

export default Layout;
