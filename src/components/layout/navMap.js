import React from 'react';
import PropTypes from 'prop-types';
import HyperLink from '../HyperLink';

const NavMap = ({ nav, loc, styles, toggleMenu }) => {
  return (
    <>
      {nav.map((link, idx) => (
        <HyperLink
          key={idx}
          internal={link.internal}
          to={link.internal ? link.to + link.hash : link.to}
          className={
            link.internal
              ? loc.pathname === link.to && loc.hash === link.hash
                ? styles.navLinkActive
                : styles.navLink
              : styles.navLink
          }
          onClick={e => {
            if (link.internal) {
              e.stopPropagation();
              toggleMenu ? toggleMenu : null;
            }
          }}
          title={link.title}
        >
          {link.title}
        </HyperLink>
      ))}
    </>
  );
};
export default NavMap;

NavMap.propTypes = {
  nav: PropTypes.array.isRequired,
  loc: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  toggleMenu: PropTypes.func,
};
