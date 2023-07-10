import React from 'react';
import AlertMessage from '../components/alert/Alert';
import SEO from '../components/layout/seo';
import QuoteHomeForm from '../components/pages/quotehome';
import LoginPopup from '../components/forms/login-form/LoginPopup/login';
import { useRedux } from '../components/redux/reduxContext';
import PropTypes from 'prop-types';

const QuoteHome = ({ location }) => {
  const reduxDispatcher = useRedux()[1];
  const setShowLoginPopup = () => {
    reduxDispatcher({
      type: 'LOGIN_POPUP_ACTION',
      payload: {
        open: true,
      },
    });
  };
  return (
    <>
      <SEO title="Quote Home" description="" url="/quote-home" />
      <QuoteHomeForm setShowLoginPopup={setShowLoginPopup} location={location} />
      <AlertMessage />
      <LoginPopup noRedirect={true} />
    </>
  );
};
QuoteHome.propTypes = {
  location: PropTypes.object,
};
export default QuoteHome;
