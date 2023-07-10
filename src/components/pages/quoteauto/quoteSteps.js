import {
  emailPhonePasswordValidations,
  getValueForInputTypeDate,
  messages,
  validationTypes,
} from '../../../utils/validation';
import DemographicsForm from './components/DemographicsForm';
import CoverageForm from './components/CoverageForm';
import DriversForm from './components/DriversForm';
import VehiclesForm from './components/VehiclesForm';
import IncidentsForm from './components/IncidentsForm';
import ContactForm from './components/ContactForm';

const steps = [
  {
    step: 1,
    Component: DemographicsForm,
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      phone: '',
      rent_or_own: '',
      length_at_dwelling: '',
      address1: '',
      address2: '',
      address_city: '',
      address_state: '',
      address_zip: '',
      same_garaged: '',
      garage_address1: '',
      garage_address2: '',
      garage_address_city: '',
      garage_address_state: '',
      garage_address_zip: '',
      same_address: '',
      previous_address1: '',
      previous_address2: '',
      previous_address_city: '',
      previous_address_state: '',
      previous_address_zip: '',
      agreement: false,
    },
    validation: {
      ...emailPhonePasswordValidations,
      address_zip: {
        type: 'number',
        message: messages.ZIP,
        length: 5,
        isMandatory: true,
        label: 'ZIP',
      },
      garage_address_zip: {
        type: 'number',
        message: messages.ZIP,
        length: 5,
        isMandatory: false,
        label: 'ZIP',
      },
    },
    validate: function (values, index, onlyRequired = false, onlyGivenValues = false) {
      const errors = {};
      let typeErrors = {};

      const requiredValues = [
        'first_name',
        'last_name',
        'email',
        'password',
        'phone',
        'same_address',
        'same_garaged',
        'rent_or_own',
        'address1',
        'address_city',
        'address_state',
        'address_zip',
        'agreement',
      ];

      requiredValues.forEach(item => {
        if (!values[item]) {
          let itemIncluded = Object.keys(values).includes(item);
          if (onlyGivenValues && !itemIncluded) return;
          errors[item] = 'Required field';
        }
      });

      if (values?.same_garaged === 'No') {
        [
          'garage_address1',
          'garage_address_city',
          'garage_address_state',
          'garage_address_zip',
        ].forEach(item => {
          if (!values[item]) {
            errors[item] = 'Required field';
          }
        });
      }

      if (values?.same_address === 'No') {
        [
          'previous_address1',
          'previous_address_city',
          'previous_address_state',
          'previous_address_zip',
        ].forEach(item => {
          if (!values[item]) {
            errors[item] = 'Required field';
          }
        });
      }

      if (!onlyRequired) {
        Object.keys(this.initialValues).forEach(item => {
          let itemIncluded = Object.keys(values).includes(item);
          if (onlyGivenValues && !itemIncluded) return;
          const typeData = this.validation[item];
          if (typeData?.length) {
            if (values?.[item]?.toString()?.length !== typeData?.length) {
              typeErrors[item] = `${typeData?.label || item} must have ${
                typeData?.length
              } characters`;
              if (item === 'garage_address_zip' && values?.same_garaged !== 'No') {
                delete typeErrors[item];
              }
            }
          }
          if (typeData?.isMandatory || (!typeData?.isMandatory && values[item])) {
            if (typeData) {
              const isValid = validationTypes?.[typeData?.type]?.validationFunction(
                values?.[item]
              );

              if (!isValid) {
                typeErrors[item] = typeData?.message;
              }
            }
          }
        });
      }

      return { ...typeErrors, ...errors };
    },
  },
  {
    step: 2,
    name: 'Coverages',
    Component: CoverageForm,
    initialValues: {
      currently_insured: '',
      current_carrier: null,
      prior_liability: '',
      current_carrier_length: '',
      continuous_coverage: '',
      health_cover_accident_inj: '',
      why_no_insurance: '',
    },
    validate: values => {
      const errors = {};

      const requiredValues = [];
      if (values.currently_insured === 'Yes') {
        requiredValues.push(
          'current_carrier',
          'current_carrier_length',
          'prior_liability',
          'continuous_coverage'
        );
      } else {
        requiredValues.push('why_no_insurance');
      }
      if (values.address_state === 'New Jersey') {
        requiredValues.push('health_cover_accident_inj');
      }
      requiredValues.forEach(item => {
        if (!values[item]) {
          errors[item] = 'Required field';
        }
      });

      return errors;
    },
  },
  {
    step: 3,
    type: 'drivers',
    name: 'Drivers',
    multiple: true,
    Component: DriversForm,
    initialValues: {
      policy_holders: '',
      drivers: [
        {
          first_name: '',
          last_name: '',
          gender: '',
          dob: '',
          marital_status: '',
          education: '',
          industry: '',
          occupation: '',
          current_license_state: '',
          stateFirstLicensed: '',
          ageFirstLicensed: '',
          healthcare_plan: '',
        },
      ],
    },
    validation: {},
    validate: function (
      values,
      index = 0,
      onlyRequired = false,
      onlyGivenValues = false
    ) {
      let errors = {};
      let typeErrors = {};
      let data;

      if (onlyGivenValues) {
        data = values;
      } else {
        data = values?.drivers?.[index];
      }
      if (!data) return;
      const requiredValues = [
        'first_name',
        'last_name',
        'gender',
        'dob',
        'marital_status',
        'education',
        'industry',
        'occupation',
        'ageFirstLicensed',
        'stateFirstLicensed',
        'current_license_state',
      ];

      requiredValues.forEach(item => {
        if (!data?.[item]) {
          let itemIncluded = Object.keys(values).includes(item);
          if (onlyGivenValues && !itemIncluded) return;
          errors[item] = 'Required field';
        } else if (item === 'dob') {
          let dobDate = new Date(data[item]);
          dobDate.setTime(dobDate.getTime() + dobDate.getTimezoneOffset() * 60 * 1000);
          let today = new Date();
          let yearsDifference = (today - dobDate) / 1000 / 60 / 60 / 24 / 365;
          if (yearsDifference < 14) {
            errors[item] = 'You must be >14 years';
          }
        }
      });

      if (!onlyRequired) {
        Object.keys(this.initialValues?.drivers[0]).forEach(item => {
          let itemIncluded = Object.keys(values).includes(item);
          if (onlyGivenValues && !itemIncluded) return;
        });
      }

      return { ...typeErrors, ...errors };
    },
  },
  {
    step: 4,
    multiple: true,
    type: 'vehicles',
    name: 'vehicles',
    Component: VehiclesForm,
    initialValues: {
      numberOfVehicles: '',
      vehicles: [
        {
          year: '',
          make: '',
          model: '',
          trim: '',
          vin: '',
          annualMileage: '',
          lengthOwned: '',
          ownershipType: '',
          primaryUse: '',
        },
      ],
    },
    validation: {
      year: {
        type: 'number',
        message: messages.NUMBER,
        length: 4,
        isMandatory: true,
      },
      annualMileage: {
        type: 'number',
        message: 'Please provide mileage between 1000 and 99999',
        isMandatory: true,
        max: 99999,
        min: 1000,
      },
    },
    validate: function (values, index, onlyRequired = false) {
      let errors = {};
      let typeErrors = {};
      const data = values?.vehicles[index];
      if (!data) return;
      const requiredValues = [
        'year',
        'make',
        'model',
        'trim',
        'vin',
        'annualMileage',
        'lengthOwned',
        'ownershipType',
        'primaryUse',
      ];

      requiredValues.forEach(item => {
        if (!data[item]) {
          errors[item] = 'Required field';
        }
      });
      if (!onlyRequired) {
        Object.keys(this.initialValues?.vehicles[0]).forEach(item => {
          const typeData = this.validation[item];
          if (item === 'vin') {
            let vin = values.vehicles[index].vin;
            if (vin.length !== 10 && vin.length !== 17) {
              errors.vin = 'Vehicles vin number must be either full 17-digit or 10-digit';
            }
          }
          if (typeData?.length) {
            if (
              values?.vehicles?.[index]?.[item]?.toString()?.length !== typeData?.length
            ) {
              typeErrors[item] = `${item} must have ${typeData?.length} characters`;
            }
          }
          if (typeData?.max) {
            if (
              values?.vehicles?.[index]?.[item] > typeData.max ||
              values?.vehicles?.[index]?.[item] < typeData.min
            ) {
              typeErrors[item] = typeData.message;
            }
          }
          if (typeData?.isMandatory) {
            if (typeData) {
              const isValid = validationTypes?.[typeData?.type]?.validationFunction(
                values?.vehicles?.[index]?.[item]
              );

              if (!isValid) {
                typeErrors[item] = typeData?.message;
              }
            }
          }
        });
      }

      return { ...typeErrors, ...errors };
    },
  },
  {
    step: 5,
    type: 'incidents',
    name: 'Incidents',
    multiple: true,
    Component: IncidentsForm,
    initialValues: {
      hasIncidents: 'No',
      incidents: [
        {
          type: '',
          description: '',
          date: '',
          bodily_injury: '',
          property_damage: '',
          loss_value: '',
          prayer_for_judgement: '',
          driver: '',
          vehicle: '',
        },
      ],
    },
    validation: {},
    validate: function (values, index, onlyRequired = false) {
      let errors = {};
      let typeErrors = {};
      if (onlyRequired) return true;
      if (values?.hasIncidents === 'No') {
        return true;
      } else if (values?.hasIncidents === 'Yes') {
        values.incidents.forEach((incident, idx) => {
          const requiredValues = ['type', 'description', 'date', 'driver', 'vehicle'];
          let stateOnQuote = values.garage_address_state || values.address_state;
          if (incident.type == 'accident') {
            requiredValues.push('bodily_injury', 'property_damage');
          } else if (incident.type == 'loss') {
            requiredValues.push('loss_value');
          }
          if (stateOnQuote == 'North Carolina') {
            requiredValues.push('prayer_for_judgement');
          }
          requiredValues.forEach(field => {
            if (!incident[field]) {
              if (!errors.incidents) {
                errors.incidents = [{}];
              }
              if (errors.incidents.length - 1 < idx) {
                errors.incidents.push({});
              }
              errors.incidents[idx][field] = 'Required value';
            }
          });
        });
      } else if (!values.hasIncidents) {
        errors['hasIncidents'] = 'Required field';
      }

      return { ...typeErrors, ...errors };
    },
  },
  {
    step: 6,
    type: 'results',
    name: 'See rates',
    Component: ContactForm,
    initialValues: {
      auto_coverage_level: '',
      effectiveDate: getValueForInputTypeDate(
        new Date(new Date().setDate(new Date().getDate() + 1))
      ),
      contactAgreement: false,
    },
    validate: values => {
      let errors = {};
      let typeErrors = {};
      const requiredValues = ['auto_coverage_level', 'effectiveDate', 'contactAgreement'];
      requiredValues.forEach(item => {
        if (!values[item]) {
          errors[item] = 'Required field';
        } else if (item === 'effectiveDate') {
          let effectiveDate = new Date(values.effectiveDate);
          effectiveDate.setTime(
            effectiveDate.getTime() + effectiveDate.getTimezoneOffset() * 60 * 1000
          );
          let now = new Date();
          if (effectiveDate < now) {
            errors[item] = `Please provide a date greater than ${now.toDateString()}`;
          }
        }
      });
      return { ...typeErrors, ...errors };
    },
  },
];

export default steps;
