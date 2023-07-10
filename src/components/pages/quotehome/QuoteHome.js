import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import store2 from 'store2';
import steps from './components/Steps';
import * as styles from './quote-home.module.scss';
import { ZipContext } from '../../state/zipContext';
import { useMutation } from '@apollo/client';
import { CREATE_HOME_QUOTE } from '../../utils/queries';
import useAutoCreateUser from '../../utils/useAutoCreateUser';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { AlertsContext } from '../../state/AlertsContext';
import getCreateQuoteInputHomeVariables from './components/getCreateQuoteInputHomeVariables';
import { ScriptsContext } from '../../state/ScriptsDataProvider';
import saveToLocalStorage from '../../utils/saveToLocalStorage';
import useHandlePreviousForm from '../../form/useHandlePreviousForm';
import QuoteFormInner from '../../quoteParts/QuoteFormInner/QuoteFormInner';
import FormBottom from '../../quoteParts/FormBottom/FormBottom';
import handleCreateQuoteError from '../../quoteParts/quoteHelpers/handleCreateQuoteError';
import handleOnCompleteCreateQuote from '../../quoteParts/quoteHelpers/handleOnCompleteCreateQuote';
import useCreateLead from '../../quoteParts/quoteHelpers/useCreateLead';

const navItems = [
  { name: 'Start', complete: 0, step: 1 },
  { name: 'Property', complete: 20, step: 2 },
  { name: 'Updates', complete: 30, step: 3 },
  { name: 'Details', complete: 60, step: 4 },
  { name: 'History', complete: 70, step: 5 },
  { name: 'Options', complete: 90, step: 6 },
  { name: 'Contact', complete: 90, step: 7 },
];

const QuoteHome = ({ setShowLoginPopup, location }) => {
  const [step, setStep] = useState(1);
  const [currentStep, setCurrentStep] = useState(steps[0]);
  const [createQuoteLoading, setCreateQuoteLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});
  const { zipCode, stateData } = useContext(ZipContext);
  const { createUserLoading, autoCreateUser } = useAutoCreateUser();
  const { dispatchAlert } = useContext(AlertsContext);
  const { heap, identifyUser, track } = useContext(ScriptsContext);
  useHandlePreviousForm(location, setStep, setValues);

  const [createHomeQuote] = useMutation(CREATE_HOME_QUOTE, {
    onCompleted: ({ createHomeQuote }) =>
      handleOnCompleteCreateQuote(heap, createHomeQuote, 'home'),
    onError: error => handleCreateQuoteError(setCreateQuoteLoading, dispatchAlert, error),
  });
  const { createLead, createLeadLoading } = useCreateLead();
  useEffect(() => {
    const json = store2.get('quote-home');
    let formValues = {};
    if (json) {
      formValues = JSON.parse(json);
    } else {
      formValues = initialValues();
    }
    if (!_.isEmpty(stateData)) {
      formValues.addressState = stateData.state?.name;
      formValues.addressZip = zipCode;
    }
    setValues(formValues);
  }, [stateData]);

  const initialValues = () => {
    return steps.reduce((acc, curr) => ({ ...acc, ...(curr.initialValues || {}) }), {});
  };
  const handleSubmit = async newValues => {
    setValues({ ...values, ...newValues });
    const newErrors = currentStep.validate({ ...values, ...newValues }, true);
    saveToLocalStorage('quote-home', values, initialValues());
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
  const createLeadSwitch = (requestACall = false) => {
    createLead(values, setValues, 'home', requestACall);
  };
  const checkForErrors = (errors, changeStep = true) => {
    if (_.isEmpty({ ...errors }) && changeStep) {
      createLeadSwitch();
      if (step !== steps.length) {
        setStep(step + 1);
        track(`home-quote-step-${step}`);
      } else {
        setCreateQuoteLoading(true);
        createHomeQuote({
          variables: { input: getCreateQuoteInputHomeVariables(values) },
        });
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

  const handleGoBack = () => {
    setStep(step - 1);
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
  const insuranceType = 'Home';
  return (
    <div className={styles?.quoteFormHome}>
      <div className={classNames(styles.quoteFormHomeInner)}>
        <QuoteFormInner
          requestACall={() => createLeadSwitch(true)}
          navItems={navItems}
          step={step}
          insuranceType={insuranceType}
          steps={steps}
          currentStep={currentStep}
          setShowLoginPopup={setShowLoginPopup}
          handleChange={handleChange}
          handleBlur={handleBlur}
          createQuoteLoading={createQuoteLoading || createLeadLoading}
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
        handleSubmit={handleSubmit}
        currentStep={currentStep}
        createUserLoading={createUserLoading}
        createQuoteLoading={createQuoteLoading || createLeadLoading}
        errors={errors}
        insuranceType={insuranceType}
        initialValues={initialValues}
        setValues={setValues}
        setCurrentStep={setStep}
      />
    </div>
  );
};
QuoteHome.propTypes = {
  setShowLoginPopup: PropTypes.func,
  location: PropTypes.object,
};
export default QuoteHome;
