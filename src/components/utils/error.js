import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import { Alert as MuiAlert } from '@mui/material';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Error = ({
  error,
  position = { vertical: 'bottom', horizontal: 'center' },
  type = 'error',
  setError = () => {},
}) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (error && !open) {
      setOpen(true);
    }
  }, [error]);
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setError('');
    }, 100);
  };
  return (
    <Snackbar
      anchorOrigin={position}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type}>
        {error}
      </Alert>
    </Snackbar>
  );
};
Error.propTypes = {
  error: PropTypes.string.isRequired,
  setError: PropTypes.func,
  type: PropTypes.string,
  position: PropTypes.object,
};
export default Error;
