import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import Paper from '../../../utils/paper';
import Autocomplete from '@mui/material/Autocomplete';
import { withStyles } from '@mui/styles';
import useWindowSize from '../../../utils/UseWindowSize';
import { TextField } from '@mui/material';
import { navigate } from 'gatsby';
import { CompareContext } from '../../../state/CompareContextProvider';
import { CarrierCard } from '../../search/CarrierResults/CarrierResults';
import Button from '../../../form-button';
import _ from 'lodash';

import * as styles from './carrier-compare.module.scss';
import classNames from 'classnames';
import { GatsbyImage } from 'gatsby-plugin-image';

const GreenTextField = withStyles({
  root: {
    backgroundColor: 'white',
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        // borderColor: 'green',
      },
      '&:hover fieldset': {
        borderColor: 'green',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
})(TextField);

export const AutoCarriers = ({ carriers, carrierToCompare, setCarrierToCompare }) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    if (inputValue === '') {
      setOptions(carrierToCompare ? [carrierToCompare] : carriers);
    }
  }, [inputValue]);
  const size = useWindowSize();
  return (
    <Autocomplete
      options={carriers}
      getOptionLabel={option => option.data.name}
      style={{ width: size.width > 768 ? 300 : '100%' }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(e, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setCarrierToCompare(newValue);
      }}
      renderInput={params => (
        <GreenTextField
          {...params}
          value={carrierToCompare}
          label="Select carrier"
          variant="outlined"
        />
      )}
    />
  );
};

const Compare = ({ name, carriers, carriersToCompare, logo, activeLineOfBusiness }) => {
  const { removeAllCarriers, setCarriersToCompare, setSelectedLine } =
    useContext(CompareContext);
  const [carrierToCompare, setCarrierToCompare] = useState('');
  useEffect(() => {
    if (carrierToCompare) {
      if (carrierToCompare.data) {
        setSelectedLine(activeLineOfBusiness);
        setCarriersToCompare([name, carrierToCompare.data.name]);
      }
    } else {
      removeAllCarriers();
    }
  }, [carrierToCompare]);
  const byLineOfBusiness = carrier => {
    return !_.isEmpty(
      carrier.data.Ratings.find(rating => rating.data.Line === activeLineOfBusiness)
    );
  };
  return (
    <>
      <Paper className={styles.carrierCompare}>
        <h2 className={styles.carrierCompareTitle}>Compare</h2>
        <p className={styles.carrierCompareDescription}>
          How does {name} compare to other insurance companies? Click the following links
          below to compare {name} to other top insurance companies.
        </p>
        <div className={classNames(styles.carrierCompareContainer, styles.topContainer)}>
          <GatsbyImage
            objectFit="contain"
            image={logo}
            alt={`${name} logo`}
            className={styles.carrierLogoMain}
          />
          <h5 className={styles.carrierTemplateSubtitle}>Vs</h5>
          <div className={styles.compareCtaContainer}>
            <AutoCarriers
              setCarrierToCompare={setCarrierToCompare}
              carrierToCompare={carrierToCompare}
              carriers={carriersToCompare.filter(byLineOfBusiness)}
              removeAllCarriers={removeAllCarriers}
            />
          </div>
        </div>
        <div className={styles.carrierCompareButtonWrapper}>
          {carrierToCompare && (
            <Button onClick={() => navigate('/compare')}>Compare</Button>
          )}
        </div>
      </Paper>
      <div className={styles.carrierCompareCoverageOptions}>
        <h3 className={styles.carrierCompareTitle}>Other Carriers</h3>
        <div className={styles.carriersSection}>
          {carriers.filter(byLineOfBusiness).map((carrier, idx) => (
            <CarrierCard
              activeLineOfBusiness={activeLineOfBusiness}
              key={idx}
              carrier={carrier.data}
              isComparePage
              currentCarrier={name}
            />
          ))}
        </div>
        <div className={styles.carrierCompareCoverageOptionsButton}>
          <Button Component={Link} to="/search">
            Show More
          </Button>
        </div>
      </div>
    </>
  );
};

AutoCarriers.propTypes = {
  carriers: PropTypes.array.isRequired,
  carrierToCompare: PropTypes.any,
  setCarrierToCompare: PropTypes.func.isRequired,
};
Compare.propTypes = {
  name: PropTypes.string.isRequired,
  carriers: PropTypes.array.isRequired,
  carriersToCompare: PropTypes.array.isRequired,
  logo: PropTypes.object.isRequired,
  activeLineOfBusiness: PropTypes.string.isRequired,
};

export default Compare;
