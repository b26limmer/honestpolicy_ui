import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AlertsContext = createContext();
export const AlertsProvider = AlertsContext.Provider;

const AlertsDataProvider = ({ children }) => {
  const [alertMessage, setAlertMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState('error');
  const [messageDuration, setMessageDuration] = useState(3);
  const [mouseOver, setMouseOver] = useState(false);
  const ALERT_TYPES = ['success', 'info', 'warning', 'error'];

  /**
   * Triggers an alert and set message.
   * @param {string} message - Message to display to user.
   * @param {string} type - optional, default "error". Any of 'success', 'info', 'warning' or 'error'
   * @param {int} duration - optional, default 3
   */
  const dispatchAlert = (message, type = 'error', duration = 3) => {
    setAlertType(type);
    setMessageDuration(duration);
    setAlertMessage(message);
    setOpen(true);
  };
  const alertsState = {
    alertMessage: alertMessage,
    setAlertMessage: setAlertMessage,
    open: open,
    setOpen: setOpen,
    alertType: alertType,
    setAlertType: setAlertType,
    messageDuration: messageDuration,
    setMessageDuration: setMessageDuration,
    ALERT_TYPES: ALERT_TYPES,
    dispatchAlert: dispatchAlert,
    setMouseOver: setMouseOver,
    mouseOver: mouseOver,
  };
  return <AlertsProvider value={alertsState}>{children}</AlertsProvider>;
};

export default AlertsDataProvider;

AlertsDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
