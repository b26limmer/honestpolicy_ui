import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faCar, faHome } from '@fortawesome/fontawesome-pro-solid';
import DashboardLayout from '../../../layout/DashboardLayout';
import QuotesCollapse from './components/QuotesCollapse';
import Select from '../../../FormSelect/FormSelect';
import FilterQuote from './components/FilterQuote';
import * as styles from './quotes.module.scss';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import SEO from '../../../layout/seo';
import { getStateNameFromCode } from '../../../../utils/states';
import { faTimes } from '@fortawesome/pro-regular-svg-icons';
import { ClickAwayListener } from '@mui/material';
import useQuotesAirtableData from './components/hooks/useQuotesAirtableData';
import {
  CREATE_QUOTE,
  GET_HOME_RATES,
  GET_RATES,
  GET_RENTER_RATES,
  LIST_QUOTES,
} from '../../../utils/queries';
import { formatToCurrency, returnParsedApiString } from '../../../../utils/validation';
import DarkBgPopup from '../../../popups/DarkBgPopup/DarkBgPopup';
import getNewCoverageLevelQuoteVariables from './components/hooks/getNewCoverageLevelQuoteVariables';
import Button from '../../../form-button';
import { navigate } from 'gatsby';
import isBindableOpen from '../../../../utils/isBindableOpen';
import AutoQuotesPackageTypeSelector from './components/AutoQuotesPackageTypeSelector';
import useHandleGetRatesCompleted from './components/hooks/handleRatesCompleted';
import useHandlePackageInfo from './components/hooks/handlePackageInfo';
import NoQuotesPopup from './components/NoQuotesPopup/NoQuotesPopup';
import FetchingData from '../../../Loading/FetchingData';

