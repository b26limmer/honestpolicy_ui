import React from 'react';
import { withStyles } from '@mui/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import * as styles from './radio.module.scss';
import Error from '../../error/Error';
import PropTypes from 'prop-types';

const GreenRadio = withStyles({
  root: {
    color: '#00bf91',
    '&$checked': {
      color: '#00bf91',
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

const CustomRadio = ({ hasError, options, value = '', handleChange }) => {
  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={value}
        onChange={handleChange}
      >
        <div className={styles.formRadio}>
          {options.map((item, key) => {
            return (
              <FormControlLabel
                key={`option-${item?.value}-${key}`}
                value={item?.value}
                control={<GreenRadio />}
                label={item?.label}
              />
            );
          })}
        </div>
      </RadioGroup>
      {hasError && <Error error={hasError} />}
    </FormControl>
  );
};
CustomRadio.propTypes = {
  hasError: PropTypes.bool,
  options: PropTypes.array,
  value: PropTypes.string,
  handleChange: PropTypes.func,
};
export default CustomRadio;
