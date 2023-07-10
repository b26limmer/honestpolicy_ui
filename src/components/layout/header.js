import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Link, navigate } from 'gatsby';
import SubscriptionPopForm from './subscriptionPopForm';
import NavMap from './navMap';
import { useLocation } from '@reach/router';
import Button from '../form-button';
import IconMenu from '../icons/MenuIcon';
import MobileMenu from './MobileMenu/MobileMenu';
import Cookies from 'js-cookie';

import * as styles from '../scss/layout/layout.module.scss';
import LoginPopup from '../forms/login-form/LoginPopup/login';
import PropTypes from 'prop-types';
import { useRedux } from '../redux/reduxContext';
import { StaticImage } from 'gatsby-plugin-image';

const nav = [
  {
    title: 'Carriers',
    to: '/search',
    hash: '',
    internal: true,
  },
  {
    title: 'Learning Center',
    to: '/learn',
    hash: '',
    internal: false,
  },
  {
    title: 'About',
    to: '/about',
    hash: '',
    internal: true,
  },
];

const Header = ({ isFixed = false }) => {
  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const reduxDispatcher = useRedux()[1];
  const setShowLoginPopup = () => {
    reduxDispatcher({
      type: 'LOGIN_POPUP_ACTION',
      payload: {
        open: true,
      },
    });
  };
  const isLoggedIn = !!Cookies.get('token');

  const loc = useLocation();
  const toggleMenu = () => {
    show ? setShow(false) : setShow(true);
  };
  const toggleFormPopUp = () => (showForm ? setShowForm(false) : setShowForm(true));

  const escapeListener = e => {
    e.key === 'Escape' ? toggleFormPopUp() : '';
  };
  useEffect(() => {
    if (showForm) {
      document.addEventListener('keyup', escapeListener);
    }
    return () => {
      document.removeEventListener('keyup', escapeListener);
    };
  }, [showForm]);
  return (
    <>
      <header className={classNames(styles.header, { [styles.headerFixed]: isFixed })}>
        <div className={styles.navLinksContainer}>
          <NavMap nav={nav} styles={styles} loc={loc} />
        </div>
        <Link to="/" title="Home" className={styles.logoLink}>
          <StaticImage
            src={'../../images/main-logo.png'}
            alt="Honest Policy Logo"
            className={styles.logo}
            objectFit="cover"
            formats={['auto', 'webp']}
            placeholder="tracedSVG"
            width={300}
            quality={99}
          />
        </Link>
        <div className={styles.navLinksContainerRight}>
          {isLoggedIn ? (
            <Button
              className={styles.navLinksButton}
              onClick={() => navigate('/account/dashboard')}
              type="primary"
              isOutline
            >
              Dashboard
            </Button>
          ) : (
            <Button
              className={styles.navLinksButton}
              onClick={() => setShowLoginPopup(true)}
              type="primary"
              isOutline
            >
              Sign in
            </Button>
          )}
          <Button className={styles.getQuotesButton} onClick={() => navigate('/quotes')}>
            <strong>Get</strong> Quotes
          </Button>
        </div>
        <div className={styles.navMobileRightSide}>
          <IconMenu className={styles.mobMenuButton} onClick={toggleMenu} />
          {isLoggedIn ? (
            <Button
              className={styles.navLinksButton}
              onClick={() => navigate('/account/dashboard')}
              type="primary"
              isOutline
            >
              Dashboard
            </Button>
          ) : (
            <Button
              className={classNames(styles.navLinksButton, styles.navLinksMobileButton)}
              onClick={() => setShowLoginPopup(true)}
              type="primary"
              isOutline
            >
              Sign in
            </Button>
          )}
        </div>
        <MobileMenu
          show={show}
          nav={nav}
          loc={loc}
          toggleMenu={toggleMenu}
          toggleFormPopUp={() => setShowLoginPopup(true)}
        />
      </header>
      {showForm && <SubscriptionPopForm toggleFormPopUp={toggleFormPopUp} />}
      <LoginPopup />
    </>
  );
};
Header.propTypes = {
  isFixed: PropTypes.bool,
};
export default Header;
