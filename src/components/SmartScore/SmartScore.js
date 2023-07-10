import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RatingShieldIcon from '../icons/RatingShieldIcon';
import * as styles from './smart-score.module.scss';

const SmartScore = ({ rating, type, isActive }) => {
  return (
    <div
      className={classNames(styles.smartScore, { [styles.smartScoreActive]: isActive })}
    >
      <div className={styles.smartScoreShield}>
        <RatingShieldIcon />
        <div className={styles.smartScoreShieldRating}>{rating}</div>
      </div>
      <h4 className={styles.smartScoreTitle}>{type}</h4>
    </div>
  );
};
SmartScore.propTypes = {
  rating: PropTypes.number,
  type: PropTypes.string,
  isActive: PropTypes.bool,
};
export default SmartScore;
