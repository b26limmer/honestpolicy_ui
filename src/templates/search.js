import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CompareContext } from '../components/state/CompareContextProvider';
import Layout from '../components/layout/layout';
import SEO from '../components/layout/seo';
import { Grid } from '@mui/material';
import { ZipContext } from '../components/state/zipContext';
import SearchBar from '../components/pages/search/SearchBar';
import CarrierResults from '../components/pages/search/CarrierResults';
import SearchHero from '../components/pages/search/SearchHero';
import * as styles from '../components/scss/search/searchtemplate.module.scss';
import { getStateNameFromCode } from '../utils/states';
import { AlertsContext } from '../components/state/AlertsContext';
import { GATSBY_API_ENDPOINT } from '../components/pages/quoteauto/components/VehiclesForm/api';

const sortOptions = [
  { name: 'Smart_Score', value: 'Smart Score' },
  { name: 'name', value: 'Name' },
];

const Search = ({ pageContext }) => {
  const { zipCode } = useContext(ZipContext);
  const { dispatchAlert } = useContext(AlertsContext);
  const [activeLineOfBusiness, setActiveLineOfBusiness] = useState('Auto');
  const [searchInput, setSearchInput] = useState('');
  const [filteredState, setFilteredState] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [resultsCount, setResultsCount] = useState('');
  const [sortedBy, setSortedBy] = useState(sortOptions[0]?.name);
  const carriersData = pageContext.data.allAirtable.edges;
  const { carriersToCompare, removeAllCarriers } = useContext(CompareContext);
  useEffect(() => {
    removeAllCarriers();
    if (!zipCode) {
      setSearchResults(carriersData.sort(defaultSorting));
    }
  }, []);

  useEffect(() => {
    if (zipCode && zipCode.length > 4) {
      findState();
    }
    if (!zipCode) {
      setSearchResults(carriersData);
      setResultsCount(carriersData?.length);
      setFilteredState('');
    }
  }, [zipCode]);

  const defaultSorting = (a, b) => {
    if (!a.node.data.Ratings || !a.node.data.Ratings[0] || !a.node.data.Ratings[0].data) {
      return -1;
    }

    if (!b.node.data.Ratings || !b.node.data.Ratings[0] || !b.node.data.Ratings[0].data) {
      return 1;
    }
    const checkA = a.node.data.Ratings.filter(
      ratings => ratings.data.Line == activeLineOfBusiness
    );
    const checkB = b.node.data.Ratings.filter(
      ratings => ratings.data.Line == activeLineOfBusiness
    );
    let carrierARatings;
    let carrierBRatings;
    if (checkA.length) {
      carrierARatings = checkA[0].data;
    } else {
      return -1;
    }
    if (checkB.length) {
      carrierBRatings = checkB[0].data;
    } else {
      return 1;
    }

    return carrierBRatings.Smart_Score - carrierARatings.Smart_Score;
  };

  const handleEditSort = value => {
    setSortedBy(value);
    handleSort(value);
  };

  const handleSort = value => {
    if (value === 'name') {
      setResultsCount(searchResults?.length);
      setSearchResults(
        searchResults.sort((a, b) =>
          a?.node?.data?.name < b?.node?.data?.name
            ? -1
            : a?.node?.data?.name === b?.node?.data?.name
            ? 0
            : 1
        )
      );
    }
    if (value === 'Smart_Score') {
      setResultsCount(searchResults?.length);
      setSearchResults(searchResults.sort(defaultSorting));
    }
  };
  const sortWithFilter = results => {
    if (!sortedBy) {
      return results;
    }
    if (sortedBy === 'name') {
      results.sort((a, b) =>
        a?.node?.data?.name < b?.node?.data?.name
          ? -1
          : a?.node?.data?.name === b?.node?.data?.name
          ? 0
          : 1
      );
    }
    if (sortedBy === 'Smart_Score') {
      results.sort(defaultSorting);
    }

    return results;
  };

  const findState = () => {
    if (zipCode) {
      fetch(`${GATSBY_API_ENDPOINT}/api/v1/states/search/${zipCode}`)
        .then(res => {
          if (res.ok) {
            return res.json();
          } else if (res.status === 404) {
            throw 404;
          }
        })
        .then(json => {
          setFilteredState(json.state.name);
          fireFiltering(json.state.name);
        })
        .catch(err => {
          err === 404
            ? dispatchAlert("We couldn't find that zip code")
            : dispatchAlert(`We couldn't find that zip code`);
        });
    }
  };

  const fireFiltering = async zipState => {
    let results = carriersData.filter(carrier => filterFunc({ carrier, zipState }));
    results = sortWithFilter(results);
    let resultsLength = results.length;
    setResultsCount(resultsLength);
    setSearchResults(results);
  };

  function filterFunc({ carrier, zipState = '' }) {
    let isValid = false;
    const carrierStates = carrier.node.data.Line_by_State;
    let lineOfBusiness = activeLineOfBusiness.toLowerCase();
    for (let stateNode of carrierStates) {
      if (!zipState && lineOfBusiness === stateNode.data.Line) {
        isValid = true;
      } else if (
        zipState === getStateNameFromCode(stateNode.data.State) &&
        lineOfBusiness === stateNode.data.Line
      ) {
        isValid = true;
      }
    }

    if (carrier.node.data.Ratings && isValid) {
      isValid = false;
      carrier.node.data.Ratings.forEach(element => {
        if (element.data.Line === activeLineOfBusiness) {
          isValid = true;
        }
      });
    }

    return isValid;
  }
  useEffect(() => {
    if (filteredState) {
      fireFiltering(filteredState);
    } else if (pageContext.state) {
      setFilteredState(pageContext.state);
      fireFiltering(pageContext.state);
    } else {
      fireFiltering();
    }
  }, [pageContext, activeLineOfBusiness]);

  return (
    <Layout>
      <SEO
        title="Carrier Index"
        description="Found all carriers filtering by name and/or state"
        url="/search"
      />
      <SearchHero
        activeLineOfBusiness={activeLineOfBusiness}
        pageContext={pageContext}
        filteredState={filteredState}
      />
      <Grid container className={styles.container}>
        <Grid item xs={12} md={12}>
          <SearchBar
            resultsCount={parseInt(resultsCount)}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            setFilteredState={setFilteredState}
            filteredState={filteredState}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            carriersData={carriersData}
            carriersToCompare={carriersToCompare}
            sortOptions={sortOptions}
            sortedBy={sortedBy}
            setSortedBy={handleEditSort}
            activeLineOfBusiness={activeLineOfBusiness}
            setActiveLineOfBusiness={setActiveLineOfBusiness}
          />
          <CarrierResults
            carriersData={searchResults}
            searchResults={searchResults}
            industryAvg={pageContext.data.industryAvg.nodes}
            sortedBy={sortedBy}
            activeLineOfBusiness={activeLineOfBusiness}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

Search.propTypes = {
  pageContext: PropTypes.object,
};
export default Search;
