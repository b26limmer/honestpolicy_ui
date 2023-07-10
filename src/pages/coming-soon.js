import React from 'react';
import SEO from '../components/layout/seo';
import ComingSoonTemplate from '../components/pages/comingSoon';

const ComingSoon = () => {
  return (
    <>
      <SEO
        title="Coming Soon"
        description="This page is coming soon"
        url="/coming-soon"
      />
      <ComingSoonTemplate />
    </>
  );
};

export default ComingSoon;
