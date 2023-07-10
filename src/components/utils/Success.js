import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import { Alert as MuiAlert } from '@mui/material';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Success = ({ success, setSuccess }) => {
  const [open, setOpen] = useState(true);

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      setOpen(false);
      setSuccess('');
    } else {
      setOpen(false);
      setSuccess('');
    }
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
        {success}
      </Alert>
    </Snackbar>
  );
};
Success.propTypes = {
  success: PropTypes.string.isRequired,
  setSuccess: PropTypes.func.isRequired,
};

export default Success;
