import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import * as styles from './carrier-insurance.module.scss';
import PropTypes from 'prop-types';

const CarrierInsurance = ({ logo, name, isCar }) => {
  return (
    <div className={styles.carrierInsurance}>
      <div className={styles.carrierInsuranceImage}>
        <GatsbyImage image={logo} alt={name} objectFit="contain" />
      </div>
      <div className={styles.carrierInsuranceName}>
        {name} <br /> {isCar ? 'Car Insurance' : 'Home Insurance'}
      </div>
    </div>
  );
};
CarrierInsurance.propTypes = {
  logo: PropTypes.object,
  name: PropTypes.string,
  isCar: PropTypes.bool,
};
export default CarrierInsurance;