const Quotes = ({ updateBreadcrumbs, location }) => {
  const { allPackagesByStateNodes, carrierNodes, ratingRules, lineByStateNodes } =
    useQuotesAirtableData();
  const [quotes, setQuotes] = useState({});
  const [unavailableQuotes, setUnavailableQuotes] = useState({});
  const [getRates] = useMutation(GET_RATES);
  const [getHomeRates] = useMutation(GET_HOME_RATES);
  const [getRenterRates] = useMutation(GET_RENTER_RATES);
  const [listQuotes] = useMutation(LIST_QUOTES);
  const [createQuote] = useMutation(CREATE_QUOTE);
  const [quotesLoading, setQuotesLoading] = useState(true);
  const [filterQuoteOpen, setFilterQuoteOpen] = useState(false);
  const [selectedPackageType, setSelectedPackageType] = useState('');
  const [showPackageInfo, setShowPackageInfo] = useState(false);
  const [packageInfo, setPackageInfo] = useState();
  const [showAssetDetails, setShowAssetDetails] = useState(false);
  const [noSubmittedForm, setNoSubmittedForm] = useState(false);
  const [sortedBy, setSortedBy] = useState('');
  const [quotesType, setQuotesType] = useState('');

  const handleGetRatesCompleted = useHandleGetRatesCompleted(
    carrierNodes,
    ratingRules,
    lineByStateNodes,
    setUnavailableQuotes,
    setQuotes,
    setSelectedPackageType,
    setQuotesLoading,
    unavailableQuotes,
    quotes
  );

  const useGetRates = latestQuote => {
    let quoteType = latestQuote.quote_type;
    setQuotesType(quoteType);
    let variables = { input: { quoteId: latestQuote.id } };
    const onCompleted = rates => {
      if (rates.success) {
        handleGetRatesCompleted(rates, latestQuote);
      } else {
        console.error(rates.errors);
      }
    };
    let getRatesFunctions = {
      auto: { mutation: getRates, completedParam: 'getQuoteRates' },
      home: { mutation: getHomeRates, completedParam: 'getHomeQuoteRates' },
      renter: { mutation: getRenterRates, completedParam: 'getRenterQuoteRates' },
    };
    getRatesFunctions[quoteType].mutation({
      variables,
      onCompleted: data => onCompleted(data[getRatesFunctions[quoteType].completedParam]),
      onError: error => console.error(error),
    });
  };
  useEffect(() => {
    let mounted = true;
    updateBreadcrumbs({ displayName: 'Quotes', link: '/account/quotes' });
    if (location?.state?.quote) {
      let quoteToGetRate = location.state.quote;
      if (typeof quoteToGetRate === 'string') {
        quoteToGetRate = returnParsedApiString(location.state.quote);
      }
      useGetRates(quoteToGetRate);
    } else {
      listQuotes({
        variables: { input: { limit: 5, offset: 0 } },
        onCompleted: ({ listQuote }) => {
          let parsedQuotes = returnParsedApiString(listQuote.quotes).sort(
            (a, b) => a.id - b.id
          );
          if (parsedQuotes.length) {
            let latestQuote = parsedQuotes[parsedQuotes.length - 1];
            if (mounted) {
              useGetRates(latestQuote);
            }
          } else if (mounted) {
            setNoSubmittedForm(true);
            setQuotesLoading(false);
          }
        },
        onError: error => console.error(error),
      });
    }
    return () => {
      mounted = false;
    };
  }, []);

  const handlePackageInfo = useHandlePackageInfo(
    allPackagesByStateNodes,
    quotes,
    setPackageInfo,
    setShowPackageInfo
  );
  const returnReadableName = name => {
    let variableNames = {
      bodilyInjury: 'Bodily Injury',
      collisionDeductible: 'Collision Deductible',
      comprehensiveDeductible: 'Comprehensive Deductible',
      pip: 'PIP (Not Required In All States)',
      propertyDamage: 'Property Damage',
      substituteTransportation: 'Substitute Transportation',
      towing: 'Towing',
      underInsuredMotorist: 'UnderInsured Motorist',
      uninsuredMotorist: 'Uninsured Motorist',
      BI: 'Bodily Injury',
      PD: 'Property Damage',
      UM: 'Uninsured Motorist',
      UIM: 'Uninsured Motorist',
      UMPD: 'Uninsured Motorist Property Damage',
      MP: 'Medical Payments',
      coverage_a: 'Dwelling Coverage',
      coverage_b: 'Other Structures',
      coverage_c: 'Personal Property',
      coverage_d: 'Additional Living Expense',
      coverage_e: 'Personal Liability',
      coverage_f: 'Medical',
      deductible: 'Deductible',
    };
    return variableNames[name] || name;
  };
  const packages = ['Minplus', 'Standard', 'Premium'];
  const sortBy = (a, b) => {
    if (!sortedBy || sortedBy === 'Smart Score') {
      return b.smartScore - a.smartScore;
    } else if (sortedBy === 'Name') {
      if (a.name > b.name) return 1;
      else return -1;
    } else if (sortedBy == 'Price') {
      return a.price - b.price;
    }
    return 1;
  };
  const getLowestPrice = pk => {
    let sortedQuotes = quotes[pk]?.bindable_quotes?.sort((a, b) => a.price - b.price);
    if (sortedQuotes?.length) return `${formatToCurrency(sortedQuotes[0].price)}/mo`;
    else return '';
  };
  const handleCoverageChange = coverageLevel => {
    if (coverageLevel in quotes) {
      return true;
    } else {
      if (!quotesLoading) {
        setQuotesLoading(true);
        let variables = getNewCoverageLevelQuoteVariables(coverageLevel, quotes);
        createQuote({
          variables: { input: variables },
          onCompleted: ({ createQuote }) => {
            let quoteToGetRate = returnParsedApiString(createQuote.quote);
            useGetRates(quoteToGetRate);
          },
        });
      }
      return false;
    }
  };

  const getQuotesLength = coverageType => quotes[coverageType]?.bindable_quotes?.length;
  const getUnavailableQuotesLength = coverageType =>
    unavailableQuotes[coverageType]?.length;
  const handleEditClick = () => {
    if (quotesType) {
      let url = `/quote-${quotesType}`;
      navigate(url);
    }
  };
  if (noSubmittedForm) {
    return <NoQuotesPopup />;
  }

  return (
    <DashboardLayout
      classes={{ layoutInner: styles.dashboardLayout }}
      title="Quotes"
      subTitle={'Need assistance? Call (877) 290-8182'}
      rightSideChildren={
        <Button onClick={handleEditClick} className={styles.lastQuoteBtn}>
          Edit Form
        </Button>
      }
    >
      <SEO title="Rates" />
      <div className={styles.quotes}>
        <div className={styles.quotesInner}>
          <Grid container>
            {!!showPackageInfo && (
              <DarkBgPopup>
                <table className={styles.packageInfoTable}>
                  <thead>
                    <tr className={styles.packageType}>
                      <th className={styles.packageType}>
                        {packageInfo.packageName} (
                        {packageInfo.stateName || packageInfo.carrierName})
                        <button
                          className={styles.closeButton}
                          onClick={() => setShowPackageInfo(false)}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </th>
                    </tr>
                    <tr className={styles.headRow}>
                      <th>Coverage</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(packageInfo).map(
                      (entry, idx) =>
                        entry[0] !== 'packageName' &&
                        entry[0] !== 'carrierName' &&
                        entry[0] !== 'stateName' && (
                          <tr key={idx}>
                            <td>{returnReadableName(entry[0])}</td>
                            <td>
                              {quotesType == 'home'
                                ? formatToCurrency(entry[1])
                                : entry[1] || '-'}
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              </DarkBgPopup>
            )}
            {!!selectedPackageType && (
              <AutoQuotesPackageTypeSelector
                packages={packages}
                styles={styles}
                selectedPackageType={selectedPackageType}
                handleCoverageChange={handleCoverageChange}
                setSelectedPackageType={setSelectedPackageType}
                quotesLoading={quotesLoading}
                getQuotesLength={getQuotesLength}
                handlePackageInfo={handlePackageInfo}
                getLowestPrice={getLowestPrice}
                quotes={quotes}
              />
            )}
            {quotesLoading ? (
              <FetchingData loadingText="We're fetching your insurance quotes!" />
            ) : (
              <>
                <Grid container className={styles.quotesFilter}>
                  <Grid item md={6} sm={12}>
                    <h4>
                      <FontAwesomeIcon
                        icon={quotes.quote_type === 'auto' ? faCar : faHome}
                        className={styles.assetTypeIcon}
                      />
                      {getQuotesLength(selectedPackageType)}{' '}
                      {quotes[selectedPackageType]?.quote_type} quotes for{' '}
                      <a
                        className={styles.insuredAssetName}
                        title={quotes[selectedPackageType]?.quote_type}
                        onClick={() => setShowAssetDetails(true)}
                      >
                        {selectedPackageType
                          ? quotes[selectedPackageType]?.vehicles.map((vh, idx) =>
                              idx == 0
                                ? `${vh.year} ${vh.make} ${vh.model}`
                                : ` - ${vh.year} ${vh.make} ${vh.model}`
                            )
                          : `${quotes[selectedPackageType]?.address1}, ${quotes[selectedPackageType]?.address_city}, ${quotes[selectedPackageType]?.address_state} ${quotes[selectedPackageType]?.address_zip}`}
                      </a>
                      <FontAwesomeIcon
                        className={styles.sortDownIcon}
                        icon={faSortDown}
                      />
                    </h4>
                    {!!showAssetDetails && (
                      <ClickAwayListener onClickAway={() => setShowAssetDetails(false)}>
                        <div className={styles.assetDetails}>
                          <button
                            className={styles.assetDetailsCloseIcon}
                            onClick={() => setShowAssetDetails(false)}
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </button>
                          <table>
                            <tbody>
                              <tr>
                                <td>
                                  {quotes[selectedPackageType]?.quote_type == 'auto'
                                    ? 'Person(s) Insured:'
                                    : 'Home Address'}
                                </td>
                                {quotes[selectedPackageType]?.quote_type == 'auto' ? (
                                  <td>
                                    {quotes[selectedPackageType]?.drivers[0].first_name}{' '}
                                    {quotes[selectedPackageType]?.drivers[0].last_name}
                                  </td>
                                ) : (
                                  <td>
                                    {quotes[selectedPackageType]?.address1},{' '}
                                    {quotes[selectedPackageType]?.address_zip}
                                  </td>
                                )}
                              </tr>
                              {quotes[selectedPackageType]?.quote_type == 'auto' ? (
                                <tr>
                                  <td>Incidents:</td>
                                  <td>None</td>
                                </tr>
                              ) : (
                                <tr>
                                  <td>Home type:</td>
                                  <td>{quotes[selectedPackageType]?.home_or_condo}</td>
                                </tr>
                              )}
                              <tr>
                                <td>State:</td>
                                <td>
                                  {getStateNameFromCode(
                                    quotes[selectedPackageType]?.quote_type == 'auto'
                                      ? quotes[selectedPackageType]
                                          ?.garage_address_state ||
                                          quotes[selectedPackageType]?.address_state
                                      : quotes[selectedPackageType]?.address_state
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </ClickAwayListener>
                    )}
                  </Grid>
                  <Grid item md={6} sm={12} className={styles.quotesFilterContainer}>
                    <div className={styles.quotesFilterSelect}>
                      <Select
                        name="score"
                        placeholder="Sort By"
                        value={sortedBy}
                        onChange={e => setSortedBy(e.target.value)}
                        options={['Smart Score', 'Name', 'Price'].map(item => {
                          return {
                            value: item,
                            text: item,
                          };
                        })}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid item md={12} sm={12} xs={12} className={styles.quotesAutoList}>
                  <List>
                    {getQuotesLength(selectedPackageType) ? (
                      quotes[selectedPackageType]?.bindable_quotes
                        .sort(sortBy)
                        .map((item, key) => {
                          return (
                            <QuotesCollapse
                              key={key}
                              item={item}
                              selectedPackageType={selectedPackageType}
                              setPackageInfo={setPackageInfo}
                              setShowPackageInfo={setShowPackageInfo}
                            />
                          );
                        })
                    ) : (
                      <p>
                        Looks like we are not able to find you rates with the answers you
                        gave on the rate form, please call us at{' '}
                        <a title="Call us" href="tel:+18772908182">
                          (877) 290-8182
                        </a>{' '}
                        and one of our Honest Agents will help you get the best rates for
                        your needs
                      </p>
                    )}
                  </List>
                </Grid>
                <section className={styles.blueBoxContainer}>
                  <div className={styles.blueBoxTextContainer}>
                    <h2 className={styles.blueBoxTitle}>
                      Check Out Our Unpublished Rates by Talking to an Agent Right Now
                    </h2>
                    <p className={styles.blueBoxText}>
                      Additional quotes and discounts may be available when you speak to
                      one of our licensed agents.
                    </p>
                    <Button onClick={() => window.open('tel:900300400')}>
                      Call now (877) 290-8182
                    </Button>
                    <p className={styles.openHoursText}>
                      {isBindableOpen()
                        ? 'An agent is available'
                        : 'The agency is currently closed. Hours are Monday - Friday: 9AM - 10PM EST   |  Saturday: 10AM – 6PM EST   |  Sunday: Closed'}
                    </p>
                  </div>
                </section>
                <Grid item md={12} sm={12} xs={12} className={styles.quotesAutoList}>
                  <h2 className={styles.otherInsurersTitle}>
                    Other Insurers Operating in Your State
                  </h2>
                  <p className={styles.otherInsurersText}>
                    We are unable to provide quotes for these companies:
                  </p>
                  <List>
                    {getUnavailableQuotesLength(selectedPackageType) &&
                      unavailableQuotes[selectedPackageType]
                        ?.sort(sortBy)
                        .map((item, key) => {
                          return (
                            <QuotesCollapse
                              isUnavailable={true}
                              key={key}
                              item={item}
                              selectedPackageType={selectedPackageType}
                              setPackageInfo={setPackageInfo}
                              setShowPackageInfo={setShowPackageInfo}
                            />
                          );
                        })}
                  </List>
                </Grid>
              </>
            )}
          </Grid>
        </div>
      </div>
      <FilterQuote open={filterQuoteOpen} setOpen={setFilterQuoteOpen} />
    </DashboardLayout>
  );
};
Quotes.propTypes = {
  updateBreadcrumbs: PropTypes.func.isRequired,
  location: PropTypes.object,
};
export default Quotes;
