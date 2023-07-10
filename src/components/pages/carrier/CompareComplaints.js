import React, { useState } from 'react';
import * as styles from '../../scss/carrier/ratings.module.scss';
import carrierTemplateStyles from '../../scss/carrier/carrierTemplate.module.scss';
import Paper from '../../utils/paper';
import { Grid, Hidden } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chart from './Chart';
import PropTypes from 'prop-types';

export const lineChartData = {
  labels: [2017, 2018, 2019],
  datasets: [
    {
      lineTension: 0,
      label: '',
      data: [4, 6, 3],
      borderColor: '#236591',
      //pointBackgroundColor: '#1e2022',
      //pointBorderColor: '#236591',
      //pointHoverBackgroundColor: '#236591',
      //pointHoverBorderColor: '#1e2022',
      pointRadius: 0,
      //pointBorderWidth: 2,
      //pointHoverRadius: 8,
      fill: false,
    },

    {
      lineTension: 0,
      label: 'Counts ',
      data: [3, 5, 5],
      borderColor: '#236591',
      //pointBackgroundColor: '#1e2022',
      //pointBorderColor: '#236591',
      //pointHoverBackgroundColor: '#236591',
      //pointHoverBorderColor: '#1e2022',
      pointRadius: 0,
      //pointBorderWidth: 2,
      //pointHoverRadius: 8,
      fill: false,
    },
  ],
};

const CompareComplaints = ({ selectedCarriers = [] }) => {
  const [activeSection, setActiveSection] = useState(false);

  const toggleSection = () => setActiveSection(!activeSection);
  return (
    <div className={styles.ratingPaperContainer}>
      <Paper
        className={[
          styles.headerSection,
          !activeSection && styles.headerSectionInactive,
        ].join(' ')}
      >
        <Grid container>
          <Grid item xs={12} sm={3}>
            <h3 className={styles.carrierTemplateSectionTitle}>Official Complaints</h3>
          </Grid>
          {selectedCarriers.map((c, idx) => {
            return (
              <Grid key={idx} item xs={12} sm>
                <Grid container>
                  <Hidden smUp>
                    <Grid item xs={6}>
                      <h3 className={styles.carrierTemplateSectionTitle}>{c.name}</h3>
                    </Grid>
                  </Hidden>
                  <Grid
                    classes={{ root: carrierTemplateStyles.compareScoreContainer }}
                    item
                    xs={6}
                    sm
                  >
                    <h3 className={carrierTemplateStyles.compareScore}>
                      {c.complaintIndex}
                    </h3>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
          {selectedCarriers.length === 1 && <Grid item xs />}
          <Grid container style={{ marginTop: '10px' }}>
            <Grid item xs={12}>
              <Grid
                container
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {activeSection ? (
                  <ExpandLessIcon onClick={toggleSection} />
                ) : (
                  <ExpandMoreIcon onClick={toggleSection} />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/*
        <div className={styles.spaceEvenlyRow}>
          <h3
            className={
              ratingData.section.search('Complaints') === -1
                ? styles.carrierTemplateSectionTitle
                : styles.carrierTemplateSectionTitleExtended
            }
          >
            {ratingData.section.search('Complaints') === -1
              ? ratingData.section
              : 'Official Complaints'}
          </h3>
          <h3
            className={
              ratingData.section.search('Complaints') === -1
                ? styles.carrierTemplateSectionTitleGreen
                : styles.carrierTemplateSectionTitleGreenExtended
            }
          >
            {ratingData.section.search('Complaints') === -1
              ? ratingData.score
              : `${
                  ratingsData.Complaint_Index <
                  rules.Complaints_Chart.rules.filter(rule => rule.ruleName === 'Average')[0].low
                    ? 'Better than average'
                    : ratingsData.Complaint_Index <
                      rules.Complaints_Chart.rules.filter(rule => rule.ruleName === 'Average')[0]
                        .high
                    ? 'Average'
                    : 'Worse than average'
                }`}
          </h3>
          {ratingData.section.search('Complaints') === -1 && (
            <Graph
              graphRef={desktopGraphRef}
              ratingData={ratingData}
              graphWidth={graphWidth}
              sectionWidth={sectionWidth}
              carrierScoreRef={carrierScoreRef}
              carrierScoreWidth={carrierScoreWidth}
              calculateCarrierScoreWidth={calculateCarrierScoreWidth}
              name={name}
              classToApply={styles.desktopGraphArea}
            />
          )}

          <div className={styles.buttonContainer}>
            <button
              className={[
                styles.toggleSectionButton,
                activeSection ? styles.buttonAnimation : '',
              ].join(' ')}
              type="button"
              onClick={toggleSection}
            >
              {activeSection ? '-' : '+'}
            </button>
          </div>
        </div>
        */}
      </Paper>
      <Paper className={activeSection ? styles.sectionBody : styles.sectionBodyInactive}>
        <Grid container style={{ paddingTop: '25px', paddingBottom: '15px' }}>
          <Grid item xs></Grid>
          <Grid item xs={12} md={8} lg={6} classes={{ root: styles.chartContainer }}>
            <Chart data={lineChartData} />
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </Paper>
    </div>
  );
};
CompareComplaints.propTypes = {
  selectedCarriers: PropTypes.array,
};

export default CompareComplaints;
