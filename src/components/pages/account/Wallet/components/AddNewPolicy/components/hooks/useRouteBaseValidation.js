import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const useRouteBaseValidation = (
  validateForms,
  routeIdx,
  setPercentageCompleted,
  formSteps,
  setFormSteps,
  updateBreadcrumbs
) => {
  const [routeBaseValidationCompleted, setRouteBaseValidationCompleted] = useState(false);
  useEffect(() => {
    setPercentageCompleted((100 / formSteps.length) * routeIdx);
    let newFormSteps = formSteps;
    newFormSteps = newFormSteps.map((formStep, formStepidx) => {
      if (routeIdx !== formStepidx) {
        formStep.isActive = false;
      } else {
        formStep.isActive = true;
        updateBreadcrumbs({ displayName: formStep.title, link: formStep.to, level: 4 });
      }
      return formStep;
    });
    setFormSteps(newFormSteps);
    if (routeIdx > 0) {
      validateForms(routeIdx - 1);
    }
    setRouteBaseValidationCompleted(true);
  }, []);
  return routeBaseValidationCompleted;
};

useRouteBaseValidation.propTypes = {
  validateForms: PropTypes.func.isRequired,
  routeIdx: PropTypes.number.isRequired,
  setPercentageCompleted: PropTypes.func.isRequired,
  formSteps: PropTypes.object.isRequired,
  setFormSteps: PropTypes.func.isRequired,
  updateBreadcrumbs: PropTypes.func.isRequired,
};

export default useRouteBaseValidation;
