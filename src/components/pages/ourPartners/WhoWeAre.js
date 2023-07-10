/* eslint-disable react/display-name */
import React from 'react';
import * as styles from '../../scss/ourPartners/who-we-are.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';
import InfoText from '../../InfoText';

const WhoWeAre = () => {
  const data = [
    {
      icon: () => <FontAwesomeIcon icon={faHeadset} />,
      title: 'Insurance Quotes',
      description: 'We offer price comparison from over 100 insurance carriers',
    },
    {
      icon: () => <FontAwesomeIcon icon={faHeadset} />,
      title: '24/7 Support',
      description: 'Live phone / chat support for your customers insurance needs',
    },
    {
      icon: () => <FontAwesomeIcon icon={faHeadset} />,
      title: 'Data Security',
      description: 'SOC-2 compliant with continuous monitoring',
    },
  ];

  return (
    <div className={styles.columnContainer}>
      <h2 className={styles.sectionTitle}>Who We Are</h2>
      <p className={styles.text}>
        <strong>Honest Policy is a technology company.</strong> We work to help consumers
        make data-driven insurance purchases. Our founders first built the leading price
        comparison tool for insurance agents. Then a pro-consumer insurance ratings and
        reviews site which is now Honest Policy.
      </p>
      <div className={styles.characteristicsContainer}>
        {data.map((info, idx) => (
          <div key={idx} className={styles.characteristic}>
            <info.icon />
            <h4 className={styles.characteristicTitle}>{info.title}</h4>
            <p className={styles.text}>{info.description}</p>
          </div>
        ))}
      </div>
      <InfoText text="Learn more about our embedded technology" helpText="Example" />
      <div className={styles.ctaContainer}>
        <h3 className={styles.ctaTitle}>Interested in becoming a partner?</h3>
        <p className={styles.ctaText}>
          Call{' '}
          <a title="Request info" href="tel:+15313334700">
            (531) 333-4700
          </a>{' '}
          or email{' '}
          <a title="Contact us per email" href="mailto:partners@honestpolicy.com">
            partners@honestpolicy.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default WhoWeAre;
