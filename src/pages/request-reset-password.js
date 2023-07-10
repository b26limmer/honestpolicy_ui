import React from 'react';
import SEO from '../components/layout/seo';
import RequestResetPasswordTemplate from '../components/pages/resetPassword/RequestResetPassword';

const LoginPage = () => {
  return (
    <>
      <SEO
        title="Insurance You Trust, Prices You'll Love"
        description="Instant Quotes, Great Prices, Honest Policies"
        url="/"
      />
      <RequestResetPasswordTemplate />
    </>
  );
};

export default LoginPage;
