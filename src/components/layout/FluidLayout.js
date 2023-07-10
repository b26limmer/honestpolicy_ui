import React from 'react';
import { Container } from '@mui/material';
import Header from './header';
import Footer from './Footer';

import '../scss/layout/FluidLayout.scss';

export default ({ children }) => {
  return (
    <div className="bg">
      <Header />
      <Container classes={{ root: 'fluidContainer ph-20' }}>{children}</Container>
      <Footer />
    </div>
  );
};
