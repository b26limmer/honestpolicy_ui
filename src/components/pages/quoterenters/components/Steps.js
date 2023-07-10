import DemograhicForm from './DemograhicForm';
import CoverageForm from './CoverageForm';
import {
  emailPhonePasswordValidations,
  getValueForInputTypeDate,
  messages,
  validationTypes,
} from '../../../../utils/validation';

const validateRequired = (requiredValues, values, errors, onlyGivenValues) => {
  requiredValues.forEach(item => {
    let itemIncluded = Object.keys(values).includes(item);
    if (onlyGivenValues && !itemIncluded) return;
    if (!values[item]) {
      errors[item] = 'Required field';
    }
  });
};
const validateTypes = (
  initialValues,
  validation,
  values,
  onlyGivenValues,
  typeErrors
) => {
  Object.keys(initialValues).forEach(item => {
    let itemIncluded = Object.keys(values).includes(item);
    if (onlyGivenValues && !itemIncluded) return;
    const typeData = validation[item];
    if (typeData?.length) {
      if (values?.[item]?.toString()?.length !== typeData?.length) {
        typeErrors[item] = `${typeData?.label || item} must have ${
          typeData?.length
        } characters`;
      }
    }
    if (typeData?.isMandatory || (!typeData?.isMandatory && values[item])) {
      if (typeData) {
        const isValid = validationTypes?.[typeData?.type]?.validationFunction(
          values?.[item],
          values
        );

        if (!isValid) {
          typeErrors[item] = typeData?.message;
        }
      }
    }
  });
};
const steps = [
  {
    step: 1,
    Component: DemograhicForm,
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      gender: '',
      dob: '',
      maritalStatus: '',
      address1: '',
      address2: '',
      addressCity: '',
      addressState: '',
      addressZip: '',
      agreement: false,
    },
    validation: {
      ...emailPhonePasswordValidations,
      addressZip: {
        type: 'number',
        message: messages.ZIP,
        length: 5,
        isMandatory: true,
        label: 'ZIP',
      },
    },
    validate: function (values, onlyRequired = false, onlyGivenValues = false) {
      const errors = {};
      let typeErrors = {};
      const requiredValues = [
        'firstName',
        'lastName',
        'phone',
        'email',
        'password',
        'gender',
        'dob',
        'maritalStatus',
        'address1',
        'addressCity',
        'addressState',
        'addressZip',
        'agreement',
      ];
      validateRequired(requiredValues, values, errors, onlyGivenValues);
      const { validation, initialValues } = this;
      if (!onlyRequired) {
        validateTypes(initialValues, validation, values, onlyGivenValues, typeErrors);
      }
      return { ...typeErrors, ...errors };
    },
  },
  {
    step: 2,
    name: 'Coverage',
    Component: CoverageForm,
    initialValues: {
      deductible: '',
      personalProperty: '',
      personalLiability: '',
      medicalPayments: '',
      contentsCoverage: '',
      residence: '',
      yearOccupied: '',
      safetyFeatures: '',
      centralBurglarAlarm: '',
      centralFireAlarm: '',
      effective: getValueForInputTypeDate(
        new Date(new Date().setDate(new Date().getDate() + 1))
      ),
    },
    validation: {},
    validate: function (values, onlyRequired = false, onlyGivenValues = false) {
      const errors = {};
      let typeErrors = {};
      const requiredValues = [
        'deductible',
        'personalProperty',
        'personalLiability',
        'medicalPayments',
        'contentsCoverage',
        'residence',
        'yearOccupied',
        'safetyFeatures',
        'centralBurglarAlarm',
        'centralFireAlarm',
        'effective',
      ];
      if (onlyRequired) return;
      validateRequired(requiredValues, values, errors, onlyGivenValues);
      return { ...typeErrors, ...errors };
    },
  },
];

export default steps;
