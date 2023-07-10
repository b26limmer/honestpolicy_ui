import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js';
import PropTypes from 'prop-types';

const yLabels = {
  0: 'Worse',
  1: 'Worst',
  2: 'Bad',
  3: 'Average',
  4: 'Good',
  5: 'Better',
  6: 'Best',
};

export const chartTooltip = {
  backgroundColor: '#1e2022',
  titleFontColor: '#8f8f8f',
  borderColor: '#424242',
  borderWidth: 0.5,
  bodyFontColor: '#8f8f8f',
  bodySpacing: 10,
  xPadding: 15,
  yPadding: 15,
  cornerRadius: 0.15,
};

export const lineChartOptions = {
  legend: {
    // padding: 50,
    display: true,
    position: 'right',
    labels: {
      // This more specific font property overrides the global property
      fontFamily: 'Montserrat',
    },
    padding: 20,
  },
  responsive: true,
  maintainAspectRatio: false,
  tooltips: chartTooltip,
  plugins: {
    datalabels: {
      display: false,
    },
  },
  scales: {
    yAxes: [
      {
        gridLines: {
          display: true,
          lineWidth: 1,
          color: 'rgba(0,0,0,0.1)',
          drawBorder: false,
        },
        ticks: {
          padding: 15,
          beginAtZero: true,
          callback: function (value) {
            return yLabels[value];
          },
          fontSize: 14,
          fontFamily: 'Montserrat',
          fontStyle: '500',
          fontColor: 'black',
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          padding: 15,
          fontSize: 14,
          fontFamily: 'Montserrat',
          fontStyle: '500',
          fontColor: 'black',
        },
      },
    ],
  },
};

const Line = ({ data, shadow = false }) => {
  const chartContainer = useRef(null);
  const [, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      if (shadow) {
        Chart.controllers.lineWithShadow = Chart.controllers.line;
        Chart.controllers.lineWithShadow = Chart.controllers.line.extend({
          draw(ease) {
            Chart.controllers.line.prototype.draw.call(this, ease);
            const {
              chart: { ctx },
            } = this;
            ctx.save();
            ctx.shadowColor = 'rgba(0,0,0,0.15)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 10;
            ctx.responsive = true;
            ctx.stroke();
            Chart.controllers.line.prototype.draw.apply(this, arguments);
            ctx.restore();
          },
        });
      }
      const context = chartContainer.current.getContext('2d');
      const newChartInstance = new Chart(context, {
        type: shadow ? 'lineWithShadow' : 'line',
        options: lineChartOptions,
        data,
      });
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, data, shadow]);

  return <canvas ref={chartContainer} />;
};

Line.propTypes = {
  data: PropTypes.object,
  shadow: PropTypes.bool,
};

export default Line;
