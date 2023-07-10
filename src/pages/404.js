import React from 'react';
import SEO from '../components/layout/seo';
import Layout from '../components/layout/layout';
import notfound from '../images/underConstruction.jpg';
import { Link } from 'gatsby';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" url="/404" description="Page not found" />
    <Link to="/" title="Go back home">
      <img
        loading="lazy"
        src={notfound}
        alt="Not Found"
        style={{
          width: '60%',
          objectPosition: 'center',
          objectFit: 'cover',
          minWidth: '360px',
        }}
      />
    </Link>
  </Layout>
);

export default NotFoundPage;
