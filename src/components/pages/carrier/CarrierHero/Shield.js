import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import * as styles from './carrier-hero.module.scss';

const Shield = () => {
  return (
    <StaticImage
      src={'../../../../images/carrierTemplate/shield.png'}
      alt="Smart Score"
      className={styles.shieldImgWrapper}
      height={200}
      layout="constrained"
      objectFit="contain"
      placeholder="tracedSVG"
      quality={80}
      tracedSVGOptions={{ fillStrategy: 'FILL_MEAN' }}
      formats={['auto', 'webp']}
    />
  );
};

export default Shield;
