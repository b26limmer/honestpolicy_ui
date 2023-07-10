import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const CompareContext = createContext();
export const CompareProvider = CompareContext.Provider;

const CompareContextProvider = ({ children }) => {
  const [carriersToCompare, setCarriersToCompare] = useState([]);
  const [selectedLine, setSelectedLine] = useState('Auto');

  const addNewCarrier = carrier => {
    const carriers = carriersToCompare;
    if (carriers.length > 4 || carriersToCompare.includes(carrier)) {
      return;
    }

    setCarriersToCompare([...carriersToCompare, carrier]);
  };
  const removeCarrier = carrierName => {
    let carriersFiltered = carriersToCompare.filter(carrier => carrierName !== carrier);
    setCarriersToCompare(carriersFiltered);
  };
  const removeAllCarriers = () => {
    setCarriersToCompare([]);
  };
  const CompareState = {
    carriersToCompare: carriersToCompare,
    setCarriersToCompare: setCarriersToCompare,
    addNewCarrier: addNewCarrier,
    removeCarrier: removeCarrier,
    removeAllCarriers: removeAllCarriers,
    selectedLine: selectedLine,
    setSelectedLine: setSelectedLine,
  };
  return <CompareProvider value={CompareState}>{children}</CompareProvider>;
};

export default CompareContextProvider;

CompareContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
