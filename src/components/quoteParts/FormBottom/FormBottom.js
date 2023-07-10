import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './form-bottom.module.scss';
import Loading from '../../Loading';

const FormBottom = ({
  step,
  total,
  handleGoBack,
  handleSubmit,
  createQuoteLoading,
  createUserLoading,
  initialValues,
  setValues,
  setCurrentStep,
  insuranceType,
  actionButtonText,
  setActionButtonText,
}) => {
  const resetData = () => {
    let localStorageName;
    switch (insuranceType) {
      case 'Home':
        localStorageName = 'quote-home';
        break;
      case 'Renter':
        localStorageName = 'quote-renter';
        break;
      case 'Car':
        localStorageName = 'quote-auto';
        break;
      default:
        break;
    }
    localStorage.removeItem(localStorageName);
    let formValues = initialValues();
    setCurrentStep(1);
    setValues(formValues);
  };
  const resetButtonText = () => {
    if (setActionButtonText) {
      setActionButtonText('');
    }
  };
  return (
    <div className={styles.bottomLayout}>
      <div
        className={styles.btnBack}
        onClick={() => {
          resetButtonText();
          handleGoBack();
        }}
      >
        {step !== 1 ? 'Go back' : 'Cancel'}
      </div>
      {createQuoteLoading || createUserLoading ? (
        <div className={styles.loading}>
          <Loading size={150} />
        </div>
      ) : (
        <div
          className={styles.btnContinue}
          onClick={() => {
            if (!createQuoteLoading) {
              resetButtonText();
              handleSubmit();
            }
          }}
        >
          {actionButtonText ? actionButtonText : step !== total ? 'Continue' : 'Finish'}
        </div>
      )}
      {step !== 1 && (
        <button onClick={resetData} className={styles.startOverBtn}>
          Start Over
        </button>
      )}
    </div>
  );
};

FormBottom.propTypes = {
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  createQuoteLoading: PropTypes.bool.isRequired,
  createUserLoading: PropTypes.bool.isRequired,
  name: PropTypes.string,
  handleGoBack: PropTypes.func,
  handleSubmit: PropTypes.func,
  isActive: PropTypes.bool,
  initialValues: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
  insuranceType: PropTypes.string.isRequired,
  actionButtonText: PropTypes.string,
  setActionButtonText: PropTypes.func,
};

export default FormBottom;
