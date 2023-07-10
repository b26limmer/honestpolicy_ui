import React from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material';

const Theme = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#00AD84',
      },
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;

Theme.propTypes = {
  children: PropTypes.node.isRequired,
};
