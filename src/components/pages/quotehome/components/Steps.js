import OwnerForm from './ownerForm';
import HouseInfoForm from './HouseInfoForm';
import RoofInfoForm from './RoofInfoForm';
import AlarmAndPoolInfoForm from './AlarmAndPoolInfoForm';
import PastClaimsForm from './PastClaimsForm';
import CoverageForm from './CoverageForm';
import {
  emailPhonePasswordValidations,
  getValueForInputTypeDate,
  messages,
  validationTypes,
} from '../../../../utils/validation';

const steps = [
  {
    step: 1,
    Component: OwnerForm,
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      gender: '',
      dob: '',
      maritalStatus: '',
      home_or_condo: '',
      industry: '',
      occupation: '',
      address1: '',
      address2: '',
      addressCity: '',
      addressState: '',
      addressZip: '',
      livedAtleast3Yrs: '',
      currentAddress1: '',
      currentAddress2: '',
      currentCity: '',
      currentState: '',
      currentZip: '',
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
        'email',
        'password',
        'phone',
        'gender',
        'dob',
        'home_or_condo',
        'industry',
        'occupation',
        'address1',
        'addressCity',
        'addressState',
        'addressZip',
        'livedAtleast3Yrs',
        'agreement',
      ];
      if (values?.livedAtleast3Yrs === 'No') {
        requiredValues.push(
          'currentAddress1',
          'currentCity',
          'currentState',
          'currentZip'
        );
      }
      requiredValues.forEach(item => {
        let itemIncluded = Object.keys(values).includes(item);
        if (onlyGivenValues && !itemIncluded) return;
        if (!values[item]) {
          errors[item] = 'Required field';
        }
      });

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
      }
      return { ...typeErrors, ...errors };
    },
  },
  {
    step: 2,
    name: 'House Info',
    Component: HouseInfoForm,
    initialValues: {
      homeUse: '',
      purchaseDate: '',
      purchasePrice: '',
      homeUnderConstruction: '',
      homeBuiltYear: '',
      familyType: '',
      homeArea: '',
      fullBaths: '1',
      threeQuarterBaths: '0',
      halfBaths: '0',
      homeStructure: '',
      constructionType: '',
      roofType: '',
      roofShape: '',
      heatingSystemType: '',
      noOfStories: '',
      isGarageAvailable: '',
      garagesAndCarports: '',
      isWithinCityLimit: '',
      isFireDistrict: '',
      fireHydrantDistance: '',
      fireStationDistance: '',
    },
    validation: {},
    validate: function (values, onlyRequired = false, onlyGivenValues = false) {
      const errors = {};
      let typeErrors = {};

      const requiredValues = [
        'homeUse',
        'purchaseDate',
        'purchasePrice',
        'homeUnderConstruction',
        'homeBuiltYear',
        'familyType',
        'homeArea',
        'fullBaths',
        'homeStructure',
        'constructionType',
        'roofType',
        'roofShape',
        'heatingSystemType',
        'noOfStories',
        'isGarageAvailable',
        'isWithinCityLimit',
        'isFireDistrict',
        'fireHydrantDistance',
        'fireStationDistance',
      ];
      if (values.isGarageAvailable === 'Yes') {
        requiredValues.push('garagesAndCarports');
      }
      requiredValues.forEach(item => {
        let itemIncluded = Object.keys(values).includes(item);
        if (onlyGivenValues && !itemIncluded) return;
        if (!values[item]) {
          errors[item] = 'Required field';
        }
      });

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
      }

      return { ...typeErrors, ...errors };
    },
  },
  {
    step: 3,
    name: 'House Updates',
    Component: RoofInfoForm,
    initialValues: {
      propertyUpdates: undefined,
      hasUpdatedRoof: false,
      roofUpdate: '',
      roofUpdateYear: '',
      hasUpdatedPlumbing: false,
      plumbingUpdate: '',
      plumbingUpdateYear: '',
      hasUpdatedElectrical: false,
      electricalUpdate: '',
      electricalUpdateYear: '',
      hasCircuitBreaker: 'Yes',
      hasUpdatedHeatingSystem: false,
      heatingSystemUpdate: '',
      heatingSystemUpdateYear: '',
    },
    validation: {},
    validate: function (values, onlyRequired = false, onlyGivenValues = false) {
      const errors = {};
      let typeErrors = {};

      const requiredValues = ['propertyUpdates'];
      const dependendecies = [
        {
          parent: 'hasUpdatedRoof',
          dependecies: ['roofUpdate', 'roofUpdateYear'],
        },
        {
          parent: 'hasUpdatedPlumbing',
          dependecies: ['plumbingUpdate', 'plumbingUpdateYear'],
        },
        {
          parent: 'hasUpdatedElectrical',
          dependecies: ['electricalUpdate', 'electricalUpdateYear'],
        },
        {
          parent: 'hasUpdatedHeatingSystem',
          dependecies: ['heatingSystemUpdate', 'heatingSystemUpdateYear'],
        },
      ];
      if (values?.propertyUpdates) {
        dependendecies.forEach(d => {
          if (values[d.parent] && typeof values[d.parent] !== Boolean) {
            requiredValues.push(d.parent);
            d.dependecies.forEach(childDependency =>
              requiredValues.push(childDependency)
            );
          }
        });
        if (requiredValues.length == 1) {
          dependendecies.forEach(dep => requiredValues.push(dep.parent));
        }
      }
      requiredValues.forEach(item => {
        let itemIncluded = Object.keys(values).includes(item);
        if (onlyGivenValues && !itemIncluded) return;
        if (!values[item] && typeof values[item] !== 'boolean') {
          errors[item] = 'Required field';
        }
      });

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
      }
      return { ...typeErrors, ...errors };
    },
  },
  {
    step: 4,
    name: 'Additional Details',
    Component: AlarmAndPoolInfoForm,
    initialValues: {
      hasSecurityFeatures: undefined,
      hasSmokeDetector: false,
      hasSprinklerSystem: false,
      hasFireExtinguisher: false,
      hasFireAlarm: false,
      fireAlarmType: '',
      hasDeadBolt: false,
      hasBurglarAlarm: false,
      burglarAlarmType: '',
      hasDogOnPremises: false,
      dogBreedType: '',
      dogBreed: '',
      animalsBite: '',
      hasSwimmingPool: false,
      swimmingPoolFenced: '',
      swimmingPoolType: '',
      hasAirConditioned: false,
      airConditioningType: '',
    },
    validation: {},
    validate: function (values, onlyRequired = false, onlyGivenValues = false) {
      const errors = {};
      let typeErrors = {};

      let requiredValues = ['hasSecurityFeatures'];
      const checkConditionalRequired = (parentField, childrenFields) => {
        if (values[parentField]) {
          requiredValues = requiredValues.concat(childrenFields);
        }
      };
      if (values?.hasSecurityFeatures) {
        let generalError = true;
        Object.keys(this.initialValues).forEach(key => {
          if (values[key] && key !== 'hasSecurityFeatures') {
            generalError = false;
            let conditionalTree = {
              hasFireAlarm: ['fireAlarmType'],
              hasDogOnPremises: ['dogBreedType', 'dogBreed', 'animalsBite'],
              hasSwimmingPool: ['swimmingPoolFenced', 'swimmingPoolType'],
              hasAirConditioned: ['airConditioningType'],
            };
            Object.entries(conditionalTree).forEach(([parentField, childrenFields]) =>
              checkConditionalRequired(parentField, childrenFields)
            );
          }
        });
        if (generalError) {
          errors.featureOptions = 'Please select at least one feature';
        }
      }

      requiredValues.forEach(item => {
        let itemIncluded = Object.keys(values).includes(item);
        if (onlyGivenValues && !itemIncluded) return;
        if (!values[item] && typeof values[item] !== 'boolean') {
          errors[item] = 'Required field';
        }
      });

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
      }

      return { ...typeErrors, ...errors };
    },
  },
  {
    step: 5,
    name: 'Past Claims',
    Component: PastClaimsForm,
    initialValues: {
      hasPreviousCoverage: undefined,
      previousCoverageCarrier: null,
      previousCoverageDuration: '',
      reasonToNotHavePreviousCoverage: '',
      hadInsuranceCanceled: undefined,
      yearsWithPriorCarrier: '',
      hadClaimed: '',
      lossInfo: [
        {
          dateOfIncident: '',
          description: '',
          amount: '',
          catLoss: '',
        },
      ],
    },
    validation: {},
    validate: function (values, onlyRequired = false, onlyGivenValues = false) {
      const errors = {};
      let typeErrors = {};

      const requiredValues = ['hasPreviousCoverage'];
      if (values?.hasPreviousCoverage) {
        requiredValues.push(
          'previousCoverageCarrier',
          'previousCoverageDuration',
          'hadInsuranceCanceled',
          'yearsWithPriorCarrier',
          'hadClaimed'
        );
      } else if (values?.hasPreviousCoverage == false) {
        requiredValues.push('reasonToNotHavePreviousCoverage');
      }
      if (values?.hadClaimed == 'Yes') {
        let requiredLossInfo = ['dateOfIncident', 'description', 'amount', 'catLoss'];
        values.lossInfo.forEach(lossInfo => {
          requiredLossInfo.forEach(field => {
            if (!lossInfo[field]) {
              errors[field] = 'Required Field';
            }
          });
        });
      }

      requiredValues.forEach(item => {
        let itemIncluded = Object.keys(values).includes(item);
        if (onlyGivenValues && !itemIncluded) return;
        if (!values[item] && typeof values[item] !== 'boolean') {
          errors[item] = 'Required field';
        }
      });
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
      }

      return { ...typeErrors, ...errors };
    },
  },
  {
    step: 6,
    name: 'Coverage',
    Component: CoverageForm,
    initialValues: {
      effective: getValueForInputTypeDate(
        new Date(new Date().setDate(new Date().getDate() + 1))
      ),
      homeReplaceCost: '',
      needsMedicalCoverage: undefined,
      medicalCoverageNeed: '',
      needsReplacePersonalProperty: undefined,
      costToReplacePersonalProperty: '',
      needsLiabilityCoverageNeed: undefined,
      liabilityCoverageNeed: '',
      deductible: '',
      needsHurricaneDeductible: undefined,
      hurricaneDeductible: '',
      homeDistanceFromCoast: '',
      totalChildren: 'none',
    },
    validation: {},
    validate: function (values, onlyRequired = false, onlyGivenValues = false) {
      const errors = {};
      let typeErrors = {};
      const requiredValues = [
        'effective',
        'homeReplaceCost',
        'needsMedicalCoverage',
        'needsReplacePersonalProperty',
        'needsLiabilityCoverageNeed',
        'needsHurricaneDeductible',
      ];
      if (values?.needsMedicalCoverage === 'Yes') {
        requiredValues.push('medicalCoverageNeed');
      }
      if (values?.needsReplacePersonalProperty === 'Yes') {
        requiredValues.push('costToReplacePersonalProperty');
      }
      if (values?.needsLiabilityCoverageNeed === 'Yes') {
        requiredValues.push('liabilityCoverageNeed');
      }
      if (values?.needsHurricaneDeductible === 'Yes') {
        requiredValues.push('hurricaneDeductible');
      }
      requiredValues.forEach(item => {
        let itemIncluded = Object.keys(values).includes(item);
        if (onlyGivenValues && !itemIncluded) return;
        if (!values[item]) {
          errors[item] = 'Required field';
        }
      });

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
      }

      return { ...typeErrors, ...errors };
    },
  },
];

export default steps;
