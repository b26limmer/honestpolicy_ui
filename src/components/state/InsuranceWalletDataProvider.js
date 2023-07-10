import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const InsuranceWalletDataContext = createContext();
export const InsuranceWalletProvider = InsuranceWalletDataContext.Provider;

const InsuranceWalletDataProvider = ({ children }) => {
  const [vehiclePolicies, setVehiclePolicies] = useState(null);
  const [propertyPolicies, setPropertyPolicies] = useState(null);
  const [personalPolicies, setPersonalPolicies] = useState(null);

  const state = {
    vehiclePolicies: vehiclePolicies,
    setVehiclePolicies: setVehiclePolicies,
    propertyPolicies: propertyPolicies,
    setPropertyPolicies: setPropertyPolicies,
    personalPolicies: personalPolicies,
    setPersonalPolicies: setPersonalPolicies,
  };
  return <InsuranceWalletProvider value={state}>{children}</InsuranceWalletProvider>;
};

export default InsuranceWalletDataProvider;

InsuranceWalletDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
