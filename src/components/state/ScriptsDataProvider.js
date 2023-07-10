import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import loadHeap from '../utils/loadHeap';
import LogRocket from 'logrocket';
import doIfNoDevelopment from '../utils/doIfNotDevelopment';

export const ScriptsContext = createContext();
export const ScriptsProvider = ScriptsContext.Provider;

const ScriptsDataProvider = ({ children }) => {
  const [heap, setHeap] = useState({});
  const identifyUser = ({ email, id, firstName }) => {
    try {
      heap.identify(id);
      heap.addUserProperties({
        email: email,
        Name: firstName,
      });
      doIfNoDevelopment(() =>
        LogRocket.identify(id, {
          name: firstName,
          email: email,
        })
      );
    } catch (e) {
      console.error(e);
    }
  };
  const track = (eventName, params) => {
    try {
      heap.track(eventName, params);
    } catch (e) {
      console.error(e);
      LogRocket.captureException(e);
    }
  };
  useEffect(() => {
    loadHeap(heap, setHeap);
  }, []);

  const state = {
    heap,
    setHeap,
    identifyUser,
    track,
  };

  return <ScriptsProvider value={state}>{children}</ScriptsProvider>;
};

ScriptsDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ScriptsDataProvider;
