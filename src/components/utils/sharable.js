import React from 'react';
import PropTypes from 'prop-types';
import * as styles from '../scss/variables.module.scss';
import classNames from 'classnames';

export const IconedCard = ({ icon, title, text, shadow }) => (
  <div className={classNames(styles.iconedCard, shadow ? styles.shadow : '')}>
    <div className={styles.svgContainer}>
      <img loading="lazy" className={styles.svgCard} src={icon} alt={title} />
    </div>
    <h3 className={styles.cardTitle}>{title}</h3>
    <p className={styles.cardText} dangerouslySetInnerHTML={{ __html: text }} />
  </div>
);

export const BlueZipForm = ({ label }) => (
  <form className={styles.blueZipForm}>
    <p className={styles.blueZipFormLabel}>{label}</p>
    <div className={styles.blueZipFormInputGroup}>
      <input id="Zip" className={styles.blueZipInput} placeholder="Enter zip code" />
      <button className={styles.blueZipFormButton}>Search</button>
    </div>
  </form>
);

IconedCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  shadow: PropTypes.bool,
};
IconedCard.defaultProps = {
  shadow: true,
};
BlueZipForm.propTypes = {
  label: PropTypes.string.isRequired,
};
