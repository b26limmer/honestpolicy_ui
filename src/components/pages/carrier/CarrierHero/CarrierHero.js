import React, { useEffect, useState } from 'react';
import * as styles from './carrier-hero.module.scss';
import PropTypes from 'prop-types';
import {
  getSmartScoreDescription,
  getClaimsProcessDescription,
  getValueForPriceDescription,
} from '../CarrierRatings/CarrierRatings';
import Container from '../../../container';
import Shield from './Shield';
import MiniShield from './MiniShield';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

const CarrierHero = ({ name, ratingData, sectionRef, returnIndicator, headingRef }) => {
  const [currPos, setCurrPos] = useState(0);
  useScrollPosition(
    ({ currPos }) => {
      setCurrPos(-currPos.y);
      switch (true) {
        case -currPos.y < headingRef?.current?.offsetTop:
          break;
        default:
          break;
      }
    },
    [],
    null,
    false,
    20
  );
  let isMobile = true;
  const [showTooltip, setShowTooltip] = useState(null);
  const [shrink, setShrink] = useState(false);
  const [rehydrate, setRehydrate] = useState(false);
  const industrySmartScore = returnIndicator('Smart Score');
  const ratings = [
    {
      name: 'Smart Score',
      rating: ratingData.Smart_Score,
      industry: returnIndicator('Smart Score'),
      information:
        'Loremp Ipsum oundviuefv sncowdcv asxasc qasd asco sh whe hwte ti ai ms dragisn ti ',
    },
    {
      name: 'Customer Service',
      rating: ratingData.Customer_Service,
      industry: returnIndicator('Customer Service'),
      information: getSmartScoreDescription(ratingData.Smart_Score, name),
    },
    {
      name: 'Claims Process',
      rating: ratingData.Claims_Process,
      industry: returnIndicator('Claims Process'),
      information: getClaimsProcessDescription(name),
    },
    {
      name: 'Value for Price',
      rating: ratingData.Value_for_Price,
      industry: returnIndicator('Value for Price'),
      information: getValueForPriceDescription(name),
    },
  ];

  useEffect(() => {
    if (!isMobile && sectionRef.current) {
      if (currPos > sectionRef.current.offsetTop) {
        !shrink && setShrink(true);
        rehydrate && setRehydrate(false);
      } else if (shrink) {
        setShrink(false);
        setRehydrate(true);
      }
    }
  }, [currPos, sectionRef, isMobile]);
  const hideTooltip = () => setShowTooltip(null);
  return (
    <Container ref={sectionRef} className={styles.carrierHero}>
      <div className={shrink ? styles.hide : styles.smartScoreArea}>
        <div className={styles.smartScore}>
          <Shield />
          <p className={styles.smartScoreTag}>Smart Score</p>
          <p className={styles.smartScoreNumber}>{ratingData.Smart_Score}</p>
        </div>
        <p className={[styles.ratingNameSmartScore, styles.ratingName].join(' ')}>
          {' '}
          Industry Average: {industrySmartScore?.data?.Average}
        </p>
      </div>
      <div className={styles.scoresAndSections}>
        <div className={styles.scores}>
          {ratings.map((rating, idx) => (
            <div
              key={idx}
              className={
                rating.name === 'Smart Score' && !shrink
                  ? styles.hide
                  : shrink
                  ? styles.scoreContainerShrink
                  : styles.scoreContainer
              }
            >
              <h2 className={styles.ratingName}>
                {rating.name}{' '}
                <span
                  className={styles.moreInfoButton}
                  onMouseOver={() => setShowTooltip(idx)}
                  onMouseLeave={hideTooltip}
                />
                {showTooltip === idx && (
                  <span
                    className={shrink ? styles.showTooltipShrinked : styles.showTooltip}
                    style={{ '--idx': idx }}
                  >
                    {rating.information}
                  </span>
                )}
              </h2>
              <div className={shrink ? styles.miniShieldShrink : styles.miniShield}>
                <div className={styles.shieldImageWrapper}>
                  <MiniShield />
                </div>
                <p className={styles.ratingNumber}>
                  {rating.rating}
                  <br />
                  <span className={styles.ratingNumberBase}>
                    {rating.name === 'Smart Score' ? '/100' : '/10'}
                  </span>
                </p>
              </div>
              <p className={shrink ? styles.hide : styles.industryAverageText}>
                Industry Average: {rating?.industry?.data?.Average}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

CarrierHero.propTypes = {
  logo: PropTypes.string,
  name: PropTypes.string,
  ratingData: PropTypes.object,
  activeSection: PropTypes.string,
  setActiveSection: PropTypes.func,
  sectionRef: PropTypes.object,
  returnIndicator: PropTypes.func,
  isMobile: PropTypes.bool.isRequired,
  headingRef: PropTypes.object,
};

export default CarrierHero;
