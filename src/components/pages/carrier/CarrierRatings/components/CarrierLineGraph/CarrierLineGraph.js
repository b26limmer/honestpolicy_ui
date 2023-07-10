import React from 'react';
import { Line } from 'react-chartjs-2';
import * as styles from './carrier-line-graph.module.scss';
import PropTypes from 'prop-types';

const CarrierLineGraph = ({
  complaints: initialComplaints = [],
  rules,
  activeLineOfBusiness,
}) => {
  const newRules = rules.sort((a, b) => b.low - a.low);

  const complaints = initialComplaints?.filter(
    complaint => complaint?.data?.Line === activeLineOfBusiness
  );

  let yLabels = { ...newRules.map(item => item.ruleName) };

  const chartData = () => {
    return {
      labels: complaints.map(item => item?.data?.Year).reverse(),
      datasets: [
        {
          fill: false,
          borderColor: '#00bf91',
          borderCapStyle: 'round',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'whitesmoke',
          pointBackgroundColor: 'rgb(0, 0, 128)',
          borderWidth: 5,
          pointRadius: 5,
          pointBorderWidth: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: 'rgb(0, 0, 128)',
          pointHoverBorderColor: '#fff',
          pointHitRadius: 0,
          data: [...complaints].reverse().map(label =>
            newRules.findIndex(item => {
              return (
                label?.data?.Complaint_Index >= item.low &&
                label.data?.Complaint_Index <= item.high
              );
            })
          ),
        },
      ],
    };
  };

  return (
    <div className={styles.carrierLineGraph}>
      <div className={styles.carrierLineGraphTitle}>
        <span>Complaints by year</span> (normalized against company size)
      </div>
      <div className={styles.carrierLineGraphInner}>
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            legend: false,
            lineTension: 0,
            bezierCurve: false,
            elements: {
              line: {
                tension: 0,
              },
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                  ticks: {
                    fontStyle: 600,
                    fontSize: 14,
                    fontColor: '#2F2F2F',
                    display: true,
                  },
                },
              ],
              yAxes: [
                {
                  gridLines: {
                    // display: false,
                  },
                  ticks: {
                    beginAtZero: true,
                    display: true,
                    max: 6,
                    fontSize: 14,
                    callback: function (label) {
                      return yLabels[label];
                    },
                  },
                  pointLabels: {
                    fontStyle: 'bold',
                  },
                  labels: {},
                },
              ],
              ticks: {
                fontStyle: 'bold',
                fontFamily: "'Open Sans', sans-serif",
              },
              labels: {
                fontFamily: "'Open Sans', sans-serif",
                fontStyle: 'bold',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

CarrierLineGraph.propTypes = {
  complaints: PropTypes.array.isRequired,
  rules: PropTypes.array.isRequired,
  activeLineOfBusiness: PropTypes.string.isRequired,
};
export default CarrierLineGraph;
