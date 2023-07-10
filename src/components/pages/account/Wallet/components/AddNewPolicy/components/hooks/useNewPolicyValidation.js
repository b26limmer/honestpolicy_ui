import PropTypes from 'prop-types';
import { messages, isZipCode } from '../../../../../../../../utils/validation';
import { navigate } from '@reach/router';

const useNewPolicyValidation = (policyData, handleChange, dispatchAlert, basePath) => {
  const startValidation = errors => {
    const requiredFields = ['insuranceType'];
    requiredFields.forEach(field => {
      if (policyData?.[field].length == 0) {
        errors[field] = messages.NOT_SELECTED;
      }
    });
    let insuranceOptionsErrors = [];
    policyData.insuranceOptions.forEach((option, idx) => {
      Object.entries(option).forEach(entry => {
        if (typeof insuranceOptionsErrors[idx] === 'undefined') {
          insuranceOptionsErrors[idx] = {};
        }
        insuranceOptionsErrors[idx] = {
          ...insuranceOptionsErrors[idx],
        };
        if (entry[0] == 'zipCode' && !isZipCode(entry[1])) {
          insuranceOptionsErrors[idx][entry[0]] = messages.ZIP;
          errors.insuranceOptions = insuranceOptionsErrors;
        }
        if (entry[1].length === 0) {
          insuranceOptionsErrors[idx][entry[0]] = messages.INVALID;
          errors.insuranceOptions = insuranceOptionsErrors;
        }
      });
    });
  };
  const policyInfoValidation = errors => {
    let requiredFields = [
      'insuranceName',
      'carrier',
      'policyNumber',
      'firstName',
      'lastName',
      'effectiveDateStart',
      'effectiveDateEnd',
      'address',
      'city',
      'state',
      'zip',
    ];
    requiredFields.forEach(field => {
      if (field === 'carrier' && !policyData.carrier.slug) {
        errors[field] = messages.NOT_SELECTED;
      }
      if (policyData?.[field].length == 0) {
        errors[field] = messages.EMPTY;
      }
      if (field === 'zip' && !isZipCode(policyData?.[field])) {
        errors[field] = messages.ZIP;
      }
      if (policyData['monthlyCost'] <= 0) {
        errors['monthlyCost'] = messages.BIGGER_THAN_ZERO;
      }
    });
    if (Object.keys(policyData?.carrier).length === 0 || !policyData.carrier.slug) {
      errors.carrier = messages.NOT_SELECTED;
    }
    let otherPeopleCoveredErrors = [];
    policyData.otherPeopleCovered.forEach((option, idx) => {
      Object.entries(option).forEach(entry => {
        if (typeof otherPeopleCoveredErrors[idx] === 'undefined') {
          otherPeopleCoveredErrors[idx] = {};
        }
        otherPeopleCoveredErrors[idx] = {
          ...otherPeopleCoveredErrors[idx],
        };
        if (entry[1].length === 0) {
          otherPeopleCoveredErrors[idx][entry[0]] = messages.EMPTY;
          errors.otherPeopleCovered = otherPeopleCoveredErrors;
        }
      });
    });
  };
  const coverageDetailsValidation = errors => {
    let coverageDetailsErrors = [];
    policyData.insuranceOptions.forEach((insuredOption, idx) => {
      let requiredFields = [];
      let switchValidationFields = {};
      if (policyData.insuranceType === 'Vehicle') {
        switchValidationFields = {
          hasCombinedSingleLimit: 'combinedSingleLimit',
          hasMedicalPayments: 'medicalPayments',
          hasPip: 'personalInjuryProtection',
        };
        let notCombinedSingleLimitValidations = {
          hasBodilyInjuryPerson: 'bodilyInjuryPerson',
          hasBodilyInjuryAccident: 'bodilyInjuryAccident',
          hasPropertyDamage: 'propertyDamage',
        };
        let uninsuredMotoristValidations = {
          hasUninsuredMotoristBIP: 'uninsuredMotoristBodilyInjuryPerson',
          hasUninsuredMotoristBIA: 'uninsuredMotoristBodilyInjuryAccident',
          hasUninsuredMotoristPD: 'uninsuredMotoristPropertyDamage',
        };
        let underInsuredMotoristValidations = {
          hasUnderInsuredMotoristBIP: 'underInsuredMotoristBodilyInjuryPerson',
          hasUnderInsuredMotoristBIA: 'underInsuredMotoristBodilyInjuryAccident',
          hasUnderInsuredMotoristPD: 'underInsuredMotoristPropertyDamage',
        };
        if (!insuredOption.coverageDetails.hasCombinedSingleLimit) {
          Object.assign(switchValidationFields, notCombinedSingleLimitValidations);
        }
        if (insuredOption.coverageDetails.hasUninsuredMotorist) {
          Object.assign(switchValidationFields, uninsuredMotoristValidations);
        }
        if (insuredOption.coverageDetails.hasUnderInsuredMotorist) {
          Object.assign(switchValidationFields, underInsuredMotoristValidations);
        }
      } else if (policyData.insuranceType === 'Property') {
        switchValidationFields = {
          hasDwelling: 'dwelling',
          hasOtherStructures: 'otherStructures',
          hasPersonalProperty: 'personalProperty',
          hasAdditionalLivingExpense: 'additionalLivingExpense',
          hasPersonalLiability: 'personalLiability',
          hasMedicalPayments: 'medicalPayments',
          hasDeductible: 'deductible',
          hasWindHailDeductible: 'windHailDeductible',
        };
      }
      Object.entries(switchValidationFields).forEach(field => {
        if (insuredOption.coverageDetails[field[0]]) {
          requiredFields.push(field[1]);
        }
      });
      requiredFields.forEach(field => {
        if (typeof coverageDetailsErrors[idx] === 'undefined') {
          coverageDetailsErrors[idx] = {};
        }
        if (field === 'deductible' && insuredOption.coverageDetails[field] <= 0) {
          coverageDetailsErrors[idx][field] = messages.NOT_SELECTED;
        } else if (insuredOption.coverageDetails[field] <= 0) {
          coverageDetailsErrors[idx][field] = messages.BIGGER_THAN_ZERO;
        }
      });
      if (
        insuredOption.coverageDetails?.hasMedicalPayments &&
        insuredOption.coverageDetails?.hasPip
      ) {
        coverageDetailsErrors[idx].medicalPayments = 'These are mutually exclusive';
        coverageDetailsErrors[idx].personalInjuryProtection =
          'These are mutually exclusive';
      }
    });
    for (let index = 0; index < coverageDetailsErrors.length; index++) {
      if (Object.keys(coverageDetailsErrors[index]).length > 0) {
        errors.coverageDetails = coverageDetailsErrors;
        break;
      }
    }
  };
  const addonsValidation = errors => {
    if (policyData.hasAdditionalAddons === undefined) {
      errors.hasAdditionalAddons = messages.NOT_SELECTED;
    } else if (policyData.hasAdditionalAddons) {
      let hasError = true;
      for (let index = 0; index < policyData.addons.length; index++) {
        let addon = policyData.addons[index];
        if (addon.value) {
          hasError = false;
          break;
        }
      }
      if (hasError) {
        errors.addons = 'You must select at least one addon';
      }
    }
  };
  const discountsValidation = errors => {
    if (policyData.carrier?.hasDiscounts === undefined) {
      errors.carrier.hasDiscounts = messages.NOT_SELECTED;
    } else if (policyData.carrier?.hasDiscounts) {
      let hasError = true;
      for (let index = 0; index < policyData.carrier.discounts.length; index++) {
        let discount = policyData.carrier.discounts[index];
        if (discount.value) {
          hasError = false;
          break;
        }
      }
      if (hasError) {
        errors.discounts = 'You must select at least one discount';
      }
    }
  };
  const validateForms = routeIndex => {
    let errors = {};
    basePath = basePath.slice(0, -1);
    let actualRoute = window.location.pathname.split(basePath)[1];
    const formsToValidate = [
      {
        route: '/',
        validation: startValidation,
      },
      {
        route: '/info',
        validation: policyInfoValidation,
      },
      {
        route: '/details',
        validation: coverageDetailsValidation,
      },
      {
        route: '/addons',
        validation: addonsValidation,
      },
      {
        route: '/discounts',
        validation: discountsValidation,
      },
    ];
    for (let index = 0; index < formsToValidate.length; index++) {
      if (index > routeIndex) {
        break;
      }
      const form = formsToValidate[index];
      form.validation(errors);
      if (Object.keys(errors).length > 0) {
        handleChange([
          {
            name: 'errors',
            value: { ...errors },
          },
        ]);
        let errorMessage = 'Please verify the provided data';
        if (actualRoute !== form.route) {
          errorMessage = 'Please complete previous steps before you continue';
          navigate(basePath + form.route);
        }
        dispatchAlert(errorMessage);
        return false;
      }
    }

    if (!Object.keys(errors).length) {
      handleChange([
        {
          name: 'errors',
          value: {},
        },
      ]);
      return true;
    }
  };
  return validateForms;
};

useNewPolicyValidation.propTypes = {
  policyData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default useNewPolicyValidation;
