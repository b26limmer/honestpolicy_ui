export const vehicleCoverageNames = {
  hasCombinedSingleLimit: {
    title: 'Combined Single Limit',
    show: false,
    dependsOn: [],
  },
  combinedSingleLimit: {
    title: 'Combined Single Limit',
    show: true,
    dependsOn: ['hasCombinedSingleLimit'],
  },
  hasBodilyInjuryPerson: {
    title: 'Bodily Injury Person',
    show: false,
    dependsOn: [],
  },
  bodilyInjuryPerson: {
    title: 'Bodily Injury Person',
    show: true,
    dependsOn: ['!hasCombinedSingleLimit', 'hasBodilyInjuryPerson'],
  },
  hasBodilyInjuryAccident: {
    title: 'Bodily Injury Accident',
    show: false,
    dependsOn: [],
  },
  bodilyInjuryAccident: {
    title: 'Bodily Injury Accident amount',
    show: true,
    dependsOn: ['!hasCombinedSingleLimit', 'hasBodilyInjuryAccident'],
  },
  hasPropertyDamage: {
    title: 'Property Damage',
    show: false,
    dependsOn: [],
  },
  propertyDamage: {
    title: 'Property Damage',
    show: true,
    dependsOn: ['!hasCombinedSingleLimit', 'hasPropertyDamage'],
  },
  //   Additional Coverage
  hasComprehensiveDeductible: {
    title: 'Comprehensive Deductible',
    show: false,
    dependsOn: [],
  },
  comprehensiveDeductible: {
    title: 'Comprehensive Deductible',
    show: true,
    dependsOn: ['hasComprehensiveDeductible'],
  },
  hasCollisionDeductible: {
    title: 'Collision Deductible',
    show: false,
    dependsOn: [],
  },
  collisionDeductible: {
    title: 'Collision Deductible',
    show: true,
    dependsOn: ['hasCollisionDeductible'],
  },
  hasUninsuredMotorist: {
    title: 'Uninsured Motorist',
    show: false,
    dependsOn: [],
  },
  hasUninsuredMotoristBIP: {
    title: 'Uninsured Motorist Bodily Injury (per person)',
    show: false,
    dependsOn: [],
  },
  uninsuredMotoristBodilyInjuryPerson: {
    title: 'Uninsured Motorist Bodily Injury (per person)',
    show: true,
    dependsOn: ['hasUninsuredMotorist', 'hasUninsuredMotoristBIP'],
  },
  hasUninsuredMotoristBIA: {
    title: 'Uninsured Motorist Bodily Injury (per accident)',
    show: false,
    dependsOn: [],
  },
  uninsuredMotoristBodilyInjuryAccident: {
    title: 'Uninsured Motorist Bodily Injury (per accident)',
    show: true,
    dependsOn: ['hasUninsuredMotorist', 'hasUninsuredMotoristBIA'],
  },
  hasUninsuredMotoristPD: {
    title: 'Uninsured Motorist Property Damage',
    show: false,
    dependsOn: [],
  },
  uninsuredMotoristPropertyDamage: {
    title: 'Uninsured Motorist Property Damage',
    show: true,
    dependsOn: ['hasUninsuredMotorist', 'hasUninsuredMotoristPD'],
  },
  hasUnderInsuredMotorist: {
    title: 'Underinsured Motorist',
    show: false,
    dependsOn: [],
  },
  hasUnderInsuredMotoristBIP: {
    title: 'Underinsured Motorist Bodily Injury (per person)',
    show: false,
    dependsOn: [],
  },
  underInsuredMotoristBodilyInjuryPerson: {
    title: 'Underinsured Motorist Bodily Injury (per person)',
    show: true,
    dependsOn: ['hasUnderInsuredMotorist', 'hasUnderInsuredMotoristBIP'],
  },
  hasUnderInsuredMotoristBIA: {
    title: 'Underinsured Motorist Bodily Injury (per accident)',
    show: false,
    dependsOn: [],
  },
  underInsuredMotoristBodilyInjuryAccident: {
    title: 'Underinsured Motorist Bodily Injury (per accident)',
    show: true,
    dependsOn: ['hasUnderInsuredMotorist', 'hasUnderInsuredMotoristBIA'],
  },
  hasUnderInsuredMotoristPD: {
    title: 'Underinsured Motorist Property Damage',
    show: false,
    dependsOn: [],
  },
  underInsuredMotoristPropertyDamage: {
    title: 'Underinsured Motorist Property Damage',
    show: true,
    dependsOn: ['hasUnderInsuredMotorist', 'hasUnderInsuredMotoristPD'],
  },
  hasMedicalPayments: {
    title: 'Medical Payments',
    show: false,
    dependsOn: [],
  },
  medicalPayments: {
    title: 'Medical Payments',
    show: true,
    dependsOn: ['hasMedicalPayments'],
  },
  hasPip: {
    title: 'PIP (Personal Injury Protection)',
    show: false,
    dependsOn: [],
  },
  personalInjuryProtection: {
    title: 'PIP (Personal Injury Protection)',
    show: true,
    dependsOn: ['hasPip'],
  },
  additionalNotes: {
    title: 'Additional Notes',
    show: true,
    dependsOn: [],
  },
};

