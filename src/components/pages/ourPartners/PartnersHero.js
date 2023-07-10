import React from 'react';
import * as styles from '../../scss/ourPartners/partners-hero.module.scss';
import FormButton from '../../form-button/FormButton';
import partnersVideo from './partners-video.mp4';
import partnersVideoPoster from './poster.png';

const PartnersHero = () => {
  return (
    <div className={styles.heroContainer}>
      <h1 className={styles.heroTitle}>Our Partners</h1>
      <p className={styles.heroSubtitle}>
        Creating new lines of non-interest revenue for today&apos;s banks.
      </p>
      <video
        playsInline
        controls
        poster={partnersVideoPoster}
        preload="metadata"
        className={styles.video}
        autoPlay={true}
      >
        <source src={partnersVideo} type="video/mp4" />
      </video>
      <FormButton
        className={styles.requestInfoButton}
        onClick={() => alert('Info requested')}
      >
        <strong>Request</strong> info
      </FormButton>
      <a className={styles.link} href="tel: +15313334700" title="Request info per phone">
        Or call us at (531) 333-4700
      </a>
    </div>
  );
};

export default PartnersHero;
