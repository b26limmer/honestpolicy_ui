import React from 'react';
import Paper from '../../utils/paper';
import * as styles from '../../scss/carrier/getQuotes.module.scss';
// import PropTypes from 'prop-types';

const GetQuotes = () => {
  return (
    <Paper className={styles.paperContainer}>
      <div className={styles.container}>
        <p className={styles.carrierTemplateText}>
          Want to get a price for this company?
        </p>
        <button className={styles.getQuotesButton}>Get Quotes</button>
      </div>
    </Paper>
  );
};

export default GetQuotes;