export const propertyCoverageNames = {
  hasDwelling: {
    title: 'Coverage A (Dwelling)',
    show: false,
    dependsOn: [],
  },
  dwelling: {
    title: 'Coverage A (Dwelling)',
    show: true,
    dependsOn: ['hasDwelling'],
  },
  hasOtherStructures: {
    title: 'Coverage B (Other Structures)',
    show: false,
    dependsOn: [],
  },
  otherStructures: {
    title: 'Coverage B (Other Structures)',
    show: true,
    dependsOn: ['hasOtherStructures'],
    type: 'percentage',
  },
  hasPersonalProperty: {
    title: 'Coverage C (Personal Property)',
    show: false,
    dependsOn: [],
  },
  personalProperty: {
    title: 'Coverage C (Personal Property)',
    show: true,
    dependsOn: ['hasPersonalProperty'],
  },
  hasAdditionalLivingExpense: {
    title: 'Coverage D (Additional Living Expense)',
    show: false,
    dependsOn: [],
  },
  additionalLivingExpense: {
    title: 'Coverage D (Additional Living Expense)',
    show: true,
    dependsOn: ['hasAdditionalLivingExpense'],
    type: 'percentage',
  },
  hasPersonalLiability: {
    title: 'Coverage E (Personal Liability)',
    show: false,
    dependsOn: [],
  },
  personalLiability: {
    title: 'Coverage E (Personal Liability)',
    show: true,
    dependsOn: ['hasPersonalLiability'],
  },
  hasMedicalPayments: {
    title: 'Coverage F (Medical Payments)',
    show: false,
    dependsOn: [],
  },
  medicalPayments: {
    title: 'Coverage F (Medical Payments)',
    show: true,
    dependsOn: ['hasMedicalPayments'],
  },
  hasDeductible: {
    title: 'Deductible',
    show: false,
    dependsOn: [],
  },
  deductible: {
    title: 'Deductible',
    show: true,
    dependsOn: ['hasDeductible'],
  },
  hasWindHailDeductible: {
    title: 'Wind/Hail Deductible',
    show: false,
    dependsOn: [],
  },
  windHailDeductible: {
    title: 'Wind/Hail Deductible',
    show: true,
    dependsOn: ['hasWindHailDeductible'],
  },
  hasDwellingReplacementCost: {
    title: 'Dwelling Replacement Cost',
    show: true,
    dependsOn: [],
  },
  hasPersonalPropertyReplacementCost: {
    title: 'Personal Property Replacement Cost',
    show: true,
    dependsOn: [],
  },
};
