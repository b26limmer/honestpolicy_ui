import _ from 'lodash';
import { policyFormState } from '../Wallet/components/AddNewPolicy/PolicyFormState';

export const transformPolicyData = bData => {
  let aData = [];

  let vehicleType = 0;
  let propertyType = 0;
  let personalType = 0;

  bData.map(eData => {
    let rData = _.cloneDeep(policyFormState);
    rData.id = eData?.id;
    switch (eData.policyType) {
      case 'auto':
        rData.insuranceType = 'Vehicle';
        rData.offSet = vehicleType;
        vehicleType += 1;
        break;
      case 'home':
        rData.insuranceType = 'Property';
        rData.offSet = propertyType;
        propertyType += 1;
        break;
      default:
        rData.insuranceType = 'Personal';
        rData.offSet = personalType;
        personalType += 1;
        break;
    }
    rData.insuranceOptions = JSON.parse(eData?.insuranceOptions || '[]');
    rData.insuranceName = eData?.insuranceName || '';
    rData.carrier = JSON.parse(eData?.carrierOptions || '{}') || eData?.carrier;
    rData.policyNumber = eData?.policyNumber || '';
    rData.otherPeopleCovered = JSON.parse(eData?.otherPeopleCovered || '[]');
    rData.firstName = eData?.firstName || '';
    rData.lastName = eData?.lastName || '';
    rData.address = eData?.addresses[0]?.streetName || '';
    rData.city = eData?.addresses[0]?.city || '';
    rData.state = eData?.addresses[0]?.state || '';
    rData.zip = eData?.addresses[0]?.zip || '';
    rData.effectiveDateStart = eData.coverageBeginDate;
    rData.effectiveDateEnd = eData.coverageEndDate;
    rData.monthlyCost = eData.costPerMonth;
    let bodilyInjury = eData.bodilyInjuryLiability?.split('/');
    if (bodilyInjury) {
      if (bodilyInjury.length === 2) {
        rData.hasCombinedSingleLimit = false;
        rData.combinedSingleLimit = 0;
        rData.hasBodilyInjuryPerson = true;
        rData.bodilyInjuryPerson = bodilyInjury[0];
        rData.hasBodilyInjuryAccident = true;
        rData.bodilyInjuryAccident = bodilyInjury[1];
        rData.hasPropertyDamage = true;
        rData.propertyDamage = eData.propertyDamageLiability;
      } else if (bodilyInjury.length === 1) {
        rData.hasCombinedSingleLimit = false;
        rData.combinedSingleLimit = bodilyInjury[0];
      }
    }
    rData.hasComprehensiveDeductible = eData?.comprehensive ? true : false || true;
    rData.comprehensiveDeductible = eData?.comprehensive || 0;
    rData.hasCollisionDeductible = eData?.collision ? true : false || true;
    rData.collisionDeductible = eData?.collision || 0;
    let uninsureedMotoristArray = eData?.uninsuredMotorist?.split('/') || [];
    if (uninsureedMotoristArray.length === 3) {
      rData.hasUninsuredMotorist = true;
      rData.hasUninsuredMotoristBIP = true;
      rData.uninsuredMotoristBodilyInjuryPerson = uninsureedMotoristArray[0]
        ? uninsureedMotoristArray[0]
        : 0;
      rData.hasUninsuredMotoristBIA = true;
      rData.uninsuredMotoristBodilyInjuryAccident = uninsureedMotoristArray[1]
        ? uninsureedMotoristArray[1]
        : 0;
      rData.hasUninsuredMotoristPA = true;
      rData.uninsuredMotoristPropertyDamage = uninsureedMotoristArray[2]
        ? uninsureedMotoristArray[2]
        : 0;
    }
    let underinsureedMotoristArray = eData?.underinsuredMotorist?.split('/') || [];
    if (underinsureedMotoristArray.length === 3) {
      rData.hasunderinsuredMotorist = true;
      rData.hasunderinsuredMotoristBIP = true;
      rData.underinsuredMotoristBodilyInjuryPerson = underinsureedMotoristArray[0]
        ? underinsureedMotoristArray[0]
        : 0;
      rData.hasunderinsuredMotoristBIA = true;
      rData.underinsuredMotoristBodilyInjuryAccident = underinsureedMotoristArray[1]
        ? underinsureedMotoristArray[1]
        : 0;
      rData.hasunderinsuredMotoristPA = true;
      rData.underinsuredMotoristPropertyDamage = underinsureedMotoristArray[2]
        ? underinsureedMotoristArray[2]
        : 0;
    }
    rData.hasMedicalPayments = eData.medicalPayments ? true : false;
    rData.medicalPayments = eData.medicalPayments;
    rData.hasPip = eData.personalInjuryProtection ? true : false;
    rData.personalInjuryProtection = eData?.personalInjuryProtection || null;
    rData.additionalNotes = eData?.additionalNotes || '';
    let addonsData = eData.addons ? JSON.parse(eData.addons) : false;
    rData.emergencyRoadside = addonsData?.emergencyRoadside || false;
    rData.soundSystem = addonsData?.soundSystem || false;
    rData.umbrellaRentalReimbursement = addonsData?.umbrellaRentalReimbursement || false;
    rData.mechanicalBreakdown = addonsData?.mechanicalBreakdown || false;
    rData.personalProperty = addonsData?.personalProperty || false;
    rData.replacementCost = addonsData?.replacementCost || false;
    rData.totalLossReplacement = addonsData?.totalLossReplacement || false;
    rData.addons = addonsData;
    aData.push(rData);
  });
  return aData;
};
