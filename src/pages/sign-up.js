import React from 'react';
import SEO from '../components/layout/seo';
import SignUpTemplate from '../components/pages/signUp/signUp';

const SignUpPage = () => {
  return (
    <>
      <SEO
        title="Insurance You Trust, Prices You'll Love"
        description="Instant Quotes, Great Prices, Honest Policies"
        url="/"
      />
      <SignUpTemplate />
    </>
  );
};

export default SignUpPage;
