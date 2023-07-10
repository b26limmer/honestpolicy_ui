import React from 'react';
import Layout from '../components/layout/layout';
import SEO from '../components/layout/seo';
import PartnersHero from '../components/pages/ourPartners/PartnersHero';
import WhoWeAre from '../components/pages/ourPartners/WhoWeAre';
import StrategicPartners from '../components/pages/ourPartners/StrategicPartners.js';

const OurPartners = () => {
  return (
    <Layout>
      <SEO
        title="Our Partners"
        description="Creating new lines of non-interest revenue for today’s banks."
        url="/our-partners"
      />
      <PartnersHero />
      <WhoWeAre />
      <StrategicPartners />
    </Layout>
  );
};

OurPartners.propTypes = {};

export default OurPartners;
