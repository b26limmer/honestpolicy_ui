import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const QuoteDataContext = createContext();
export const QuoteProvider = QuoteDataContext.Provider;

const QuoteDataProvider = ({ children }) => {
  const [vehicleQuotes, setVehicleQuotes] = useState(null);
  const [propertyQuotes, setPropertyQuotes] = useState(null);
  const [personalQuotes, setPersonalQuotes] = useState(null);

  const state = {
    vehicleQuotes: vehicleQuotes,
    setVehicleQuotes: setVehicleQuotes,
    propertyQuotes: propertyQuotes,
    setPropertyQuotes: setPropertyQuotes,
    personalQuotes: personalQuotes,
    setPersonalQuotes: setPersonalQuotes,
  };
  return <QuoteProvider value={state}>{children}</QuoteProvider>;
};

export default QuoteDataProvider;

QuoteDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
