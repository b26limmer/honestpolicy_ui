import React, { useState, useEffect, useContext } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import { useMutation } from '@apollo/client';
import store2 from 'store2';
import steps from './quoteSteps';
import * as styles from './quote-auto.module.scss';
import PropTypes from 'prop-types';
import LinearStepNav from './components/LinearStepNav';
import QuoteHeader from '../../quoteParts/QuoteHeader';
import { navigate } from 'gatsby-link';
import { ZipContext } from '../../state/zipContext';
import { CREATE_QUOTE } from '../../utils/queries';
import Cookies from 'js-cookie';
import useAutoCreateUser from '../../utils/useAutoCreateUser';
import { getCreateQuoteInputAutoVariables } from './components/getCreateQuoteInputAutoVariables';
import { AlertsContext } from '../../state/AlertsContext';
import { ScriptsContext } from '../../state/ScriptsDataProvider';
import useHandlePreviousForm from '../../form/useHandlePreviousForm';
import FormBottom from '../../quoteParts/FormBottom';
import handleCreateQuoteError from '../../quoteParts/quoteHelpers/handleCreateQuoteError';
import handleOnCompleteCreateQuote from '../../quoteParts/quoteHelpers/handleOnCompleteCreateQuote';
import useCreateLead from '../../quoteParts/quoteHelpers/useCreateLead';

const navItems = [
  { name: 'Start', complete: 0, step: 1 },
  { name: 'Insurance', complete: 20, step: 2 },
  { name: 'Drivers', complete: 30, step: 3 },
  { name: 'Vehicles', complete: 60, step: 4 },
  { name: 'History', complete: 70, step: 5 },
  { name: 'Contact', complete: 90, step: 6 },
];

