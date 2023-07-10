import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AddNewPolicy from './components/AddNewPolicy';
import Button from '../../../form-button';
import DashboardLayout from '../../../layout/DashboardLayout';
import * as styles from '../../../scss/account/wallet.module.scss';
import { Router } from '@reach/router';
import Policies from './components/Policies';
import { navigate } from '@reach/router';
import _ from 'lodash';

const Wallet = ({ content, updateBreadcrumbs }) => {
  const [bcUpdated, setBcUpdated] = useState(false);
  useEffect(() => {
    updateBreadcrumbs({
      displayName: 'Wallet',
      link: '/account/wallet',
      callback: () => setBcUpdated(true),
    });
  }, []);
  const handleEditPolicy = e => {
    let policyData = _.cloneDeep(e);
    navigate('/account/wallet/edit', { state: { details: policyData } });
  };
  const handleRouteChange = () => {
    window.location.pathname.search('new') > -1 ||
    window.location.pathname.search('edit') > -1
      ? navigate('/account/wallet')
      : navigate('/account/wallet/new/');
  };
  const returnCtaText = () => {
    let text =
      window.location.pathname.search('new') > -1 ||
      window.location.pathname.search('edit') > -1
        ? 'My Policies'
        : 'Add New Policy';
    return text;
  };
  return (
    <DashboardLayout
      title={content?.title}
      subTitle={'What is an Insurance Wallet?'}
      helpText="A lot of details are required to secure an insurance policy, and there’s a lot of details in a policy itself. We provide a way to store that information securely for easy access and automatic use when you need it. Save on having to fill out your information multiple times when getting quotes, or having to lookup certain fields in disparate places when you need a particular detail about your application or an existing policy."
      rightSideChildren={
        <Button className={styles.addPolicyBtn} onClick={handleRouteChange}>
          {returnCtaText()}
        </Button>
      }
      classes={{
        layoutInner: styles.walletDashboardLayoutInner,
      }}
    >
      <div className={styles.accountWallet}>
        <div className={styles.walletInner}>
          <Router>
            <Policies
              bcUpdated={bcUpdated}
              updateBreadcrumbs={updateBreadcrumbs}
              handleEditPolicy={handleEditPolicy}
              path="/"
            />
            <AddNewPolicy
              bcUpdated={bcUpdated}
              updateBreadcrumbs={updateBreadcrumbs}
              path="new/*"
            />
            <AddNewPolicy
              bcUpdated={bcUpdated}
              updateBreadcrumbs={updateBreadcrumbs}
              path="edit/*"
            />
          </Router>
        </div>
      </div>
    </DashboardLayout>
  );
};

Wallet.propTypes = {
  updateBreadcrumbs: PropTypes.func.isRequired,
  content: PropTypes.shape({
    title: PropTypes.string,
    buttonText: PropTypes.string,
    user: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
      })
    ),
  }),
};

export default Wallet;
