import React, { useState, useContext } from 'react';
import * as styles from '../../scss/home/hero.module.scss';
import carSvg from '../../../images/car.svg';
import houseSvg from '../../../images/sydney-opera-house.svg';
import { navigate } from 'gatsby';
import { ZipContext } from '../../state/zipContext';
import ZipCodeForm from '../../zip-code-form';
import { AlertsContext } from '../../state/AlertsContext';

const Hero = () => {
  const [activeInsurance, setActiveInsurance] = useState('');
  const { zipCode, setZipCode } = useContext(ZipContext);
  const { dispatchAlert } = useContext(AlertsContext);
  const toggleInsurance = insuranceType => {
    switch (insuranceType) {
      case 'car':
        setActiveInsurance('car');
        break;
      case 'home':
        setActiveInsurance('home');
        break;
      default:
        console.error('error');
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (!activeInsurance) {
      dispatchAlert('Please select an insurance type');
      return;
    }
    if (!zipCode.match(/^[0-9]{5}(?:-[0-9]{4})?$/)) {
      dispatchAlert('Zipcode is not valid!');
      setZipCode('');
      return;
    } else {
      navigate('/search');
    }
  };
  return (
    <div className={styles.heroContainerSearch}>
      <div className={styles.turn}>
        <div className={styles.heroTextInput}>
          <div className={styles.heroDescriptionSearch}>
            Check out all the Carriers on Honest Policy
          </div>
          <div className={styles.buttonContainerSearch}>
            <button
              onClick={() => {
                toggleInsurance('car');
              }}
              value="care"
              className={styles.insuranceSelector}
            >
              <div className={styles.svgContainer}>
                <img
                  loading="lazy"
                  alt="Car SVG"
                  className={styles.svg}
                  style={{ width: '70px' }}
                  src={carSvg}
                />
              </div>
              <div className={styles.inputContainer}>
                <div
                  className={
                    activeInsurance === 'car' ? styles.checkboxActive : styles.checkbox
                  }
                />
                <div>Car Insurance</div>
              </div>
            </button>
            <button
              onClick={() => {
                toggleInsurance('home');
              }}
              value="home"
              className={styles.insuranceSelector}
            >
              <div className={styles.svgContainer}>
                <img
                  loading="lazy"
                  alt="Home SVG"
                  className={styles.svg}
                  style={{ width: '50px' }}
                  src={houseSvg}
                />
              </div>
              <div className={styles.inputContainer}>
                <div
                  className={
                    activeInsurance === 'home' ? styles.checkboxActive : styles.checkbox
                  }
                />
                <div>Home Insurance</div>
              </div>
            </button>
          </div>
          <ZipCodeForm
            className={styles.zipForm}
            handleSubmit={handleSubmit}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </div>
      </div>
    </div>
  );
};
export default Hero;
