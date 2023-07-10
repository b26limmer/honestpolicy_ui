import { useMutation } from '@apollo/client';
import { useContext } from 'react';
import { InsuranceWalletDataContext } from '../../../../../../../state/InsuranceWalletDataProvider';
import { navigate } from '@reach/router';
import { CREATE_POLICY } from '../../../../../../../utils/queries';

const useSubmitData = ({ setPolicyData, policyData, setPercentageCompleted }) => {
  const {
    vehiclePolicies,
    setVehiclePolicies,
    propertyPolicies,
    setPropertyPolicies,
    personalPolicies,
    setPersonalPolicies,
  } = useContext(InsuranceWalletDataContext);
  const [createPolicy, { loading: createPolicyLoading }] = useMutation(CREATE_POLICY, {
    onCompleted: data => {
      if (data?.createPolicy?.success) {
        policyCreated(data.createPolicy?.policy);
      }
    },
    onError: async e => {
      console.error(e);
    },
  });
  const policyCreated = async policy => {
    let currentPolicy = policyData;
    currentPolicy.id = policy.id;
    if (currentPolicy.insuranceType == 'Vehicle') {
      let newVehiclePolicies = vehiclePolicies || [];
      if (location?.state?.offset || location?.state?.offset === 0)
        newVehiclePolicies[location.state.offset] = currentPolicy;
      else newVehiclePolicies.push(currentPolicy);
      setVehiclePolicies(newVehiclePolicies);
    }
    if (currentPolicy.insuranceType == 'Property') {
      let newPropertyPolicies = propertyPolicies || [];
      if (location.state?.offset || location.state?.offset === 0) {
        newPropertyPolicies[location.state.offset] = currentPolicy;
      } else newPropertyPolicies.push(currentPolicy);
      setPropertyPolicies(newPropertyPolicies);
    }
    if (currentPolicy.insuranceType == 'Personal') {
      let newPersonalPolicies = personalPolicies || [];
      if (location.state.offset || location.state.offset === 0)
        newPersonalPolicies[location.state.offset] = currentPolicy;
      else newPersonalPolicies.push(currentPolicy);
      setPersonalPolicies(newPersonalPolicies);
    }
    await setPolicyData(currentPolicy);
    setPercentageCompleted(100);
    navigate('../');
  };
  const handleSubmitData = policyData => {
    let carsInsured = '';
    if (policyData.insuranceOptions.length) {
      carsInsured += policyData.insuranceOptions[0].year
        ? policyData.insuranceOptions[0].year
        : '';
      carsInsured += '-';
      carsInsured += policyData.insuranceOptions[0].make
        ? policyData.insuranceOptions[0].make
        : '';
      carsInsured += '-';
      carsInsured += policyData.insuranceOptions[0].model
        ? policyData.insuranceOptions[0].model
        : '';
      carsInsured += '-';
      carsInsured += policyData.insuranceOptions[0].style
        ? policyData.insuranceOptions[0].style
        : '';
    }
    const getFormattedAddons = () => {
      let formattedAddons = {};
      if (policyData.addons.length) {
        policyData.addons.forEach(addon => {
          formattedAddons[addon.name] = addon.value;
        });
      }
      return JSON.stringify(formattedAddons);
    };
    let submitPolicyData = {
      id: policyData?.id || '',
      insuranceName: policyData?.insuranceName || '',
      carrierId: policyData?.carrier?.name || '',
      policyNumber: policyData?.policyNumber || '',
      firstName: policyData?.firstName || '',
      lastName: policyData?.lastName || '',
      otherPeopleCovered: JSON.stringify(policyData?.otherPeopleCovered),
      carsInsured: carsInsured,
      costPerMonth: policyData?.monthlyCost || '',
      coverageBeginDate: policyData?.effectiveDateStart || '',
      coverageEndDate: policyData?.effectiveDateEnd || '',
      bodilyInjuryLiability:
        policyData?.bodilyInjuryPerson + '/' + policyData.bodilyInjuryAccident || '',
      propertyDamageLiability: policyData?.propertyDamage || '',
      uninsuredMotorist:
        policyData?.underInsuredMotoristBodilyInjuryPerson +
          '/' +
          policyData.underInsuredMotoristBodilyInjuryAccident +
          '/' +
          policyData.underInsuredMotoristPropertyDamage || '',
      comprehensive: policyData?.hasComprehensiveDeductible
        ? policyData.comprehensiveDeductible.toString()
        : '' || '',
      collision: policyData?.hasCollisionDeductible
        ? policyData.collisionDeductible.toString()
        : '' || '',
      medicalPayments: policyData?.hasMedicalPayments
        ? policyData.medicalPayments
        : '' || '',
      personalInjuryProtection: policyData?.hasPip
        ? policyData.personalInjuryProtection
        : '' || '',
      additionalNotes: policyData?.additionalNotes || '',
      emergencyRoadside: policyData?.emergencyRoadside.toString() || '',
      addons: getFormattedAddons(),
      policyType:
        policyData.insuranceType === 'Vehicle'
          ? 'auto'
          : policyData.insuranceType === 'Property'
          ? 'home'
          : 'personal',
      insuranceOptions: JSON.stringify(policyData?.insuranceOptions || ''),
      carrierOptions: JSON.stringify(policyData?.carrier || ''),
    };
    let addresses;
    if (policyData.insuranceType === 'Property') {
      addresses = [
        {
          streetName: policyData.insuranceOptions[0].address,
          city: policyData.insuranceOptions[0].city,
          state: policyData.insuranceOptions[0].state,
          zip: policyData.insuranceOptions[0].zipCode,
        },
      ];
    } else {
      addresses = [
        {
          streetName: policyData.address,
          city: policyData.city,
          state: policyData.state,
          zip: policyData.zip,
        },
      ];
    }
    createPolicy({
      variables: {
        input: { ...submitPolicyData, addresses: addresses },
      },
    });
  };
  return { handleSubmitData, createPolicyLoading };
};

export default useSubmitData;
