import React from 'react';
import PropTypes from 'prop-types';
import Paper from '../../utils/paper';
import * as styles from '../../scss/carrier/aboutCarrier.module.scss';

const AboutCarrier = ({ name, about, logo }) => {
  const years = [
    {
      year: '1897',
      text: `${name} was founded in 1897 as Continental Assurance Company of North America, to provide health insurance to railroad employees. The motto back then was "Protection and Security."`,
    },
    {
      year: '1960s',
      text: `${name} Over the next several decades, Continental Assurance would go through one merger and complete two acquisitions. In the 1960s, the company changed its name to Continental National American Group or CNA`,
    },
    {
      year: '1999',
      text: `Fast forward to 1999. CNA sells its personal lines of insurance to Allstate so it can focus on commercial lines of insurance. ${name} then introduces its newly purchased subsidiary as Encompass Insurance Company. Today, Encompass offers its personal insurance products in 39 states through 2,400 independent agents.`,
    },
  ];
  let colors = ['#6078EA', '#F7AE85', '#FB6786'];
  return (
    <Paper>
      <h2 className={styles.carrierTemplateTitle}>About {name}</h2>
      <div className={styles.center}>
        <p className={styles.aboutText}>{about.About_Carrier_Text}</p>
        <img loading="lazy" src={logo} alt="Logo" className={styles.logo} />
      </div>
      <h3 className={styles.historySectionTitle}>History of {name}</h3>
      <div className={styles.historyOf}>
        {years.map((year, idx) => (
          <div key={idx} className={styles.yearContainer}>
            <h5 style={{ color: colors[idx % 3] }} className={styles.yearTitle}>
              {year.year}
            </h5>
            <p className={styles.text}>{year.text}</p>
          </div>
        ))}
      </div>
    </Paper>
  );
};

AboutCarrier.propTypes = {
  name: PropTypes.string.isRequired,
  about: PropTypes.object.isRequired,
  logo: PropTypes.string.isRequired,
};

export default AboutCarrier;
