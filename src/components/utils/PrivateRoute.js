import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import Cookies from 'js-cookie';

const PrivateRoute = ({ component: Component, ...rest }) => {
  useEffect(() => {
    const isLoggedIn = !!Cookies.get('token');
    if (!isLoggedIn) {
      navigate('/?show_login=true');
    }
  }, []);

  return <Component {...rest} />;
};
PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
