import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import { withStyles } from '@mui/styles';
import MuiDialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import * as styles from '../login-form.module.scss';
import LoginForm from '../LoginForm';
import { useRedux } from '../../../redux/reduxContext';
import RegisterForm from '../../register-form/RegisterForm';

const muiStyles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(muiStyles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle className={classes.root} {...other}>
      <Typography>{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const LoginPopup = ({ open, noRedirect }) => {
  const [state, reduxDispatcher] = useRedux();
  const [toggleSignUp, setToggleSignUp] = useState(false);

  const handleClose = () => {
    reduxDispatcher({
      type: 'LOGIN_POPUP_ACTION',
      payload: {
        open: false,
      },
    });
  };
  return (
    <Dialog
      open={open || state?.loginPopup?.open}
      onClose={handleClose}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      maxWidth={'md'}
      classes={{ root: styles.loginPopup, paper: styles.papeComponent }}
      style={{ width: '100%', margin: 0, padding: 0 }}
    >
      <DialogTitle onClose={handleClose} />
      {toggleSignUp ? (
        <RegisterForm setToggleSignUp={setToggleSignUp} />
      ) : (
        <LoginForm setToggleSignUp={setToggleSignUp} noRedirect={noRedirect} />
      )}
    </Dialog>
  );
};
LoginPopup.defaultProps = {
  noRedirect: false,
};
LoginPopup.propTypes = {
  open: PropTypes.bool,
  noRedirect: PropTypes.bool,
};
export default LoginPopup;
