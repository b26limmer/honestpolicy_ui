import React from 'react';
import PropTypes from 'prop-types';
import { Player } from '@lottiefiles/react-lottie-player';
import { default as loadingAnimation } from '../lottieFiles/loadingAnimation.json';
import * as styles from './loading.module.scss';

const Loading = ({ size }) => {
  return (
    <div className={styles.loadingContainer} style={{ '--size': size }}>
      <Player autoplay loop src={loadingAnimation} className={styles.lottiePlayer} />
    </div>
  );
};
Loading.defaultProps = {
  size: 50,
};
Loading.propTypes = { size: PropTypes.number };

export default Loading;
