import React, { useEffect } from 'react';
import SEO from '../components/layout/seo';
import LoginTemplate from '../components/pages/login/login';
import { navigate } from 'gatsby';

const LoginPage = props => {
  useEffect(() => {
    navigate('/?show_login=true');
  }, []);
  return (
    <>
      <SEO
        title="Insurance You Trust, Prices You'll Love"
        description="Instant Quotes, Great Prices, Honest Policies"
        url="/"
      />
      <LoginTemplate props={props} />
    </>
  );
};

export default LoginPage;
