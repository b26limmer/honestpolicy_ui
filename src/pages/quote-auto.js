import React from 'react';
import SEO from '../components/layout/seo';
import QuoteAutoForm from '../components/pages/quoteauto';
import PropTypes from 'prop-types';
import AlertMessage from '../components/alert/Alert';
import LoginPopup from '../components/forms/login-form/LoginPopup/login';
import { useRedux } from '../components/redux/reduxContext';

const QuoteAuto = ({ location }) => {
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
    <div>
      <SEO title="Quote Auto" description="" url="/quote-auto" />
      <QuoteAutoForm setShowLoginPopup={setShowLoginPopup} location={location} />
      <AlertMessage />
      <LoginPopup noRedirect={true} />
    </div>
  );
};
QuoteAuto.propTypes = {
  location: PropTypes.object,
};
export default QuoteAuto;
