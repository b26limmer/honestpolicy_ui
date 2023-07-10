import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Router, Redirect } from '@reach/router';
import AccountSidebar from '../components/layout/AccountSidebar';
import AccountHeader from '../components/layout/AccountHeader';
import PrivateRoute from '../components/utils/PrivateRoute';
import Notifications from '../components/pages/account/Notifications';
import Profile from '../components/pages/account/Profile';
import Quotes from '../components/pages/account/Quotes';
import Wallet from '../components/pages/account/Wallet/Wallet';
import Reviews from '../components/pages/account/Reviews';
import Settings from '../components/pages/account/Settings';
import { walletContent } from '../components/pages/account/data';
import * as styles from '../components/scss/layout/layout.module.scss';
import _ from 'lodash';
import AlertMessage from '../components/alert/Alert';
import Cookies from 'js-cookie';

const GET_USER = gql`
  query currentUser {
    currentUser {
      id
      email
      firstName
      lastName
      contactPhone
    }
  }
`;

const Account = () => {
  useQuery(GET_USER, {
    onCompleted: data => {
      onGetUser(data);
    },
    onError: error => {
      console.error(error);
      Cookies.remove('token');
      Cookies.remove('user');
    },
    fetchPolicy: 'network-only',
  });
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });

  const onGetUser = data => {
    const { currentUser } = data || {};

    const newUser = {
      ...user,
      id: currentUser?.id,
      email: currentUser?.email,
      firstname: currentUser?.firstName || '',
      lastname: currentUser?.lastName || '',
      phone: currentUser?.contactPhone || '',
    };

    setUser(newUser);
  };
  const initialBreadcrumbs = [
    {
      displayName: 'Dashboard',
      link: '/account/dashboard',
    },
  ];
  const [currentBreadcrumbs, setCurrentBreadcrumbs] = useState(
    _.cloneDeep(initialBreadcrumbs)
  );
  const updateBreadcrumbs = ({ displayName, link, level = 2, callback = false }) => {
    let newBreadcrumbs;
    let sliceTo = 0;
    switch (level) {
      case 1:
        newBreadcrumbs = _.cloneDeep(initialBreadcrumbs);
        break;
      case 2:
        sliceTo = 1;
        break;
      case 3:
        sliceTo = 2;
        break;
      case 4:
        sliceTo = 3;
        break;
      case 5:
        sliceTo = 4;
        break;
    }
    if (sliceTo) {
      newBreadcrumbs = [...currentBreadcrumbs.slice(0, sliceTo), { displayName, link }];
    }
    setCurrentBreadcrumbs(newBreadcrumbs);
    !!callback && callback();
  };
  return (
    <div className={styles.accountContainer}>
      <AccountHeader user={user} currentBreadcrumbs={currentBreadcrumbs} />
      <AccountSidebar />
      <div className={styles.accountContent}>
        <Router>
          <PrivateRoute
            updateBreadcrumbs={updateBreadcrumbs}
            path="/account/dashboard"
            component={Profile}
            user={user}
          />
          <PrivateRoute
            updateBreadcrumbs={updateBreadcrumbs}
            path="/account/notifications"
            component={Notifications}
          />
          <PrivateRoute
            updateBreadcrumbs={updateBreadcrumbs}
            path="/account/quotes"
            component={Quotes}
          />
          <PrivateRoute
            updateBreadcrumbs={updateBreadcrumbs}
            path="/account/wallet/*"
            component={Wallet}
            content={walletContent}
          />
          <PrivateRoute
            updateBreadcrumbs={updateBreadcrumbs}
            path="/account/reviews"
            component={Reviews}
          />
          <PrivateRoute
            updateBreadcrumbs={updateBreadcrumbs}
            path="/account/settings"
            component={Settings}
            user={user}
          />
          <Redirect from="/account/*" to="/account/dashboard" noThrow />
        </Router>
      </div>
      <AlertMessage />
    </div>
  );
};

export default Account;
