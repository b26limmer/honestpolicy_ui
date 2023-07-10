import React, { useContext, useState } from 'react';
import { CompareContext } from '../../state/CompareContextProvider';
import * as styles from '../../scss/home/compareOnHome.module.scss';
import { graphql, useStaticQuery } from 'gatsby';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import { navigate } from 'gatsby';
import _ from 'lodash';
import { AlertsContext } from '../../state/AlertsContext';

const CompareOnHome = () => {
  const {
    allAirtable: { nodes: carrierNodes },
  } = useStaticQuery(graphql`
    query allCarriersHomeCompare {
      allAirtable(
        filter: {
          table: { eq: "Ratings" }
          data: { Carrier: { elemMatch: { data: { slug: { glob: "*" } } } } }
        }
      ) {
        nodes {
          data {
            Line
            Carrier {
              data {
                name
              }
            }
          }
        }
      }
    }
  `);
  const { dispatchAlert } = useContext(AlertsContext);
  const { setCarriersToCompare, selectedLine, setSelectedLine } =
    useContext(CompareContext);
  const [carrierOne, setCarrierOne] = useState(null);
  const [carrierTwo, setCarrierTwo] = useState(null);
  const autocompleteOptions = carrierNodes
    .map(node => {
      return {
        label: node.data.Carrier[0].data.name,
        name: node.data.Carrier[0].data.name,
        line: node.data.Line,
      };
    })
    .filter(carrier => carrier.line === selectedLine)
    .sort((a, b) => {
      if (a.label > b.label) return 1;
      if (a.label < b.label) return -1;
      else return 0;
    });
  const handleLineChange = line => {
    setCarrierOne(null);
    setCarrierTwo(null);
    setSelectedLine(line);
  };
  const handleCompare = e => {
    e.stopPropagation();
    if (carrierOne?.name && carrierTwo?.name) {
      setCarriersToCompare([carrierOne.name, carrierTwo.name]);
      navigate('/compare');
    } else {
      dispatchAlert('Please select both carriers to compare', 'warn', 5);
    }
  };
  const carriersToCompareFields = [
    {
      carrier: carrierOne,
      setcarrier: setCarrierOne,
      othercarrier: carrierTwo,
    },
    {
      isVs: true,
    },
    {
      carrier: carrierTwo,
      setcarrier: setCarrierTwo,
      othercarrier: carrierOne,
    },
  ];
  const lines = ['Auto', 'Home'];
  return (
    <div className={styles.compareSection}>
      <div className={styles.blueContainer}>
        <h2 className={styles.sectionTitle}>
          Easily compare <strong>insurance companies</strong>
        </h2>
        <p className={styles.whiteText}>
          How does one insurance provider compare to others? Select two carriers below!
        </p>
      </div>
      <div className={styles.compareToolContainer}>
        <div className={styles.compareLabel}>
          <p>START COMPARING!</p>
        </div>
        <div className={styles.lineSelectorContainer}>
          {lines.map((line, idx) => (
            <button
              key={idx}
              className={
                selectedLine === line ? styles.lineButtonSelected : styles.lineButton
              }
              onClick={() => handleLineChange(line)}
            >
              {line}
            </button>
          ))}
        </div>
        <div className={styles.autocompletesContainer}>
          {carriersToCompareFields.map(
            ({ setcarrier, carrier, othercarrier, isVs }, idx) =>
              isVs ? (
                <p key={idx} className={styles.vs}>
                  VS
                </p>
              ) : (
                <Autocomplete
                  key={idx}
                  clearOnBlur={_.isEmpty(carrier)}
                  autoHighlight={true}
                  handleHomeEndKeys={true}
                  disableClearable={false}
                  autoComplete
                  onChange={(e, value) => {
                    e.preventDefault();
                    setcarrier(value);
                  }}
                  isOptionEqualToValue={option => _.isEqual(option, carrier)}
                  value={carrier}
                  classes={{
                    root: styles.autoCompleteRoot,
                    focused: styles.inputFocused,
                  }}
                  getOptionLabel={option => option?.label}
                  getOptionDisabled={option => _.isEqual(option, othercarrier)}
                  options={autocompleteOptions}
                  renderInput={params => (
                    <TextField
                      placeholder="Select carrier"
                      value={carrier}
                      variant="outlined"
                      {...params}
                    />
                  )}
                />
              )
          )}
        </div>
        <button onClick={handleCompare} className={styles.compareButton}>
          Compare
        </button>
      </div>
    </div>
  );
};

export default CompareOnHome;
