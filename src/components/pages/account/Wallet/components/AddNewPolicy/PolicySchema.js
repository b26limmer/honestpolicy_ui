import * as Yup from 'yup';

const PolicySchema = Yup.object().shape({
  carrierId: Yup.number().required('Carrier is required'),
  policyNumber: Yup.string().required('Policy Number is  required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  address1: Yup.string().required('Address is required'),
  address1City: Yup.string().required('City is required'),
  address1State: Yup.string().required('State is required'),
  address1Zip: Yup.number().required('Zip is required'),
  address2: Yup.string().notRequired(),
  address2City: Yup.string().notRequired(),
  address2State: Yup.string().notRequired(),
  address2Zip: Yup.number().notRequired(),
  costPerMonth: Yup.number().required('Cost per month is required'),
  coverageBeginDate: Yup.date().required('Coverage begin date is required'),
  coverageEndDate: Yup.date().required('Coverage end date is required'),
  bodilyInjuryLiability: Yup.string().required('Bodily injury liability is required'),
  propertyDamageLiability: Yup.string().required('Property damage liability is required'),
  uninsuredMotorist: Yup.string().required('Motorist is required'),
  comprehensive: Yup.string().required('Comprehensive is required'),
  emergencyRoadside: Yup.string().required('Emergency roadside is required'),
  collision: Yup.string().required('Collision is required'),
});

export default PolicySchema;
