import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import PolicyPanelCollapse from '../PolicyPanelCollapse/PolicyPanelCollapse';
import SEO from '../../../../../layout/seo';
import { POLICIES } from '../../../../../utils/queries';
import { transformPolicyData } from '../../../utils/transformPolicyData';
import * as styles from './policies.module.scss';
import FetchingData from '../../../../../Loading/FetchingData';

const Policies = ({ handleEditPolicy, updateBreadcrumbs, bcUpdated, location }) => {
  const { data, loading } = useQuery(POLICIES, {
    variables: { policyType: '' },
    onError: err => {
      console.error(err);
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    !!bcUpdated &&
      updateBreadcrumbs({ displayName: 'Policies', link: '/account/wallet', level: 3 });
  }, [bcUpdated]);
  const userPolicies = data?.usersPolicies
    ? transformPolicyData(data.usersPolicies.nodes)
    : [];
  return (
    <>
      <SEO title="Policies" />
      {loading ? (
        <FetchingData loadingText="We're fetching your policies!" />
      ) : (
        userPolicies.map((policy, key) => (
          <PolicyPanelCollapse
            openPolicy={policy.id === location?.state?.openPolicy?.id}
            policy={policy}
            key={key}
            handleEditPolicy={handleEditPolicy}
          />
        ))
      )}
      {userPolicies.length > 0 && (
        <h2 className={styles.disclaimerText}>
          This insurance information is for reference only, and does not count as proof of
          insurance. It is not updated automatically, but you can edit and update it
          manually.
        </h2>
      )}
    </>
  );
};

Policies.propTypes = {
  handleEditPolicy: PropTypes.func.isRequired,
  updateBreadcrumbs: PropTypes.func.isRequired,
  bcUpdated: PropTypes.bool.isRequired,
  location: PropTypes.object,
};

export default Policies;
