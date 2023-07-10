import { phoneFormatToNumbers } from '../../../../utils/validation';
import { convertStateNameToCode } from '../../../../utils/states';

export default function getCreateQuoteInputHomeVariables(values) {
  const getBoolYesNo = boolValue => (boolValue ? 'Yes' : 'No');

  let variables = {
    firstName: values.firstName,
    lastName: values.lastName,
    phone: phoneFormatToNumbers(values.phone),
    phoneType: 'mobile',
    email: values.email,
    homeOrCondo: values.home_or_condo,
    address1: values.address1,
    address2: values.address2,
    addressCity: values.addressCity,
    addressZip: values.addressZip,
    addressState: convertStateNameToCode(values.addressState),
    dob: values.dob,
    gender: values.gender,
    maritalStatus: values.maritalStatus,
    industry: values.industry,
    occupation: values.occupation,
    home: {
      // HouseInfoForm
      dwellingUse: values.homeUse,
      purchaseDate: values.purchaseDate,
      purchasePrice: values.purchasePrice,
      underConstruction: values.homeUnderConstruction,
      yearBuilt: values.homeBuiltYear,
      ratingInfoDwelling: values.familyType,
      squareFootage: values.homeArea,
      fullBaths: values.fullBaths,
      structure: values.homeStructure,
      construction: values.constructionType,
      roof: values.roofType,
      roofShape: values.roofShape,
      heatingType: values.heatingSystemType,
      numberOfStories: values.noOfStories,
      garage: values.isGarageAvailable,
      withinCityLimits: values.isWithinCityLimit,
      withinFireDistrict: values.isFireDistrict,
      distanceToFireHydrant: values.fireHydrantDistance,
      distanceToFireStation: values.fireStationDistance,
      // RoofInfoForm
      electricCircuitBreaker: values.hasCircuitBreaker,
      // PastClaimsForm
      priorPolicy: getBoolYesNo(values.hasPreviousCoverage),
      // CoverageForm
      effective: values.effective,
      homeReplaceCost: values.homeReplaceCost,
      deductible: values.deductible,
    },
  };

  const addVariables = newVariables => {
    Object.assign(variables, newVariables);
  };
  const addHomeVariables = newVariables => {
    Object.assign(variables.home, newVariables);
  };

  if (values.livedAtleast3Yrs === 'No') {
    addVariables({
      currentAddress1: values.currentAddress1,
      currentAddress2: values.currentAddress2,
      currentCity: values.currentCity,
      currentState: convertStateNameToCode(values.currentState),
      currentZip: values.currentZip,
    });
  }
  if (variables.home.garage === 'Yes') {
    addHomeVariables({ garagesAndCarports: values.garagesAndCarports });
  }
  // RoofInfoForm
  let updateFields = {
    hasUpdatedRoof: {
      required: {
        roofingUpdate: 'roofUpdate',
      },
      conditional: {
        roofingUpdateYear: 'roofUpdateYear',
      },
    },
    hasUpdatedPlumbing: {
      required: {
        plumbingUpdate: 'plumbingUpdate',
      },
      conditional: {
        plumbingUpdateYear: 'plumbingUpdateYear',
      },
    },
    hasUpdatedElectrical: {
      required: {
        electricalUpdate: 'electricalUpdate',
      },
      conditional: {
        electricalUpdateYear: 'electricalUpdateYear',
      },
    },
    hasUpdatedHeatingSystem: {
      required: {
        heatingUpdate: 'heatingSystemUpdate',
      },
      conditional: {
        heatingUpdateYear: 'heatingSystemUpdateYear',
      },
    },
  };

  Object.entries(updateFields).forEach(([field, relatedFields]) => {
    let [requiredKey, requiredFieldName] = Object.entries(relatedFields.required)[0];
    let [conditionalKey, conditionalFieldName] = Object.entries(
      relatedFields.conditional
    )[0];
    if (values.propertyUpdates && values[field]) {
      addHomeVariables({
        [requiredKey]: values[requiredFieldName],
        [conditionalKey]: values[conditionalFieldName],
      });
    } else {
      addHomeVariables({
        [requiredKey]: 'NOT UPDATED',
      });
    }
  });

  // AlarmAndPoolInfoForm
  let securityFeatures = {
    hasSmokeDetector: { required: { smokeDetector: 'hasSmokeDetector' } },
    hasSprinklerSystem: { required: { sprinkler: 'hasSprinklerSystem' } },
    hasFireExtinguisher: { required: { fireExtinguisher: 'hasFireExtinguisher' } },
    hasDeadBolt: { required: { deadBolt: 'hasDeadBolt' } },
    hasFireAlarm: {
      required: { fireAlarm: 'hasFireAlarm' },
      conditional: { fireAlarmType: 'fireAlarmType' },
    },
    hasBurglarAlarm: {
      required: { burglarAlarm: 'hasBurglarAlarm' },
      conditional: { burglarAlarmType: 'burglarAlarmType' },
    },
    hasDogOnPremises: {
      required: { dogOnPremises: 'hasDogOnPremises' },
      conditional: {
        dogBreedType: 'dogBreedType',
        dogBreed: 'dogBreed',
        animalsBite: 'animalsBite',
      },
    },
    hasSwimmingPool: {
      required: { swimmingPool: 'hasSwimmingPool' },
      conditional: {
        swimmingPoolFenced: 'swimmingPoolFenced',
        swimmingPoolType: 'swimmingPoolType',
      },
    },
    hasAirConditioned: {
      required: { airConditioning: 'hasAirConditioned' },
      conditional: {
        airConditioningType: 'airConditioningType',
      },
    },
  };
  Object.entries(securityFeatures).forEach(([field, relatedFields]) => {
    let [requiredKey, requiredValue] = Object.entries(relatedFields.required)[0];
    let conditionals = {};
    if (relatedFields.conditional) {
      Object.entries(relatedFields.conditional).forEach(
        ([conditionalKey, conditionalValue]) =>
          (conditionals[conditionalKey] = values[conditionalValue])
      );
    }
    if (values.hasSecurityFeatures && values[field]) {
      addHomeVariables({
        [requiredKey]: getBoolYesNo(values[requiredValue]),
        ...conditionals,
      });
    } else {
      addHomeVariables({ [requiredKey]: 'No' });
    }
  });

  // Component: PastClaimsForm
  if (values.hasPreviousCoverage) {
    addHomeVariables({
      priorCarrier: values.previousCoverageCarrier,
      continuousCoverage: values.previousCoverageDuration,
      propertyInsCancelledLapsed: values.hadInsuranceCanceled,
      yearsWithPriorCarrier: values.yearsWithPriorCarrier,
    });
    if (values.hadClaimed === 'Yes') {
      addHomeVariables({
        lossInfo: values.lossInfo.map(info => {
          let amount = parseInt(info.amount);
          return {
            ...info,
            amount,
          };
        }),
      });
    }
  } else {
    addHomeVariables({
      reasonNoPrior: values.reasonToNotHavePreviousCoverage,
    });
  }

  // CoverageForm
  if (values.needsMedicalCoverage == 'Yes') {
    addHomeVariables({
      medicalPayments: values.medicalCoverageNeed,
    });
  }
  if (values.needsReplacePersonalProperty == 'Yes') {
    addHomeVariables({
      personalProperty: values.costToReplacePersonalProperty,
    });
  }
  if (values.needsLiabilityCoverageNeed == 'Yes') {
    addHomeVariables({
      personalLiability: values.liabilityCoverageNeed,
    });
  }
  if (values.needsHurricaneDeductible == 'Yes') {
    addHomeVariables({
      hurricaneDeductible: values.hurricaneDeductible,
    });
  }
  if (values.homeDistanceFromCoast) {
    addHomeVariables({
      distanceFromCoastline: values.homeDistanceFromCoast,
    });
  }
  if (values.totalChildren) {
    addHomeVariables({
      numberOfChildren: values.totalChildren,
    });
  }
  return variables;
}
