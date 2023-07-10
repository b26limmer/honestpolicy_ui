import React from 'react';
import CarriersCollapse from '../CarriersCollapse';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import * as styles from './dashboad-card-styles.module.scss';
import CardContent from '@mui/material/CardContent';
import Button from '../../../../../form-button';
import { useQuery } from '@apollo/client';
import { POLICIES } from '../../../../../utils/queries';
import { transformPolicyData } from '../../../utils/transformPolicyData';
import Loading from '../../../../../Loading';
import { navigate } from 'gatsby';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

const DashboardWallet = () => {
  const { data, loading } = useQuery(POLICIES, {
    variables: { policyType: '' },
    onError: err => {
      console.error(err);
    },
  });
  const userPolicies = data?.usersPolicies?.nodes || [];
  const texts = {
    subheader: {
      loading: { text: 'We are loading your policies', action: '' },
      hasPolicies: { text: 'Access your coverage information', action: '' },
      noPolicies: {
        text: 'Already have insurance? Add your info for easy reference.',
        action: '',
      },
    },
    button: {
      loading: { text: '', action: '' },
      hasPolicies: {
        text: 'View Insurance Wallet',
        action: () => navigate('/account/wallet'),
      },
      noPolicies: {
        text: 'Add New Policy',
        action: () => navigate('/account/wallet/new/'),
      },
    },
  };
  const getSectionDetail = section => {
    let sectionObject = texts[section];
    let text;
    let action;
    if (loading) {
      text = sectionObject.loading.text;
      action = sectionObject.loading.action;
    } else if (userPolicies.length) {
      text = sectionObject.hasPolicies.text;
      action = sectionObject.hasPolicies.action;
    } else {
      text = sectionObject.noPolicies.text;
      action = sectionObject.noPolicies.action;
    }
    return { text, action };
  };
  return (
    <Card
      classes={{ root: classNames(styles.profileCarrierCardRoot, styles.walletCard) }}
    >
      <CardHeader
        classes={{
          title: styles.accountProfileCardTitle,
          subheader: styles.accountProfileCardSubTitle,
        }}
        avatar={<FontAwesomeIcon icon={faWallet} className={styles.walletIcon} />}
        title={'Your Insurance Wallet'}
        subheader={getSectionDetail('subheader').text}
      />
      <Divider variant="middle" />
      <CardContent className={styles.walletCardContent}>
        {loading ? (
          <Loading size={200} />
        ) : (
          transformPolicyData(userPolicies).map(
            (policy, idx) =>
              idx < 2 && (
                <div key={idx}>
                  <CarriersCollapse policy={policy} />
                  <Divider />
                </div>
              )
          )
        )}
        <div className={styles.profileViewInsuranceBlock}>
          {!loading && (
            <Button onClick={() => getSectionDetail('button').action()}>
              {getSectionDetail('button').text}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// DashboardWallet.propTypes = {};

export default DashboardWallet;
