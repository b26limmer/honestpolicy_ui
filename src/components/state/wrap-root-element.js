import React from 'react';
import ZipContextProvider from './zipContext';
import { LocationProvider } from '@reach/router';
import ApolloProvider from './client';
import PropTypes from 'prop-types';
import CompareContextProvider from './CompareContextProvider';
import { ReduxProvider } from '../redux/reduxContext';
import { combineComponents } from './combineComponents';
import InsuranceWalletDataProvider from './InsuranceWalletDataProvider';
import AlertsDataProvider from './AlertsContext';
import QuoteDataProvider from './QuoteDataProvider';
import Theme from './ThemeContextProvider';
import ScriptsDataProvider from './ScriptsDataProvider';
import LocaleContext from './LocaleContext';
const providers = [
  ApolloProvider,
  ZipContextProvider,
  CompareContextProvider,
  LocationProvider,
  InsuranceWalletDataProvider,
  ReduxProvider,
  AlertsDataProvider,
  QuoteDataProvider,
  Theme,
  ScriptsDataProvider,
  LocaleContext,
];
const AppContextProvider = combineComponents(...providers);

const wrapRootElement = ({ element }) => {
  return <AppContextProvider>{element}</AppContextProvider>;
};
wrapRootElement.propTypes = {
  element: PropTypes.object,
};
export default wrapRootElement;
