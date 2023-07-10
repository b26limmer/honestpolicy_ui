import React from 'react';
import Button from '../../form-button';
import NavMap from '../navMap';
import CloseIcon from '@mui/icons-material/Close';
import * as styles from './mobile-menu.module.scss';
import PropTypes from 'prop-types';
import useHandleLogOut from '../../utils/useHandleLogOut';
import Cookies from 'js-cookie';

const MobileMenu = ({ show, toggleMenu, nav, loc, showCloseButton, toggleFormPopUp }) => {
  const handleLogout = useHandleLogOut();
  const isLoggedIn = !!Cookies.get('token');

  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();
    if (isLoggedIn) {
      handleLogout();
    } else {
      toggleFormPopUp();
    }
    toggleMenu();
  };
  return (
    <div className={show ? styles.mobMenuActive : styles.mobMenuHidden}>
      {showCloseButton && (
        <div className={styles.mobMenuClose} onClick={toggleMenu}>
          <CloseIcon />
        </div>
      )}
      <NavMap toggleMenu={toggleMenu} nav={nav} styles={styles} loc={loc} />
      <Button onClick={handleClick} type="primary" isOutline>
        {isLoggedIn ? 'Logout' : 'Sign in'}
      </Button>
    </div>
  );
};

MobileMenu.defaultProps = {
  showCloseButton: true,
};
MobileMenu.propTypes = {
  show: PropTypes.bool,
  toggleMenu: PropTypes.func,
  toggleFormPopUp: PropTypes.func,
  nav: PropTypes.array,
  loc: PropTypes.object,
  showCloseButton: PropTypes.bool,
};
export default MobileMenu;
