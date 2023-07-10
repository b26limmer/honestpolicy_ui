import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { isZipCode } from '../../utils/validation';
import { GATSBY_API_ENDPOINT } from '../pages/quoteauto/components/VehiclesForm/api';
import { navigate } from 'gatsby';

export const ZipContext = createContext();
export const ZipProvider = ZipContext.Provider;
export const ZipConsumer = ZipContext.Consumer;

const ZipContextProvider = ({ children }) => {
  const [zipCode, setZipCode] = useState('');
  const [activeInsurance, setActiveInsurance] = useState('car');
  const [stateData, setStateData] = useState({});
  const findState = () => {
    if (isZipCode(zipCode)) {
      fetch(`${GATSBY_API_ENDPOINT}/api/v1/states/search/${zipCode}`)
        .then(res => {
          if (res.ok) {
            return res.json();
          } else if (res.status === 404) {
            throw "We couldn't find that zipcode";
          } else {
            throw 'An unexpected error occured';
          }
        })
        .then(json => {
          setStateData(json);
        })
        .catch(error => navigate('/', { state: { error } }));
    }
  };
  const zipState = {
    zipCode: zipCode,
    setZipCode: setZipCode,
    stateData: stateData,
    setStateData: setStateData,
    findState: findState,
    activeInsurance: activeInsurance,
    setActiveInsurance: setActiveInsurance,
  };
  return <ZipProvider value={zipState}>{children}</ZipProvider>;
};

export default ZipContextProvider;

ZipContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
