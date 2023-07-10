import React, { useEffect, useContext, useState } from 'react';
import classNames from 'classnames';
import rank0 from '../../images/carrierTemplate/rank1.png';
import rank1 from '../../images/carrierTemplate/rank2.png';
import rank2 from '../../images/carrierTemplate/rank3.png';
import rank3 from '../../images/carrierTemplate/rank4.png';
import * as styles from './alert.module.scss';
import { AlertsContext } from '../state/AlertsContext';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import PropTypes from 'prop-types';

const AlertMessage = () => {
  const {
    alertMessage,
    setAlertMessage,
    alertType,
    open,
    setOpen,
    messageDuration,
    setMouseOver,
    mouseOver,
  } = useContext(AlertsContext);
  const getAlertSettings = () => {
    let alertSettings = {};
    switch (alertType) {
      case 'success':
        alertSettings.img = rank0;
        alertSettings.label = 'Success';
        break;
      case 'info':
        alertSettings.img = rank1;
        alertSettings.label = 'Tip!';
        break;
      case 'warning':
        alertSettings.img = rank2;
        alertSettings.label = 'Warning';
        break;
      case 'error':
        alertSettings.img = rank3;
        alertSettings.label = 'Uh-oh';
        break;
      default:
        alertSettings.img = rank2;
        alertSettings.label = 'Uh-oh';
        break;
    }
    return alertSettings;
  };
  const clearMessage = isClose => {
    let messageTimeout;
    let animationTimeOut;
    if (isClose) {
      setOpen(false);
      messageTimeout = setTimeout(() => {
        setAlertMessage('');
        setMouseOver(false);
      }, 450);
    }
    if (alertMessage && open && !mouseOver) {
      animationTimeOut = setTimeout(() => {
        setOpen(false);
      }, messageDuration * 1000 - 450);
      messageTimeout = setTimeout(() => {
        setAlertMessage('');
        setMouseOver(false);
      }, messageDuration * 1000);
    }
    return { messageTimeout, animationTimeOut };
  };
  useEffect(() => {
    const { messageTimeout, animationTimeOut } = clearMessage();
    return () => {
      !!messageTimeout && clearTimeout(messageTimeout);
      !!animationTimeOut && clearTimeout(animationTimeOut);
    };
  }, [alertMessage, mouseOver]);

  return (
    <ClickAwayListener onClickAway={() => !!open && clearMessage(true)}>
      <div
        className={classNames(
          styles.alertContainer,
          styles[alertType],
          alertMessage ? styles.alertShow : styles.alertHidden
        )}
        onMouseEnter={() => setMouseOver(true)}
        onMouseOut={() => setMouseOver(false)}
      >
        <p className={styles.alertLabel}>{getAlertSettings().label}</p>
        <img
          src={getAlertSettings().img}
          alt={getAlertSettings().label}
          loading="lazy"
          className={styles.alertEmoji}
        />
        <p>{alertMessage}</p>
        <button
          onClick={() => clearMessage(true)}
          className={classNames(
            styles.closeButton,
            open ? styles.closeButtonOpen : styles.closeButtonClosed
          )}
        >
          <span />
          <span />
        </button>
      </div>
    </ClickAwayListener>
  );
};
export default AlertMessage;

export const StaticAlert = ({ alertType, message }) => {
  const [alertMessage, setAlertMessage] = useState('');
  const [open, setOpen] = useState(true);

  const getAlertSettings = () => {
    let alertSettings = {};
    switch (alertType) {
      case 'success':
        alertSettings.label = 'Success';
        break;
      case 'info':
        alertSettings.label = 'Tip!';
        break;
      case 'warning':
        alertSettings.label = 'Warning';
        break;
      case 'error':
        alertSettings.label = 'Uh-oh';
        break;
      default:
        alertSettings.label = 'Uh-oh';
        break;
    }
    return alertSettings;
  };
  useEffect(() => {
    if (message) {
      setAlertMessage(message);
      setOpen(true);
    }
  }, [message]);

  return (
    <div
      className={classNames(
        styles.staticAlertContainer,
        styles[alertType],
        alertMessage ? styles.staticAlertShow : styles.alertHidden
      )}
    >
      <p className={styles.alertLabel}>{getAlertSettings().label}</p>
      <p>{alertMessage}</p>
      <button
        onClick={() => {
          setOpen(false);
          setTimeout(() => {
            setAlertMessage('');
          }, 450);
        }}
        className={classNames(
          styles.closeButton,
          open ? styles.closeButtonOpen : styles.closeButtonClosed
        )}
      >
        <span />
        <span />
      </button>
    </div>
  );
};
StaticAlert.propTypes = {
  alertType: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
