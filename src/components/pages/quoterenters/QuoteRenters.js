import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ZipContext } from '../../state/zipContext';
import useAutoCreateUser from '../../utils/useAutoCreateUser';
import { AlertsContext } from '../../state/AlertsContext';
import _ from 'lodash';
import store2 from 'store2';
import steps from './components/Steps.js';
import saveToLocalStorage from '../../utils/saveToLocalStorage';
import Cookies from 'js-cookie';
import { ScriptsContext } from '../../state/ScriptsDataProvider';
import classNames from 'classnames';
import * as styles from './quote-renters.module.scss';
import { useMutation } from '@apollo/client';
import { CREATE_RENTER_QUOTE } from '../../utils/queries';
import getCreateQuoteRenterInputVariables from './components/getCreateQuoteRenterInputVariables';
import useHandlePreviousForm from '../../form/useHandlePreviousForm';
import QuoteFormInner from '../../quoteParts/QuoteFormInner/QuoteFormInner';
import FormBottom from '../../quoteParts/FormBottom/FormBottom';
import { convertStateNameToCode } from '../../../utils/states';
import handleCreateQuoteError from '../../quoteParts/quoteHelpers/handleCreateQuoteError';
import handleOnCompleteCreateQuote from '../../quoteParts/quoteHelpers/handleOnCompleteCreateQuote';
import useCreateLead from '../../quoteParts/quoteHelpers/useCreateLead';

const navItems = [
  { name: 'Start', complete: 0, step: 1 },
  { name: 'Coverage', complete: 90, step: 2 },
];

const QuoteRenters = ({ setShowLoginPopup, location }) => {
  const [step, setStep] = useState(1);
  const [currentStep, setCurrentStep] = useState(steps[0]);
  const [createQuoteLoading, setCreateQuoteLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});
  const { zipCode, stateData } = useContext(ZipContext);
  const { createUserLoading, autoCreateUser } = useAutoCreateUser();
  const { dispatchAlert } = useContext(AlertsContext);
  const { identifyUser, heap, track } = useContext(ScriptsContext);
  useHandlePreviousForm(location, setStep, setValues);

  const [createRenterQuote] = useMutation(CREATE_RENTER_QUOTE);
  const { createLead, createLeadLoading } = useCreateLead();
  const initialValues = () => {
    return steps.reduce((acc, curr) => ({ ...acc, ...(curr.initialValues || {}) }), {});
  };

  useEffect(() => {
    const json = store2.get('quote-renter');
    let formValues = {};
    if (json) {
      formValues = JSON.parse(json);
    } else {
      formValues = initialValues();
    }
    if (!_.isEmpty(stateData)) {
      formValues.addressState = convertStateNameToCode(stateData.state?.name);
      formValues.addressZip = zipCode;
    }
    setValues(formValues);
  }, [stateData]);

  const submitQuote = () => {
    setCreateQuoteLoading(true);
    createRenterQuote({
      variables: { input: getCreateQuoteRenterInputVariables(values) },
      onCompleted: ({ createRenterQuote }) =>
        handleOnCompleteCreateQuote(heap, createRenterQuote, 'renter'),
      onError: error =>
        handleCreateQuoteError(setCreateQuoteLoading, dispatchAlert, error),
    });
  };
  const createLeadSwitch = (requestACall = false) => {
    createLead(values, setValues, 'renter', requestACall);
  };
  const checkForErrors = (errors, changeStep = true) => {
    if (_.isEmpty({ ...errors }) && changeStep) {
      createLeadSwitch();
      if (step !== steps.length) {
        setStep(step + 1);
        track(`renter-quote-step-${step}`);
      } else {
        submitQuote();
      }
    } else {
      setErrors(errors);
      const firstError = document.querySelector('.input-has-err');
      if (firstError) {
        setTimeout(() => {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 0);
      }
    }
  };
  const handleSubmit = async newValues => {
    setValues({ ...values, ...newValues });
    const newErrors = currentStep.validate({ ...values, ...newValues }, true);
    saveToLocalStorage('quote-renter', values, initialValues());
    if (!Cookies.get('token') && _.isEmpty({ ...newErrors })) {
      await autoCreateUser({
        email: values.email,
        firstName: values.first_name,
        lastName: values.last_name,
        password: values.password,
        identifyUser,
        onCompleted: () => handleSubmit(newValues),
        setError: newError => {
          if ('email' in newError) {
            dispatchAlert(
              `It looks like you already have an account with provided email ${values.email}. Please login or provide a new one.`,
              'warning',
              10
            );
            setShowLoginPopup();
          }
          Object.assign(newErrors, newError);
        },
      });
    }
    checkForErrors(newErrors);
  };
  const handleGoBack = () => {
    setStep(step - 1);
  };
  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleBlur = async ({ target: { name, value } }) => {
    let field = {};
    field[name] = value;
    if (name == 'dd') {
      field['mm'] = values.mm;
    }
    const newErrors = currentStep.validate({ ...field }, false, true);
    checkForErrors(newErrors, false);
  };

  useEffect(() => {
    if (step <= steps.length) {
      setCurrentStep(steps[step - 1]);
      setErrors({});
      if (window) {
        window.scrollTo(0, 0);
      }
    }
  }, [step]);
  const insuranceType = 'Renter';
  return (
    <div className={styles?.quoteWrapper}>
      <div className={classNames(styles.quoteFormHomeInner)}>
        <QuoteFormInner
          requestACall={() => createLeadSwitch(true)}
          navItems={navItems}
          step={step}
          insuranceType={insuranceType}
          steps={steps}
          currentStep={currentStep}
          handleChange={handleChange}
          handleBlur={handleBlur}
          createQuoteLoading={createQuoteLoading || createLeadLoading}
          setShowLoginPopup={setShowLoginPopup}
          handleSubmit={handleSubmit}
          errors={errors}
          values={values}
        />
      </div>
      <FormBottom
        step={step}
        total={steps.length}
        name={steps?.[step]?.name || ''}
        handleGoBack={handleGoBack}
        createUserLoading={createUserLoading}
        createQuoteLoading={createQuoteLoading || createLeadLoading}
        handleSubmit={handleSubmit}
        currentStep={currentStep}
        errors={errors}
        insuranceType={insuranceType}
        initialValues={initialValues}
        setValues={setValues}
        setCurrentStep={setStep}
      />
    </div>
  );
};

QuoteRenters.propTypes = {
  setShowLoginPopup: PropTypes.func,
  location: PropTypes.object,
};

export default QuoteRenters;
