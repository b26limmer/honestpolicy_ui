import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Hidden from '@mui/material/Hidden';
import * as styles from './compare-ratings.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const CompareRatings = ({ selectedCarriers }) => {
  const [infoText, setInfoText] = useState('');
  const data = {
    cs: "Our customer service score measures two primary things: user satisfaction when interacting with the carrier's representatives, and their experience with online tools like quoting and managing a policy via website or app.",
    ss: "Data comes from customer reviews, officially filed complaints, financial stability data, and other insurance industry rating companies. Combining these metrics and sources provides the most accurate and broad-based analysis of what matters most when considering carriers' overall quality compared to other auto insurers. While there is some overlap between our three primary metrics, each has unique characteristics that set them apart from each other",
    claim:
      "Our claims process score looks at users' experiences when filling claims with carriers. It takes into account not only claim outcomes, but also the ease of making and tracking it, as well as how fast the carrier handles it.",
    value:
      'Value for Price score measures customer satisfaction when considering how much they pay versus the quality of their experience when dealing with the company.',
    complaints:
      'By weighting complaints and business against their totals, and then dividing share of compliants by share of the market, we get the index value. With 1.0 being an average number of complaints, a 0.5 would be half as many complaints.',
  };
  const showInfo = section => {
    setInfoText(data[section]);
  };
  return (
    <div className={styles.compareRatings}>
      <div className={styles.compareRatingsInner}>
        {!!infoText && (
          <div className={styles.infoTextContainer}>
            <p className={styles.infoText}>{infoText}</p>
          </div>
        )}
        <h2 className={styles.compareRatingsTitle}>Carrier Ratings Breakdown</h2>
        <div className={styles.compareRatingsTable}>
          <div className={styles.compareRatingsRow}>
            <h3
              className={classNames(
                styles.carrierTemplateSectionTitle,
                styles.sectionTitle
              )}
            >
              Smart Score
              <a
                className={styles.tooltipIcon}
                onMouseLeave={() => setInfoText('')}
                onMouseOver={() => showInfo('ss')}
                title="Show Info"
              >
                i
              </a>
            </h3>
            <div className={styles.compareRatingsCells}>
              {selectedCarriers.map((c, idx) => {
                return (
                  <div className={styles.compareRatingsCell} key={idx}>
                    <Hidden mdUp>
                      <h3 className={styles.carrierName}>{c.name}</h3>
                    </Hidden>
                    <div className={styles.compareRatingsCellTitle}>
                      {c.smartScoreRating}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.compareRatingsRow}>
            <h3
              className={classNames(
                styles.carrierTemplateSectionTitle,
                styles.sectionTitle
              )}
            >
              Customer Service
              <a
                className={styles.tooltipIcon}
                onMouseLeave={() => setInfoText('')}
                onMouseOver={() => showInfo('cs')}
                title="Show Info"
              >
                i
              </a>
            </h3>
            <div className={styles.compareRatingsCells}>
              {selectedCarriers.map((c, idx) => {
                return (
                  <div className={styles.compareRatingsCell} key={idx}>
                    <Hidden mdUp>
                      <h3 className={styles.carrierName}>{c.name}</h3>
                    </Hidden>
                    <div className={styles.compareRatingsCellTitle}>
                      {c.customerServiceRating}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.compareRatingsRow}>
            <h3
              className={classNames(
                styles.carrierTemplateSectionTitle,
                styles.sectionTitle
              )}
            >
              Claims Score
              <a
                className={styles.tooltipIcon}
                onMouseLeave={() => setInfoText('')}
                onMouseOver={() => showInfo('claim')}
                title="Show Info"
              >
                i
              </a>
            </h3>
            <div className={styles.compareRatingsCells}>
              {selectedCarriers.map((c, idx) => {
                return (
                  <div className={styles.compareRatingsCell} key={idx}>
                    <Hidden mdUp>
                      <h3 className={styles.carrierName}>{c.name}</h3>
                    </Hidden>
                    <div className={styles.compareRatingsCellTitle}>
                      {c.claimsProcessRating}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.compareRatingsRow}>
            <h3
              className={classNames(
                styles.carrierTemplateSectionTitle,
                styles.sectionTitle
              )}
            >
              Value for Price
              <a
                className={styles.tooltipIcon}
                onMouseLeave={() => setInfoText('')}
                onMouseOver={() => showInfo('value')}
                title="Show Info"
              >
                i
              </a>
            </h3>
            <div className={styles.compareRatingsCells}>
              {selectedCarriers.map((c, idx) => {
                return (
                  <div className={styles.compareRatingsCell} key={idx}>
                    <Hidden mdUp>
                      <Grid item xs={6}>
                        <h3 className={styles.carrierName}>{c.name}</h3>
                      </Grid>
                    </Hidden>
                    <div className={styles.compareRatingsCellTitle}>
                      {c.valueForPriceRating}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.compareRatingsRow}>
            <h3
              className={classNames(
                styles.carrierTemplateSectionTitle,
                styles.sectionTitle
              )}
            >
              Official Complaints
              <a
                className={styles.tooltipIcon}
                onMouseLeave={() => setInfoText('')}
                onMouseOver={() => showInfo('complaints')}
                title="Show Info"
              >
                i
              </a>
            </h3>
            <div className={styles.compareRatingsCells}>
              {selectedCarriers.map((c, idx) => {
                return (
                  <div className={styles.compareRatingsCell} key={idx}>
                    <Hidden mdUp>
                      <Grid item xs={6}>
                        <h3 className={styles.carrierName}>{c.name}</h3>
                      </Grid>
                    </Hidden>

                    <div className={styles.compareRatingsCellTitle}>
                      {c.complaintIndex}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CompareRatings.propTypes = {
  selectedCarriers: PropTypes.array,
};

export default CompareRatings;
