import React from 'react';
import Layout from '../components/layout/layout';
import { terms } from '../components/pages/terms/Terms';
import * as styles from '../components/scss/variables.module.scss';
import SEO from '../components/layout/seo';

const Terms = () => {
  return (
    <Layout>
      <SEO
        title="Terms and Conditions"
        description="It is very important that you read all the sections carefully."
        url="/terms"
      />
      <div className={styles.htmlContent} dangerouslySetInnerHTML={{ __html: terms }} />
    </Layout>
  );
};

export default Terms;
