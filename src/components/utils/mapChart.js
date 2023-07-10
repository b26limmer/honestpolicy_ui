import React from 'react';
import PropTypes from 'prop-types';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

const MapChart = ({ data, classToApply, setTooltipContent }) => {
  return (
    <ComposableMap projection="geoAlbersUsa" data-tip="" className={classToApply}>
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                stroke={'#eeeeee'}
                style={{
                  default: {
                    outline: 'none',
                  },
                  hover: {
                    outline: 'none',
                  },
                  pressed: {
                    outline: 'none',
                    transform: 'scale(1.005)',
                  },
                }}
                strokeWidth="1px"
                geography={geo}
                fill={
                  data.find(state => state === geo.properties.name)
                    ? '#00bf91'
                    : '#adadad'
                }
                onMouseEnter={() => {
                  const { name } = geo.properties;
                  if (name) {
                    setTooltipContent(name);
                  }
                }}
                onMouseLeave={() => {
                  setTooltipContent('');
                }}
              />
            ))}
          </>
        )}
      </Geographies>
    </ComposableMap>
  );
};
MapChart.propTypes = {
  data: PropTypes.array.isRequired,
  classToApply: PropTypes.string,
  setTooltipContent: PropTypes.func,
};
export default React.memo(MapChart);
