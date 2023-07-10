import React from 'react';
import PropTypes, { bool } from 'prop-types';
import { withStyles, makeStyles } from '@mui/styles';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}));

function ValueLabelComponent({ children, open, value }) {
  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const StyledSlider = withStyles({
  root: {
    color: '#3880ff',
    height: 2,
    padding: '20px 0px',
    margin: 0,
    ['@media (max-width:768px)']: {
      margin: '10px 0 30px',
    },
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: '#006BA8',
    marginTop: -8,
    marginLeft: -14,
    '&:focus, &:hover, &$active': {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
    },
  },
  active: {},
  track: {
    height: 0,
  },
  rail: {
    height: 4,
    opacity: 0.5,
    backgroundColor: '#DBDBDB',
  },
  mark: {
    backgroundColor: '#B4DAEF',
    height: 8,
    width: 2,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
  markLabel: {
    fontSize: 13,
    marginTop: 6,
  },
  markLabelActive: {
    fontSize: 18,
    fontWeight: 600,
  },
  valueLabel: {
    left: 'calc(-50% + 3px)',
    top: -32,
    '& *': {
      background: '#006BA8',
      color: 'white',
    },
  },
})(Slider);

const CustomSlider = ({ value, onChange, max, percentageField }) => {
  const marks = [
    {
      value: 0,
      label: '$0',
    },
    {
      value: 25,
      label: max / 4 >= 1000 ? '$' + max / 4000 + 'K' : '$' + max / 4,
    },
    {
      value: 50,
      label: max / 2 >= 1000 ? '$' + max / 2000 + 'K' : '$' + max / 2,
    },
    {
      value: 75,
      label: (max * 3) / 4 >= 1000 ? '$' + (max * 3) / 4000 + 'K' : '$' + (max * 3) / 4,
    },
    {
      value: 100,
      label:
        max >= 1000000
          ? '$' + max / 1000000 + 'M'
          : max >= 1000
          ? '$' + max / 1000 + 'K'
          : '$' + max,
    },
  ];
  const percentageMarks = [
    {
      value: 0,
      label: '0%',
    },
    {
      value: 25,
      label: `${max / 4}%`,
    },
    {
      value: 50,
      label: `${max / 2}%`,
    },
    {
      value: 75,
      label: `${(max / 4) * 3}%`,
    },
    {
      value: 100,
      label: `${max}%`,
    },
  ];
  const classes = useStyles();

  function valueLabelFormat(value) {
    return value; // * (max / 100);
  }
  return (
    <div className={classes.root}>
      <StyledSlider
        step={1} // 100 / max
        onChange={onChange}
        marks={percentageField ? percentageMarks : marks}
        value={value / (max / 100)}
        valueLabelDisplay="auto"
        valueLabelFormat={valueLabelFormat}
      />
    </div>
  );
};
CustomSlider.defaultProps = {
  percentageField: false,
};
CustomSlider.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  max: PropTypes.number.isRequired,
  percentageField: bool,
};

export default CustomSlider;
