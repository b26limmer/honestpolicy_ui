import React, { useReducer, useContext } from 'react';
import { reducer, initialState } from './reducer';

const ReduxContext = React.createContext();

export const ReduxProvider = ({ children }) => {
  const contextValue = useReducer(reducer, initialState);
  return <ReduxContext.Provider value={contextValue}>{children}</ReduxContext.Provider>;
};

export const useRedux = () => {
  const contextValue = useContext(ReduxContext);
  return contextValue;
};
