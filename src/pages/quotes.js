import React from 'react';
import AlertMessage from '../components/alert/Alert';
import LoginPopup from '../components/forms/login-form/LoginPopup/login';
import LayoutHeader from '../components/layout/LayoutHeader';
import SEO from '../components/layout/seo';
import MainPage from '../components/pages/quoteauto/mainPage';
import { useRedux } from '../components/redux/reduxContext';

const Quotes = () => {
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
      <SEO title="Get Quotes" description="" url="/quotes" />
      <LayoutHeader setShowLoginPopup={setShowLoginPopup} />
      <MainPage />
      <AlertMessage />
      <LoginPopup noRedirect={true} />
    </>
  );
};

export default Quotes;
