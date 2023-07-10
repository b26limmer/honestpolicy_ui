import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { Grid } from '@mui/material';
import homeIcon from '../../../../images/carrierTemplate/casa.png';
import autoIcon from '../../../../images/carrierTemplate/eco-car.png';

import Button from '../../../form-button';
import Select from '../../../FormSelect';

import * as styles from './search-bar.module.scss';

function SearchBar({
  sortOptions,
  sortedBy,
  setSortedBy,
  carriersData,
  carriersToCompare,
  filteredState,
  activeLineOfBusiness,
  setActiveLineOfBusiness,
  resultsCount,
}) {
  const linesOfBusiness = ['Auto', 'Home'];
  return (
    <div className={styles.searchBar}>
      <Grid container classes={{ root: styles.selectContainer }}>
        <Grid item xs={12} md={4} container alignItems="center">
          <p className={styles.resultsCount}>
            {resultsCount || carriersData.length} carriers found
            {filteredState ? ` in ${filteredState}` : ''}
          </p>
        </Grid>
        <Grid
          item
          xs={12}
          md={carriersToCompare?.length === 0 ? 4 : 2}
          container
          alignItems="center"
          direction="row"
        >
          {linesOfBusiness.map(
            (line, idx) =>
              (carriersToCompare?.length === 0 || activeLineOfBusiness === line) && (
                <Grid item key={idx} md={6} xs={6}>
                  <button
                    onClick={() => setActiveLineOfBusiness(line)}
                    className={[
                      styles.sectionLink,
                      activeLineOfBusiness === line ? styles.activeSectionLink : '',
                    ].join(' ')}
                  >
                    <img
                      loading="lazy"
                      src={line === 'Auto' ? autoIcon : homeIcon}
                      className={styles.lineIcon}
                      alt="Insurance type icon"
                    />
                    {line}
                  </button>
                </Grid>
              )
          )}
        </Grid>
        <Grid
          item
          xs={12}
          md={carriersToCompare?.length === 0 ? 4 : 6}
          classes={{ root: styles.compareButtonContainer }}
        >
          <span className={styles.searchBarFilterLabel}>Sort By:</span>
          <Select
            rootClassName={styles.sortSelect}
            options={sortOptions.map(option => ({
              value: option?.name,
              text: option?.value,
            }))}
            placeholder="Policy type"
            hasDefaultOption={false}
            onChange={e => setSortedBy(e.target.value)}
            value={sortedBy}
          />
          {carriersToCompare?.length > 0 && (
            <Button
              isDisabled={!carriersToCompare.length}
              className={styles.compareButton}
              Component={Link}
              to="/compare"
            >
              Compare Selected ({carriersToCompare.length})
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

SearchBar.propTypes = {
  searchInput: PropTypes.string,
  setSearchInput: PropTypes.func,
  setFilteredState: PropTypes.func,
  filteredState: PropTypes.string,
  carriersData: PropTypes.array,
  carriersToCompare: PropTypes.array,
  setSearchResults: PropTypes.func,
  setActiveLineOfBusiness: PropTypes.func,
  searchResults: PropTypes.any,
  activeLineOfBusiness: PropTypes.string.isRequired,
  sortOptions: PropTypes.array,
  sortedBy: PropTypes.string,
  setSortedBy: PropTypes.func,
  resultsCount: PropTypes.number,
};

export default SearchBar;
