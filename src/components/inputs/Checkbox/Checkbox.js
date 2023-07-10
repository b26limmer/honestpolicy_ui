import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { withStyles } from '@mui/styles';

const FormCheckbox = withStyles({
  root: {
    color: '#595959',
    '&$checked': {
      color: '#595959',
    },
  },
  checked: {},
})(props => <Checkbox color="default" size="medium" {...props} />);

export default FormCheckbox;
