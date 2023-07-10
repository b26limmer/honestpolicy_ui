import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as styles from './addNewPolicy.module.scss';
import { Card, CardContent } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSort, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, navigate } from 'gatsby';
import { Router } from '@reach/router';
import { policyFormState } from './PolicyFormState';
import useNewPolicyValidation from './components/hooks/useNewPolicyValidation';
import Start from './components/Start';
import PolicyInfo from './components/PolicyInfo/PolicyInfo';
import CoverageDetails from './components/CoverageDetails';
import Addons from './components/Addons/Addons';
import Discounts from './components/Discounts/Discounts';
import useRouteBaseValidation from './components/hooks/useRouteBaseValidation';
import classNames from 'classnames';
import useSubmitData from './components/hooks/useSubmitData';
import { useMutation, gql } from '@apollo/client';
import RemoveButton from '../../../../../RemoveButton/RemoveButton';
import { AlertsContext } from '../../../../../state/AlertsContext';

export const DELETE_POLICY = gql`
  mutation deletePolicy($input: DeletePolicyInput!) {
    deletePolicy(input: $input) {
      policy {
        id
        pIndex
        iType
      }
      success
      errors
    }
  }
`;
const AddNewPolicy = ({ location, updateBreadcrumbs, bcUpdated }) => {
  const basePath = location.pathname.split('/').slice(0, 4).join('/') + '/';
  const isEdit = basePath.search('edit') !== -1;
  const initialformSteps = [
    {
      title: 'Start',
      isActive: true,
      to: `${basePath}`,
      path: '/',
      component: Start,
    },
    {
      title: 'Policy Info',
      isActive: false,
      to: `${basePath}info`,
      path: 'info',
      component: PolicyInfo,
    },
    {
      title: 'Coverage Details',
      isActive: false,
      to: `${basePath}details`,
      path: 'details',
      component: CoverageDetails,
    },
    {
      title: 'Addons',
      isActive: false,
      to: `${basePath}addons`,
      path: 'addons',
      component: Addons,
    },
    {
      title: 'Discounts',
      isActive: false,
      to: `${basePath}discounts`,
      path: 'discounts',
      component: Discounts,
    },
  ];
  const [percentageCompleted, setPercentageCompleted] = useState(0);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [formSteps, setFormSteps] = useState(initialformSteps);
  const [policyData, setPolicyData] = useState(
    location?.state?.details || JSON.parse(JSON.stringify(policyFormState))
  );
  const handleFormChange = changes => {
    let newPolicyData = JSON.parse(JSON.stringify(policyData));
    for (let index = 0; index < changes.length; index++) {
      const update = changes[index];
      newPolicyData[update.name] = update.value;
    }
    setPolicyData(newPolicyData);
  };
  const actualPath = location?.pathname;
  const routeIndex = formSteps.findIndex(route => route.to === actualPath);
  const { dispatchAlert } = useContext(AlertsContext);
  const validateForms = useNewPolicyValidation(
    policyData,
    handleFormChange,
    dispatchAlert,
    basePath
  );
  const { handleSubmitData, createPolicyLoading } = useSubmitData({
    setPolicyData,
    policyData,
    setPercentageCompleted,
  });
  const onSubmit = () => {
    if (validateForms(routeIndex)) {
      if (routeIndex + 1 < formSteps.length) {
        navigate(formSteps[routeIndex + 1].to);
      } else {
        handleSubmitData(policyData);
      }
    }
  };
  const handleMobileNav = () => {
    setShowMobileNav(!showMobileNav);
  };
  const [deletePolicy] = useMutation(DELETE_POLICY, {
    onCompleted: data => {
      if (data?.deletePolicy?.success) {
        navigate('/account/wallet');
      }
    },
    onError: async e => {
      console.error(e);
    },
  });

  useEffect(() => {
    if (bcUpdated) {
      let newDisplayName = 'New Policy';
      let newLink = '/account/wallet/new';
      if (isEdit) {
        newDisplayName = 'Edit Policy';
        newLink = 'account/wallet/edit';
      }
      updateBreadcrumbs({
        displayName: newDisplayName,
        link: newLink,
        level: 3,
      });
    }
  }, [bcUpdated]);
  return (
    <Card className={styles.addNewPolicyContainer}>
      <CardContent>
        <div className={styles.cardHeader}>
          <div className={styles.iconTitleContainer}>
            {!isEdit ? (
              <>
                <FontAwesomeIcon className={styles.avatar} icon={faPlus} />
                <div className={styles.cardTitleContainer}>
                  <h2 className={styles.cardTitle}>Add New Policy</h2>
                  <p className={styles.cardSubtitle}>
                    Need assistance? Call us at{' '}
                    <a title="Call us" href="tel:+18772908182">
                      531-333-4700
                    </a>
                  </p>
                </div>
              </>
            ) : (
              <>
                <FontAwesomeIcon className={styles.avatar} icon={faPencilAlt} />
                <div className={styles.cardTitleContainer}>
                  <h2 className={styles.cardTitle}>Edit Policy</h2>
                  <p className={styles.cardSubtitle}>{policyData.policyNumber}</p>
                </div>
              </>
            )}
          </div>
          {isEdit ? (
            <RemoveButton
              onClick={() =>
                deletePolicy({
                  variables: {
                    input: {
                      id: policyData.id,
                      pIndex: policyData.offSet,
                      iType: policyData.insuranceType,
                    },
                  },
                })
              }
            >
              Remove Policy
            </RemoveButton>
          ) : (
            <p className={styles.percentageCompleted}>
              {Math.round(percentageCompleted)}% Complete
            </p>
          )}
        </div>
      </CardContent>
      <nav
        className={classNames(styles.cardNav, showMobileNav ? styles.showMobileBar : '')}
      >
        {formSteps.map((step, idx) => (
          <Link
            onClick={() => setShowMobileNav(false)}
            className={styles.cardLink}
            key={idx}
            to={step.to}
          >
            {step.title}
          </Link>
        ))}
        <div
          className={styles.percentageCompletedBar}
          style={{
            '--menuElements': formSteps.length,
            '--percentageCompleted': percentageCompleted,
          }}
        />
      </nav>
      <button onClick={handleMobileNav} className={styles.cardNavMobileButton}>
        {formSteps
          .map(step => {
            if (step.isActive) return step.title;
          })
          .join('')}
        <FontAwesomeIcon className={styles.sortIcon} icon={faSort} />
      </button>
      <Router>
        {formSteps.map((step, idx) => (
          <step.component
            key={idx}
            updateBreadcrumbs={updateBreadcrumbs}
            path={step.path}
            onSubmit={onSubmit}
            handleFormChange={handleFormChange}
            policyData={policyData}
            validateForms={validateForms}
            routeIdx={idx}
            useRouteBaseValidation={useRouteBaseValidation}
            setPercentageCompleted={setPercentageCompleted}
            formSteps={formSteps}
            setFormSteps={setFormSteps}
            createPolicyLoading={createPolicyLoading}
          />
        ))}
      </Router>
    </Card>
  );
};
AddNewPolicy.propTypes = {
  location: PropTypes.object,
  updateBreadcrumbs: PropTypes.func.isRequired,
  bcUpdated: PropTypes.bool.isRequired,
};

export default AddNewPolicy;
