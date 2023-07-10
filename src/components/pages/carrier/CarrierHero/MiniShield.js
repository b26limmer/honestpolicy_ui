import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';

const MiniShield = () => {
  return (
    <StaticImage
      src="../../../../images/carrierTemplate/minishield.png"
      alt="Mini Shield"
      layout="fullWidth"
      objectFit="contain"
      placeholder="tracedSVG"
    />
  );
};

export default MiniShield;
