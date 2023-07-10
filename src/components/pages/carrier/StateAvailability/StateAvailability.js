import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MapChart from '../../../utils/mapChart';
import ReactTooltip from 'react-tooltip';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircle from '@mui/icons-material/CheckCircle';
import OptionsToggle from '../../../options-toggle';
import statesData from '../allStates.json';

import * as styles from '../../../scss/carrier/stateAvailability.module.scss';

const StateAvailability = ({
  name,
  lineByState,
  selectedCarriers,
  activeLineOfBusiness,
}) => {
  const [selectedLine, setSelectedLine] = useState(
    activeLineOfBusiness == 'Auto' ? 1 : 0
  );
  const [content, setContent] = useState('');
  const data = [];
  const setData = (line, entry) => {
    let [state, hasCoverage] = entry;
    if (state.length < 3) {
      let stateIdx = statesData.findIndex(stateObj => stateObj.code === state);
      if (stateIdx !== -1) {
        state = statesData[stateIdx].name;
      }
    }
    let lineIndex = data.findIndex(group => group.line === line);
    if (hasCoverage) {
      if (lineIndex === -1) {
        data.push({
          line: line,
          states: [state.replace(/_/g, ' ')],
        });
      } else {
        data[lineIndex].states.push(state.replace(/_/g, ' '));
      }
    }
  };
  const createStateData = lineByStateData => {
    lineByStateData?.forEach(row => {
      let rawLine = row.data.Line;
      let line = rawLine.charAt(0).toUpperCase() + rawLine.slice(1);
      setData(line, [row.data.State, 'Y']);
    });
  };
  if (!selectedCarriers.length && lineByState) {
    createStateData(lineByState);
  } else {
    selectedCarriers.forEach(c => {
      createStateData(c.Line_by_State);
    });
  }

  const options = data?.map(item => {
    return {
      value: item?.line,
    };
  });

  const isAvailable =
    data.length > 0 &&
    data[selectedLine] &&
    data[selectedLine].states &&
    data[selectedLine].states.length;
  return (
    <div id="availability" className={styles.availabilityContainer}>
      <h2 className={styles.carrierTemplateTitle}>
        {isAvailable
          ? `${name} availability in these states`
          : `${name} doesn't have availability`}
      </h2>
      {isAvailable && (
        <>
          <OptionsToggle
            options={options}
            optionValue={selectedLine}
            setOptionValue={setSelectedLine}
          />
          <MapChart
            data={data[selectedLine].states}
            classToApply={styles.map}
            setTooltipContent={setContent}
          />
          <ReactTooltip backgroundColor="white">
            {selectedCarriers.length && content && (
              <div className={styles.stateAvailabilityTooltip}>
                <h2>{content}</h2>
                {selectedCarriers.map((c, idx) => {
                  const { line } = data[selectedLine];
                  const { code } = statesData.find(state => state.name == content);

                  const hasCoverage = !!c.Line_by_State.find(row => {
                    let data = row.data;
                    return data.Line == line.toLowerCase() && data.State == code;
                  });

                  return (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '5px',
                      }}
                      key={idx}
                    >
                      {hasCoverage ? (
                        <CheckCircle style={{ color: c.color, marginRight: '5px' }} />
                      ) : (
                        <CancelIcon style={{ color: '#818187', marginRight: '5px' }} />
                      )}{' '}
                      {c.name}
                    </div>
                  );
                })}
              </div>
            )}
          </ReactTooltip>
        </>
      )}
    </div>
  );
};

const StateAvailabilityTooltip = ({ state }) => {
  return (
    <div className={styles.stateAvailabilityTooltip}>
      <h2>{state}</h2>
    </div>
  );
};
StateAvailabilityTooltip.propTypes = {
  state: PropTypes.string,
};
StateAvailability.defaultProps = {
  selectedCarriers: [],
};
StateAvailability.propTypes = {
  name: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
  lineByState: PropTypes.array,
  selectedCarriers: PropTypes.array,
  activeLineOfBusiness: PropTypes.string,
};

export default StateAvailability;