const QuoteAuto = ({ isEdit = false, setShowLoginPopup, location }) => {
  const [step, setStep] = useState(1);
  const [currentStep, setCurrentStep] = useState(steps[0]);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});
  const [selectedDriver, setSelectedDriver] = useState(0);
  const [checkedValue, setCheckedValue] = useState(null);
  const [createQuoteLoading, setCreateQuoteLoading] = useState(false);
  const [actionButtonText, setActionButtonText] = useState('');

  const { zipCode, stateData } = useContext(ZipContext);
  const { dispatchAlert } = useContext(AlertsContext);
  const { createUserLoading, autoCreateUser } = useAutoCreateUser();
  const { identifyUser, heap, track } = useContext(ScriptsContext);

  useHandlePreviousForm(location, setStep, setValues);

  const { createLead } = useCreateLead();

  const [createQuote] = useMutation(CREATE_QUOTE, {
    onCompleted: ({ createQuote }) =>
      handleOnCompleteCreateQuote(heap, createQuote, 'auto'),
    onError: error => handleCreateQuoteError(setCreateQuoteLoading, dispatchAlert, error),
  });

  useEffect(() => {
    const json = store2.get('quote-auto');
    let formValues = initialValues();

    if (json) {
      formValues = { ...formValues, ...JSON.parse(json) };
    }
    if (!_.isEmpty(stateData)) {
      formValues.address_state = stateData.state?.name;
      formValues.address_zip = zipCode;
    }
    setValues(formValues);
  }, [stateData]);
  const resetData = () => {
    localStorage.removeItem('quote-auto');
    let formValues = initialValues();
    setValues(formValues);
    setCurrentStep(1);
  };
  useEffect(() => {
    if (step <= steps.length) {
      setCurrentStep(steps[step - 1]);
      setSelectedDriver(0);
      setErrors({});
      if (window) {
        window.scrollTo(0, 0);
      }
    }
  }, [step]);

  const saveToLocalStorage = (additionalValues = {}) => {
    const formValues = _.pickBy(values, function (value, key) {
      return Object.keys(initialValues()).includes(key);
    });
    const json = JSON.stringify({ ...formValues, ...additionalValues });
    store2.set('quote-auto', json, true);
  };

  const initialValues = () => {
    return steps.reduce((acc, curr) => ({ ...acc, ...(curr.initialValues || {}) }), {
      uuid: '',
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleBlur = async ({ target: { name, value } }) => {
    let field = {};
    field[name] = value;
    if (name == 'dd') {
      field['mm'] = values.drivers[selectedDriver].mm;
    }
    const newErrors = currentStep.validate({ ...field }, selectedDriver, false, true);
    checkForErrors(newErrors, false);
  };

  const handleChangeArr = ({ target: { name, value }, field, key, resetFields = [] }) => {
    let newValues = _.cloneDeep(values?.[field]);
    newValues[key][name] = value;
    if (resetFields.length) {
      resetFields.forEach(resetField => (newValues[key][resetField] = ''));
    }
    setValues({ ...values, [field]: newValues });
  };

  const createLeadSwitch = (requestACall = false) => {
    createLead(values, setValues, 'auto', requestACall);
  };
  const submitLead = step => {
    if (step < 6) {
      createLeadSwitch();
    } else if (step === 6 && !!Cookies.get('token')) {
      setCreateQuoteLoading(true);
      createQuote({
        variables: {
          input: getCreateQuoteInputAutoVariables(values),
        },
      });
    }
  };
  const handleSubmit = async newValues => {
    setValues({ ...values, ...newValues });
    saveToLocalStorage();
    let newErrors;
    if (currentStep.step === 3 && values.drivers.length > 1) {
      for (let index = 0; index < values.drivers.length; index++) {
        newErrors = currentStep.validate({ ...values, ...newValues }, index);
        if (!_.isEmpty(newErrors)) {
          setSelectedDriver(index);
          break;
        }
      }
    } else {
      newErrors = currentStep.validate({ ...values, ...newValues }, selectedDriver);
    }
    if (_.isEmpty({ ...newErrors })) {
      if (step === 1 && !Cookies.get('token')) {
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
      } else {
        submitLead(currentStep.step);
      }
    }
    checkForErrors(newErrors);
  };

  const checkForErrors = (errors, changeStep = true) => {
    if (_.isEmpty({ ...errors }) && changeStep) {
      if (step !== steps.length) {
        track(`auto-quote-step-${step}`);
        setStep(step + 1);
      } else {
        // last
      }
    } else {
      setErrors(errors);
    }
  };

  const handleGoBack = () => {
    if (step === 1) navigate('/quote-auto');
    else setStep(step - 1);
  };
  const handleChangeDriver = driverToChange => {
    const newErrors = currentStep.validate({ ...values }, selectedDriver);
    if (_.isEmpty(newErrors)) {
      setSelectedDriver(driverToChange);
    } else {
      setErrors(newErrors);
    }
  };

  const handleAddNewItem = type => {
    const newErrors = currentStep.validate({ ...values }, selectedDriver);
    if (_.isEmpty(newErrors)) {
      if (type == 'drivers') {
        setSelectedDriver(values?.[type]?.length);
      }
      const newItems = [
        ...values[type],
        _.cloneDeep(
          steps.find(item => item.type === type)?.initialValues?.[type]?.[0] || {}
        ),
      ];
      const newValues = { ...values, [type]: _.cloneDeep(newItems) };
      setValues(newValues);
      if (window) {
        window.scrollTo({ behavior: 'smooth', top: 0 });
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleAddOnCheck = type => {
    setSelectedDriver(values?.[type]?.length);
    const newItems = [
      ...values[type],
      _.cloneDeep(
        steps.find(item => item.type === type)?.initialValues?.[type]?.[0] || {}
      ),
    ];

    const newValues = { ...values, [type]: _.cloneDeep(newItems) };
    setValues(newValues);
  };

  const handleRemoveOnCheck = (itemName, key) => {
    const newValues = _.cloneDeep(values);
    const itemLength = values?.[itemName].length;
    if (itemLength > 1) {
      newValues?.[itemName].splice(key);
      setValues(newValues);
      const selectedItem = key == 0 ? 0 : key - 1;
      if (itemName === 'drivers') {
        setSelectedDriver(selectedItem);
      }
    }
  };

  const handleRemoveItem = (itemName, key) => {
    const newValues = _.cloneDeep(values);
    setErrors({});
    const itemLength = values?.[itemName].length;
    if (itemLength > 1) {
      newValues?.[itemName].splice(key, 1);
      const selectedItem = key == 0 ? 0 : key - 1;
      if (itemName === 'drivers') {
        setSelectedDriver(selectedItem);
      }
      setValues(newValues);
    }
  };

  const handleCheckbox = event => {
    const { value } = event.target;
    setCheckedValue(value);
  };

  const handleChangeItem = newItem => {
    setErrors({});
    setSelectedDriver(newItem);
  };

  const handleUserFirstStepDetails = (e, type) => {
    let newItems = _.cloneDeep(values?.[type]);

    const modifiedItem = {
      first_name: e.target.checked ? values?.first_name || '' : '',
      last_name: e.target.checked ? values?.last_name || '' : '',
    };

    newItems[selectedDriver] = { ...(newItems?.[selectedDriver] || {}), ...modifiedItem };

    setValues({ ...values, [type]: newItems });
  };
  const insuranceType = 'Car';

  useEffect(() => {
    const firstError = document.querySelector('.input-has-err');
    if (firstError) {
      setTimeout(() => {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 0);
    }
  }, [errors]);

  return (
    <div className={styles?.quoteFormAuto}>
      <div
        className={classNames(styles.quoteFormAutoInner, {
          [styles.quoteFormFinal]: step === steps.length,
        })}
      >
        <div>
          <div className={styles.quoteFormAutoMain}>
            <QuoteHeader
              navItems={navItems}
              step={step}
              insuranceType={insuranceType}
              total={steps.length}
              navSize={navItems.length}
              values={values}
              requestACall={() => createLeadSwitch(true)}
            />
            <LinearStepNav
              navItems={navItems}
              step={step}
              total={steps.length}
              navSize={navItems.length}
            />
            {!!currentStep && (
              <currentStep.Component
                setActionButtonText={setActionButtonText}
                handleChangeDriver={handleChangeDriver}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleChangeArr={handleChangeArr}
                handleSubmit={handleSubmit}
                selectedDriver={selectedDriver}
                setSelectedDriver={handleChangeItem}
                handleAddNewItem={handleAddNewItem}
                handleRemoveItem={handleRemoveItem}
                handleAddOnCheck={handleAddOnCheck}
                handleRemoveOnCheck={handleRemoveOnCheck}
                checkedValue={checkedValue}
                handleCheckbox={handleCheckbox}
                isEdit={isEdit}
                errors={errors}
                setValues={setValues}
                values={values}
                first_name={values?.first_name}
                handleUserFirstStepDetails={handleUserFirstStepDetails}
                setShowLoginPopup={setShowLoginPopup}
              />
            )}
          </div>
        </div>
      </div>
      <FormBottom
        step={step}
        total={steps.length}
        name={steps?.[step]?.name || ''}
        handleGoBack={handleGoBack}
        handleSubmit={handleSubmit}
        currentStep={currentStep}
        createUserLoading={createUserLoading}
        createQuoteLoading={createQuoteLoading}
        errors={errors}
        resetData={resetData}
        insuranceType={insuranceType}
        initialValues={initialValues}
        setValues={setValues}
        setCurrentStep={setStep}
        actionButtonText={actionButtonText}
        setActionButtonText={setActionButtonText}
      />
    </div>
  );
};

QuoteAuto.propTypes = {
  isEdit: PropTypes.bool,
  setShowLoginPopup: PropTypes.func.isRequired,
  location: PropTypes.object,
};
export default QuoteAuto;
