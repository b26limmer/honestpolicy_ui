import React from 'react';
import PropTypes from 'prop-types';
import { Player } from '@lottiefiles/react-lottie-player';
import { default as loadingAnimation } from '../lottieFiles/fetchingquotes.json';
import * as styles from './fetching-data.module.scss';

const FetchingData = ({ loadingText }) => {
  return (
    <div className={styles.loadingContainer}>
      <Player autoplay loop src={loadingAnimation} className={styles.lottiePlayer} />
      <h2 className={styles.loadingTitle}>{loadingText}</h2>
    </div>
  );
};

FetchingData.propTypes = {
  loadingText: PropTypes.string.isRequired,
};

export default FetchingData;
