import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const HyperLink = ({ title, to, className, internal, children, onClick }) => {
  if (internal) {
    return (
      <Link to={to} className={className} title={title} onClick={onClick}>
        {children}
      </Link>
    );
  } else {
    return (
      <a href={to} target="_self" className={className} title={title}>
        {children}
      </a>
    );
  }
};
HyperLink.defaultProps = {
  onClick: () => {},
};
HyperLink.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  internal: PropTypes.bool.isRequired,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default HyperLink;
