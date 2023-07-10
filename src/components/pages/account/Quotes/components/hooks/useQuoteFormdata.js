import { QUOTEFORMDATA } from '../../../../../utils/queries';
import { useQuery } from '@apollo/client';

const useQuoteFormdata = () => {
  let autoFormData = [];
  let propertyFormData = [];
  useQuery(QUOTEFORMDATA, {
    onCompleted: data => {
      if (data?.usersQuoteFormdata?.nodes) {
        let qData = data?.usersQuoteFormdata?.nodes;
        qData.map(eData => {
          let demography = JSON.parse(eData.demography);
          let details = JSON.parse(eData.details);
          let updates = JSON.parse(eData.updates);
          let security = JSON.parse(eData.security);
          let history = JSON.parse(eData.history);
          let options = JSON.parse(eData.options);
          let quoteType = eData.qtype;
          if (quoteType === 'auto') {
            let formData = {
              id: eData.id,
              active: true,
              firstName: demography.firstName,
              lastName: demography.lastName,
              mailAddress: demography.mailAddress,
              phone: demography.phone,
              currentLivingSituation: demography.currentLivingSituation,
              personalAddress: demography.personalAddress,
              personalCity: demography.personalCity,
              personalState: demography.personalState,
              personalZip: demography.personalZip,
              lengthAtDwelling: demography.lengthAtDwelling,
              previousAddress: demography.previousAddress,
              previousCity: demography.previousCity,
              previousState: demography.previousState,
              previousZip: demography.previousZip,
              currentlyInsured: details.currentlyInsured,
              currentCarrier: details.currentCarrier,
              insuranceAmountType: details.insuranceAmountType,
              currentCarrierDuration: details.currentCarrierDuration,
              continuousCoverage: details.continuousCoverage,
              healthCoverAccidentInj: details.healthCoverAccidentInj,
              noInsuranceReason: details.noInsuranceReason,
              drivers: details.drivers,
              vehicles: details.vehicles,
              incidents: history.incidents,
              policyEffectiveMonth: options.policyEffectiveMonth,
              policyEffectiveDay: options.policyEffectiveDay,
              policyEffectiveYear: options.policyEffectiveYear,
              combinedSingleLimitWanted: options.combinedSingleLimitWanted,
              combinedSingleLimit: options.combinedSingleLimit,
              coverages: options.coverages,
              deductible: options.deductible,
            };
            autoFormData.push(formData);
          }
          if (quoteType === 'property') {
            let formData = {
              id: eData.id,
              active: true,
              firstName: demography.firstName,
              lastName: demography.lastName,
              mm: demography.mm,
              dd: demography.dd,
              yy: demography.yy,
              maritalStatus: demography.maritalStatus,
              mailAddress: demography.mailAddress,
              phone: demography.phone,
              currentLivingSituation: demography.currentLivingSituation,
              personalAddress: demography.personalAddress,
              personalCity: demography.personalCity,
              personalState: demography.personalState,
              personalZip: demography.personalZip,
              livingAtLeast3Years: demography.livingAtLeast3Years,
              personalPreviousAddress: demography.personalPreviousAddress,
              personalPreviousCity: demography.personalPreviousCity,
              personalPreviousState: demography.personalPreviousState,
              personalPreviousZip: demography.personalPreviousZip,
              homeUse: details.homeUse,
              purchaseMonth: details.purchaseMonth,
              purchaseDay: details.purchaseDay,
              purchaseYear: details.purchaseYear,
              purchasePrice: details.purchasePrice,
              homeUnderConstruction: details.homeUnderConstruction,
              homeBuiltYear: details.homeBuiltYear,
              familyType: details.familyType,
              homeArea: details.homeArea,
              homeStructure: details.homeStructure,
              constructionType: details.constructionType,
              noOfStories: details.noOfStories,
              isGarageAvailable: details.isGarageAvailable,
              isWithinCityLimit: details.isWithinCityLimit,
              isFireDistrict: details.isFireDistrict,
              fireHydrantDistance: details.fireHydrantDistance,
              fireStationDistance: details.fireStationDistance,
              roofUpdate: updates.roofUpdate,
              roofUpdateYear: updates.roofUpdateYear,
              roofType: updates.roofType,
              roofShape: updates.roofShape,
              plumbingUpdate: updates.plumbingUpdate,
              plumbingUpdateYear: updates.plumbingUpdateYear,
              electricalUpdate: updates.electricalUpdate,
              electricalUpdateYear: updates.electricalUpdateYear,
              hasCircuitBreaker: updates.hasCircuitBreaker,
              heatingSystemUpdate: updates.heatingSystemUpdate,
              heatingSystemUpdateYear: updates.heatingSystemUpdateYear,
              heatingSystemType: updates.heatingSystemType,
              hasSmokeDetector: security.hasSmokeDetector,
              hasSprinklerSystem: security.hasSprinklerSystem,
              hasFireExtinguisher: security.hasFireExtinguisher,
              hasFireAlarm: security.hasFireAlarm,
              hasDeadBolt: security.hasDeadBolt,
              hasBurglarAlarm: security.hasBurglarAlarm,
              hasDogOnPremises: security.hasDogOnPremises,
              hasSwimmingPool: security.hasSwimmingPool,
              hasAirConditioned: security.hasAirConditioned,
              hasPreviousCoverage: history.hasPreviousCoverage,
              previousCoverageCarrier: history.previousCoverageCarrier,
              previousCoverageDuration: history.previousCoverageDuration,
              reasonToNotHavePreviousCoverage: history.reasonToNotHavePreviousCoverage,
              hadInsuranceCanceled: history.hadInsuranceCanceled,
              yearsWithPriorCarrier: history.yearsWithPriorCarrier,
              hadClaimed: history.hadClaimed,
              incidentMonth: history.incidentMonth,
              incidentDay: history.incidentDay,
              incidentYear: history.incidentYear,
              incidentType: history.incidentType,
              claimAmount: history.claimAmount,
              isCatastrophic: history.isCatastrophic,
              otherIncident: history.otherIncident,
              policyEffectiveMonth: options.policyEffectiveMonth,
              policyEffectiveDay: options.policyEffectiveDay,
              policyEffectiveYear: options.policyEffectiveYear,
              coverageNeed: options.coverageNeed,
              homeReplaceCost: options.homeReplaceCost,
              medicalCoverageNeed: options.medicalCoverageNeed,
              costToReplacePersonalProperty: options.costToReplacePersonalProperty,
              liabilityCoverageNeed: options.liabilityCoverageNeed,
              deductible: options.deductible,
              hurricaneDeductible: options.hurricaneDeductible,
              homeDistanceFromCoast: options.homeDistanceFromCoast,
              totalChildren: options.totalChildren,
            };
            propertyFormData.push(formData);
          }
        });
      }
    },
    onError: err => {
      console.error(err);
    },
  });
  return { autoFormData, propertyFormData };
};

export default useQuoteFormdata;
