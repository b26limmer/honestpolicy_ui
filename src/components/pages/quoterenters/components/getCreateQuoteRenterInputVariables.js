import { phoneFormatToNumbers } from '../../../../utils/validation';

const createRentersParams = values => {
  return {
    deductible: values.deductible,
    personalProperty: values.personalProperty,
    personalLiability: values.personalLiability,
    medicalPayments: values.medicalPayments,
    contentsCoverage: values.contentsCoverage,
    residence: values.residence,
    yearOccupied: values.yearOccupied,
    safetyFeatures: values.safetyFeatures,
    centralBurglarAlarm: values.centralBurglarAlarm,
    centralFireAlarm: values.centralFireAlarm,
    effective: values.effective,
  };
};
const getCreateQuoteRenterInputVariables = values => {
  let variables = {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    phone: phoneFormatToNumbers(values.phone),
    phoneType: 'mobile',
    address1: values.address1,
    address2: values.address2,
    addressCity: values.addressCity,
    addressState: values.addressState,
    addressZip: values.addressZip,
    gender: values.gender,
    maritalStatus: values.maritalStatus,
    dob: values.dob,
    renters: createRentersParams(values),
  };
  return variables;
};

export default getCreateQuoteRenterInputVariables;
