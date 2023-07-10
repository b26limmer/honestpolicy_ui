import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import * as styles from './carrier-bar-graph.module.scss';
import PropTypes from 'prop-types';

const CarrierBarGraph = ({ name, ratingData, websiteData, billingData }) => {
  const chartData = {
    labels: [
      'Customer Service',
      websiteData.value && 'Billing Process & Policy Information',
      billingData.value && 'Website & Apps',
    ].filter(Boolean),
    datasets: [
      {
        label: name,
        backgroundColor: '#00bf91',
        borderColor: '#00bf91',
        borderWidth: 1,
        hoverBackgroundColor: '#00bf91',
        hoverBorderColor: '#00bf91',
        data: [ratingData?.value, billingData?.value, websiteData?.value].filter(Boolean),
      },
      {
        label: 'Industry Average',
        backgroundColor: '#000080',
        borderColor: '#000080',
        borderWidth: 1,
        hoverBackgroundColor: '#000080',
        hoverBorderColor: '#000080',
        data: [ratingData?.average, billingData?.average, billingData?.value].filter(
          Boolean
        ),
      },
    ],
  };
  return (
    <div className={styles.carrierBarGraph}>
      <HorizontalBar
        data={chartData}
        options={{
          legend: {
            display: true,
            defaultFontSize: 14,
          },
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                gridLines: {
                  display: false,
                },
                ticks: {
                  fontSize: 14,
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  callback: function (value) {
                    if (value % 1 === 0) {
                      return value;
                    }
                  },
                },
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};
CarrierBarGraph.propTypes = {
  name: PropTypes.string.isRequired,
  ratingData: PropTypes.object,
  websiteData: PropTypes.object,
  billingData: PropTypes.object,
};
export default CarrierBarGraph;
