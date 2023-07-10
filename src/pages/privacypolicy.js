import React from 'react';
import { htmlCode } from '../components/pages/pivacypolicy/privacyHtml.js';
import * as styles from '../components/scss/variables.module.scss';
import SEO from '../components/layout/seo';
import Layout from '../components/layout/layout';

const Privacypolicy = () => {
  return (
    <Layout>
      <SEO
        title="Privacy Policy"
        description="This page informs you of our policies regarding the collection, use and
        disclosure of Personal Information when you use our Service"
        url="/privacypolicy"
      />
      <div
        className={styles.htmlContent}
        dangerouslySetInnerHTML={{ __html: htmlCode }}
      />
    </Layout>
  );
};

export default Privacypolicy;
