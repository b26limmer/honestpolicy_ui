import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { useLocation } from '@reach/router';
import logo from '../../../images/main-logo.png';
import MobileMenu from '../MobileMenu/MobileMenu';
import * as styles from './account-header.module.scss';
import { Breadcrumbs, Card, CardContent, ClickAwayListener } from '@mui/material';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormButton from '../../form-button/FormButton';
import {
  faSearch,
  faGraduationCap,
  faEnvelope,
  faInfoCircle,
} from '@fortawesome/pro-regular-svg-icons';
import HyperLink from '../../HyperLink';
import useHandleLogOut from '../../utils/useHandleLogOut';

const nav = [
  {
    title: 'Carrier Research',
    to: '/search',
    icon: faSearch,
    hash: '',
    internal: true,
  },
  {
    title: 'Learning Center',
    to: '/learn',
    icon: faGraduationCap,
    hash: '',
    internal: false,
  },
  {
    title: 'Email Support',
    to: '/contact-us',
    icon: faEnvelope,
    hash: '',
    internal: true,
  },
];

const AccountHeader = ({ user, currentBreadcrumbs }) => {
  const [show, setShow] = useState(undefined);
  const [showForm, setShowForm] = useState(false);
  const handleLogOut = useHandleLogOut();

  const loc = useLocation();
  const toggleMenu = e => {
    !!e && e.stopPropagation;
    show ? setShow(false) : setShow(true);
  };
  const toggleFormPopUp = () => (showForm ? setShowForm(false) : setShowForm(true));

  return (
    <>
      <header className={styles.accountHeader}>
        <div className={styles.accountHeaderInner}>
          <Link className={styles.accountHeaderLogo} to="/" title="Home">
            <img loading="lazy" src={logo} alt="Honest Policy Logo" />
          </Link>
          <Breadcrumbs separator=">" className={styles.breadcrumbs}>
            {currentBreadcrumbs.map((bc, idx) =>
              currentBreadcrumbs.length === 1 ? null : idx + 1 ===
                currentBreadcrumbs.length ? (
                <p key={idx} className={styles.breadcrumbLink}>
                  {bc.displayName}
                </p>
              ) : (
                <Link
                  key={idx}
                  className={styles.breadcrumbLink}
                  to={bc.link}
                  title={bc.displayName}
                >
                  {bc.displayName}
                </Link>
              )
            )}
          </Breadcrumbs>
          <div className={styles.accountHeaderRightSide}>
            <p className={styles.welcomeMessage}>
              {user?.firstname ? `Welcome, ${user?.firstname}!` : 'Welcome!'}
            </p>
            <button
              className={classNames(
                styles.hamburgerMenu,
                show === undefined
                  ? ''
                  : show
                  ? styles.hamburgerMenuOpen
                  : styles.hamburgerMenuClose
              )}
              onClick={e => toggleMenu(e)}
            >
              <span />
              <span />
              <span />
            </button>
            {!!show && (
              <Card classes={{ root: styles.desktopMenu }}>
                <ClickAwayListener onClickAway={toggleMenu} touchEvent={false}>
                  <CardContent classes={{ root: styles.cardContentRoot }}>
                    <FontAwesomeIcon className={styles.infoIcon} icon={faInfoCircle} />
                    <h4 className={styles.desktopMenuTitle}>Helpful Links</h4>
                    {nav.map((link, idx) => (
                      <HyperLink
                        key={idx}
                        title={link.title}
                        to={link.to}
                        className={styles.menuLink}
                        internal={link.internal}
                      >
                        <FontAwesomeIcon
                          className={styles.desktopMenuIcon}
                          icon={link.icon}
                        />
                        {link.title}
                      </HyperLink>
                    ))}
                    <FormButton onClick={handleLogOut} className={styles.signOutButton}>
                      Sign Out
                    </FormButton>
                    <Link
                      title="Settings"
                      className={styles.settingsLink}
                      to="/account/settings"
                    >
                      Settings
                    </Link>
                  </CardContent>
                </ClickAwayListener>
              </Card>
            )}
          </div>
        </div>
      </header>
      <MobileMenu
        showCloseButton={false}
        loc={loc}
        toggleFormPopUp={toggleFormPopUp}
        show={show}
        toggleMenu={toggleMenu}
        nav={nav}
        user={user}
      />
    </>
  );
};

AccountHeader.propTypes = {
  user: PropTypes.object,
  currentBreadcrumbs: PropTypes.array.isRequired,
};

export default AccountHeader;
