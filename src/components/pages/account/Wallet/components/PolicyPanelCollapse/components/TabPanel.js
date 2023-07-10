import React from 'react';
import PropTypes from 'prop-types';
import Box from '../../../../../../box';

const TabPanel = ({ children, value, index, styles, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={styles.box} p={3}>
          {children}
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number,
  index: PropTypes.number,
  styles: PropTypes.object.isRequired,
};

export default TabPanel;
