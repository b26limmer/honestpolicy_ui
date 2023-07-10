import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { navigate } from 'gatsby';

const UrlParamsWrapper = ({ children }) => {
  const search = typeof window !== 'undefined' ? window.location.search : {};
  const {
    show_login,
    quote_type,
    quote_step,
    quote_id,
    //   auto_login_token
  } = queryString.parse(search);
  useEffect(() => {
    if (show_login) {
      navigate('/', { state: { login: true } });
    }
    if (quote_type) {
      let url;
      switch (quote_type) {
        case 'auto':
          url = '/quote-auto';
          break;
        case 'home':
          url = '/quote-home';
          break;
        case 'renter':
          url = '/quote-renter';
          break;
        default:
          break;
      }
      navigate(url, { state: { quote_step, quote_id } });
    }
  }, [search]);

  return <>{children}</>;
};

UrlParamsWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UrlParamsWrapper;
