import React from 'react';
import PropTypes from 'prop-types';
import QuoteHeader from '../QuoteHeader';
import LinearStepNav from '../LinearStepNav';

const QuoteFormInner = ({
  navItems,
  step,
  insuranceType,
  steps,
  currentStep,
  handleChange,
  handleBlur,
  createQuoteLoading,
  setShowLoginPopup,
  handleSubmit,
  errors,
  values,
  requestACall,
}) => {
  return (
    <>
      <QuoteHeader
        navItems={navItems}
        step={step}
        insuranceType={insuranceType}
        total={steps.length}
        navSize={navItems.length}
        requestACall={requestACall}
      />
      <LinearStepNav
        navItems={navItems}
        step={step}
        total={steps.length}
        navSize={navItems.length}
      />
      {!!currentStep && (
        <currentStep.Component
          handleChange={handleChange}
          handleBlur={handleBlur}
          createQuoteLoading={createQuoteLoading}
          handleSubmit={handleSubmit}
          errors={errors}
          setShowLoginPopup={setShowLoginPopup}
          values={values}
        />
      )}
    </>
  );
};

QuoteFormInner.propTypes = {
  navItems: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  insuranceType: PropTypes.string.isRequired,
  steps: PropTypes.array.isRequired,
  currentStep: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  createQuoteLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setShowLoginPopup: PropTypes.func.isRequired,
  requestACall: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default QuoteFormInner;
