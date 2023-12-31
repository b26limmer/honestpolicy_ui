const baseOptionsType = {
  isBeingEdited: true,
};
export const vehicleOptionsType = {
  ...baseOptionsType,
  selectedInsurance: { text: 'Personal Auto', id: 1 },
  requests: {
    makes: [],
    models: [],
    styles: [],
  },
  year: '',
  make: '',
  model: '',
  style: '',
  coverageDetails: {
    hasCombinedSingleLimit: undefined,
    combinedSingleLimit: 0,
    hasBodilyInjuryPerson: true,
    bodilyInjuryPerson: 50000,
    hasBodilyInjuryAccident: true,
    bodilyInjuryAccident: 100000,
    hasPropertyDamage: true,
    propertyDamage: 100000,
    // Additional Coverage
    hasComprehensiveCollisionDeductible: true,
    comprehensiveDeductible: 500,
    collisionDeductible: 500,
    hasUninsuredMotorist: true,
    hasUninsuredMotoristBIP: true,
    uninsuredMotoristBodilyInjuryPerson: 50000,
    hasUninsuredMotoristBIA: true,
    uninsuredMotoristBodilyInjuryAccident: 100000,
    hasUninsuredMotoristPD: true,
    uninsuredMotoristPropertyDamage: 100000,
    hasUnderInsuredMotorist: true,
    hasUnderInsuredMotoristBIP: true,
    underInsuredMotoristBodilyInjuryPerson: 50000,
    hasUnderInsuredMotoristBIA: true,
    underInsuredMotoristBodilyInjuryAccident: 100000,
    hasUnderInsuredMotoristPD: true,
    underInsuredMotoristPropertyDamage: 100000,
    hasMedicalPayments: false,
    medicalPayments: 0,
    hasPip: false,
    personalInjuryProtection: 0,
    additionalNotes: '',
  },
};
export const propertyOptionsType = {
  ...baseOptionsType,
  selectedInsurance: { text: 'Condo' },
  address: '',
  city: '',
  state: '',
  zipCode: '',
  coverageDetails: {
    hasDwelling: false,
    dwelling: 0,
    hasOtherStructures: true,
    otherStructures: 10,
    hasPersonalProperty: true,
    personalProperty: 10000,
    hasAdditionalLivingExpense: true,
    additionalLivingExpense: 20,
    hasPersonalLiability: true,
    personalLiability: 100000,
    hasMedicalPayments: true,
    medicalPayments: 1000,
    hasDeductible: true,
    deductible: 'No Deductible',
    hasWindHailDeductible: false,
    windHailDeductible: 0,
    hasDwellingReplacementCost: false,
    hasPersonalPropertyReplacementCost: false,
  },
};

export const personalOptionsType = {
  ...baseOptionsType,
  selectedInsurance: { text: 'Health' },
  planName: '',
};

export const policyFormState = {
  id: null,
  active: true,
  // Start
  insuranceType: '',
  insuranceOptions: [{ ...vehicleOptionsType }],
  // PolicyInfo
  insuranceName: '',
  carrier: {},
  policyNumber: '',
  otherPeopleCovered: [],
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  effectiveDateStart: '',
  effectiveDateEnd: '',
  monthlyCost: 0,
  // Addons
  addons: [],
  hasAdditionalAddons: undefined,
  emergencyRoadside: false,
  soundSystem: false,
  umbrellaRentalReimbursement: false,
  mechanicalBreakdown: false,
  personalProperty: false,
  replacementCost: false,
  totalLossReplacement: false,
  errors: {},
};
