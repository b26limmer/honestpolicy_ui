import { getStateNameFromCode } from '../../../../../../utils/states';
import {
  capitalizeFirst,
  getValueForInputTypeDate,
} from '../../../../../../utils/validation';
import { getCreateQuoteInputAutoVariables } from '../../../../quoteauto/components/getCreateQuoteInputAutoVariables';
import _ from 'lodash';

const getNewCoverageLevelQuoteVariables = (coverageLevel, quotes) => {
  let variables = {};
  const addVariables = newVariables => {
    Object.assign(variables, newVariables);
  };
  const reusableQuote = _.cloneDeep(Object.entries(quotes)[0][1]);
  if (reusableQuote.quote_type == 'auto') {
    if (reusableQuote.previous_address1) {
      reusableQuote.same_address = 'No';
    }
    reusableQuote.same_garaged = capitalizeFirst(reusableQuote.same_garaged);
    reusableQuote.address_state = getStateNameFromCode(reusableQuote.address_state);
    variables = getCreateQuoteInputAutoVariables(reusableQuote);
    let getEffectiveDate = () => {
      let [year, month, day] = reusableQuote.effective_date.split('-');
      let effectiveDate = new Date();
      effectiveDate.setDate(day);
      effectiveDate.setMonth(month - 1);
      effectiveDate.setFullYear(year);
      let now = new Date();
      let differenceNowEffectiveDate = (effectiveDate - now) / 1000 / 60 / 60 / 24;
      if (differenceNowEffectiveDate < 1) {
        effectiveDate = getValueForInputTypeDate(
          new Date(new Date().setDate(new Date().getDate() + 1))
        );
        return effectiveDate;
      }
      return getValueForInputTypeDate(effectiveDate);
    };
    let newDrivers = variables.drivers.map((driver, idx) => {
      return {
        ...driver,
        gender: capitalizeFirst(reusableQuote.drivers[idx].gender),
        stateFirstLicensed: reusableQuote.drivers[idx].state_first_licensed,
        currentLicenseState: reusableQuote.drivers[idx].current_license_state,
        ageFirstLicensed: reusableQuote.drivers[idx].age_first_licensed,
        maritalStatus: capitalizeFirst(reusableQuote.drivers[idx].marital_status),
      };
    });

    let newVehicles = variables.vehicles.map((vehicle, idx) => {
      let vehicleDetails = reusableQuote.vehicles[idx];
      return {
        ...vehicle,
        annualMileage: vehicleDetails.annual_mileage,
        lengthOwned: vehicleDetails.length_owned,
        ownershipType: vehicleDetails.ownership_type,
        primaryUse: vehicleDetails.primary_use,
        vin: vehicleDetails.vin_number,
      };
    });
    addVariables({
      drivers: newDrivers,
      vehicles: newVehicles,
      effectiveDate: getEffectiveDate(),
      autoCoverageLevel: coverageLevel,
    });
  }
  return variables;
};

export default getNewCoverageLevelQuoteVariables;
