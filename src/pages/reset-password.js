import React from 'react';
import queryString from 'query-string';
import SEO from '../components/layout/seo';
import ResetPasswordTemplate from '../components/pages/resetPassword/ResetPassword';
import PropTypes from 'prop-types';
import AlertMessage from '../components/alert/Alert';

const LoginPage = ({ location }) => {
  const { token } = queryString.parse(location?.search);
  return (
    <>
      <SEO
        title="Insurance You Trust, Prices You'll Love"
        description="Instant Quotes, Great Prices, Honest Policies"
        url="/"
      />
      <ResetPasswordTemplate token={token} />
      <AlertMessage />
    </>
  );
};
LoginPage.propTypes = {
  location: PropTypes.object,
};
export default LoginPage;
