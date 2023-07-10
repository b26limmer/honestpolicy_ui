import React from 'react';
import AlertMessage from '../components/alert/Alert';
import SEO from '../components/layout/seo';
import LoginPopup from '../components/forms/login-form/LoginPopup/login';
import { useRedux } from '../components/redux/reduxContext';
import QuoteRentersForm from '../components/pages/quoterenters';
import PropTypes from 'prop-types';

const QuoteRenter = ({ location }) => {
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
      <SEO title="Quote Renters" description="" url="/quote-renter" />
      <QuoteRentersForm setShowLoginPopup={setShowLoginPopup} location={location} />
      <AlertMessage />
      <LoginPopup noRedirect={true} />
    </>
  );
};
QuoteRenter.propTypes = {
  location: PropTypes.object,
};
export default QuoteRenter;
