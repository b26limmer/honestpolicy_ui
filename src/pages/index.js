import React, { useContext, useEffect } from 'react';
import SEO from '../components/layout/seo';
import Hero from '../components/pages/home/hero';
import LatestBlogPosts from '../components/pages/home/LatestBlogPosts';
import Layout from '../components/layout/layout';
import WeDidTheResearch from '../components/pages/home/weDidTheResearch';
import WhatsSmartScore from '../components/pages/home/whatsSmartScore';
import CompareOnHome from '../components/pages/home/CompareOnHome';
import PropTypes from 'prop-types';
import { useRedux } from '../components/redux/reduxContext';
import { AlertsContext } from '../components/state/AlertsContext';

const IndexPage = ({ location }) => {
  const { state } = location;
  const alertDispatch = useRedux()[1];
  const { dispatchAlert } = useContext(AlertsContext);
  const showLogin = () => {
    alertDispatch({
      type: 'LOGIN_POPUP_ACTION',
      payload: {
        open: true,
      },
    });
  };
  useEffect(() => {
    if (!state) {
      return;
    }
    const { login, error } = state;
    if (login) {
      showLogin();
    }
    if (error) {
      dispatchAlert(error);
    }
  }, [state]);

  return (
    <Layout>
      <SEO
        title="Insurance You Trust, Prices You'll Love"
        description="Instant Quotes, Great Prices, Honest Policies"
        url="/"
      />
      <Hero />
      <WeDidTheResearch />
      <CompareOnHome />
      <WhatsSmartScore />
      <LatestBlogPosts />
    </Layout>
  );
};
IndexPage.propTypes = {
  location: PropTypes.object,
};
export default IndexPage;
