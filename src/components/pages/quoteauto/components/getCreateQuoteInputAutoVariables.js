import { convertStateNameToCode } from '../../../../utils/states';
import { phoneFormatToNumbers } from '../../../../utils/validation';

export const getCreateQuoteInputAutoVariables = values => {
  const checkObjectRequiredFields = object => {
    let fieldsAreFilled = true;
    Object.values(object).forEach(field => {
      if (!field) {
        fieldsAreFilled = false;
      }
    });
    if (fieldsAreFilled) {
      return fieldsAreFilled;
    }
  };
  let variables = {
    quoteType: 'auto',
    firstName: values?.first_name,
    lastName: values?.last_name,
    phone: phoneFormatToNumbers(values?.phone),
    phoneType: 'mobile',
    email: values?.email,
    rentOrOwn: values?.rent_or_own,
    address1: values?.address1,
    address2: values?.address2,
    addressCity: values?.address_city,
    addressZip: values?.address_zip,
    addressState: convertStateNameToCode(values?.address_state),
    previousResidence: values?.same_address === 'No' ? 'yes' : 'no',
    sameGaraged: values.same_garaged.toLowerCase(),
    currentCarrier: values.current_carrier,
    autoCoverageLevel: values?.auto_coverage_level,
    priorLiability:
      values?.prior_liability === 'IDK' ? '50/100' : values?.prior_liability,
    continuousCoverage: values?.continuous_coverage,
    lengthAtDwelling: values?.same_address === 'No' ? '2 Years' : '3 Years',
    effectiveDate: values?.effectiveDate,
  };

  let drivers = [];
  values.drivers.forEach(driver => {
    let [year, month, day] = driver.dob.split('-');
    let newDriver = {
      firstName: driver.first_name,
      lastName: driver.last_name,
      dobMonth: month,
      dobDay: day,
      dobYear: year,
      gender: driver.gender,
      maritalStatus: driver.marital_status,
      education: driver.education,
      industry: driver.industry,
      occupation: driver.occupation,
      currentLicenseState: convertStateNameToCode(driver.current_license_state),
      ageFirstLicensed: parseInt(driver.ageFirstLicensed),
      stateFirstLicensed: convertStateNameToCode(driver.stateFirstLicensed),
    };
    if (checkObjectRequiredFields(newDriver)) {
      drivers.push(newDriver);
    }
  });

  let vehicles = [];
  values?.vehicles.forEach(v => {
    let newVehicle = {
      annualMileage: parseInt(v.annualMileage),
      lengthOwned: v.lengthOwned,
      make: v.make,
      model: v.model,
      trim: v.trim,
      ownershipType: v.ownershipType,
      primaryUse: v.primaryUse,
      vin: v.vin,
      year: v.year,
    };
    if (checkObjectRequiredFields(newVehicle)) {
      vehicles.push(newVehicle);
    }
  });

  const addVariables = newVariables => {
    Object.assign(variables, newVariables);
  };
  if (values?.same_address === 'No') {
    addVariables({
      previousAddress1: values?.previous_address1,
      previousAddress2: values?.previous_address2,
      previousAddressCity: values?.previous_address_city,
      previousAddressState: convertStateNameToCode(values?.previous_address_state),
      previousAddressZip: values?.previous_address_zip,
    });
  }

  if (values?.same_garaged === 'No') {
    addVariables({
      garageAddress1: values?.garage_address1,
      garageAddress2: values?.garage_address2,
      garageAddressCity: values?.garage_address_city,
      garageAddressState: convertStateNameToCode(values?.garage_address_state),
      garageAddressZip: values?.garage_address_zip,
    });
  }

  if (values.current_carrier === 'No Prior Insurance') {
    addVariables({
      whyNoInsurance: values.why_no_insurance,
    });
  } else {
    addVariables({
      currentCarrierLength: values?.current_carrier_length,
    });
  }

  if (values.address_state === 'New Jersey') {
    addVariables({
      healthCoverAccidentInj: values.health_cover_accident_inj.toLowerCase(),
    });
  }
  if (drivers.length) {
    addVariables({ drivers });
    if (values.address_state === 'Michigan') {
      let newDrivers = drivers.map((driver, idx) => {
        return {
          ...driver,
          healthcarePlan: values.drivers[idx].healthcare_plan,
        };
      });
      addVariables({ drivers: newDrivers });
    }
  }
  if (vehicles.length) {
    addVariables({ vehicles });
  }
  if (values.hasIncidents == 'Yes') {
    let stateOnQuote = values.garage_address_state || values.address_state;
    let required = ['type', 'description', 'date'];
    let newIncidents = values.incidents.map(incident => {
      let data = {};
      if (incident.type == 'accident') {
        data.bodilyInjury = parseInt(incident.bodily_injury);
        data.propertyDamage = parseInt(incident.property_damage);
      } else if (incident.type == 'loss') {
        data.lossValue = parseInt(incident.loss_value);
      }
      if (stateOnQuote == 'North Carolina') {
        data.prayerForJudgement = incident.prayer_for_judgement;
      }
      data.driver = parseInt(incident.driver);
      data.vehicle = parseInt(incident.vehicle);
      required.forEach(field => (data[field] = incident[field]));
      return data;
    });
    addVariables({
      incidents: newIncidents,
    });
  }

  return variables;
};
