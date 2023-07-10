import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import * as styles from './quotes-collapse.module.scss';
import isBindableOpen from '../../../../../../utils/isBindableOpen';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Button from '../../../../../form-button/FormButton';
import Loading from '../../../../../Loading/Loading';
import { AlertsContext } from '../../../../../state/AlertsContext';
import { useMutation } from '@apollo/client';
import {
  SELECT_HOME_QUOTE,
  SELECT_QUOTE,
  SELECT_RENTER_QUOTE,
} from '../../../../../utils/queries';

const CoverageCollapsedSection = ({
  item,
  setPackageInfo,
  setShowPackageInfo,
  selectedPackageType,
  isUnavailable,
  setShowSelectQuotePopup,
  setShowLeavingHonestPolicyPopup,
}) => {
  const { dispatchAlert } = useContext(AlertsContext);
  const [selectQuoteSent, setSelectQuoteSent] = useState(false);

  const [selectQuote, { loading: selectQuoteLoading }] = useMutation(SELECT_QUOTE);
  const [selectHomeQuote, { loading: selectHomeQuoteLoading }] =
    useMutation(SELECT_HOME_QUOTE);
  const [selectRenterQuote, { loading: selectRenterQuoteLoading }] =
    useMutation(SELECT_RENTER_QUOTE);
  const loading =
    selectQuoteLoading || selectHomeQuoteLoading || selectRenterQuoteLoading;

  const handleShowCoverageDetails = () => {
    let coverages = {};
    item.coverages.forEach(coverage => {
      let name = '@attributes' in coverage ? coverage['@attributes'].name : coverage.name;
      let value = coverage.value;
      coverages[name] = value;
    });
    setPackageInfo({
      packageName: selectedPackageType,
      carrierName: item.name,
      ...coverages,
    });
    setShowPackageInfo(true);
  };
  const handleSelectQuoteError = error => {
    console.error(error);
    dispatchAlert(
      `We couldn't complete your request. Please call us at (877) 290-8182 to get help`,
      'error',
      6
    );
  };
  const handleSelectQuoteSuccess = selectQuote => {
    if (selectQuote.success) {
      setSelectQuoteSent(true);
      setShowSelectQuotePopup(true);
    } else {
      handleSelectQuoteError(selectQuote);
    }
  };
  let { userHash, quoteId, insuranceType } = item;
  const handleSelectQuote = () => {
    let variables = {
      input: {
        userHash,
        quoteId,
      },
    };
    let selectFunctions = {
      auto: { mutation: selectQuote, completedParam: 'selectQuote' },
      home: { mutation: selectHomeQuote, completedParam: 'selectHomeQuote' },
      renter: { mutation: selectRenterQuote, completedParam: 'selectRenterQuote' },
    };
    selectFunctions[insuranceType].mutation({
      variables,
      onCompleted: data =>
        handleSelectQuoteSuccess(data[selectFunctions[insuranceType].completedParam]),
      onError: error => handleSelectQuoteError(error),
    });
  };
  let lineOfBusinessUrl =
    insuranceType == 'auto' ? 'car' : insuranceType == 'renter' ? 'home' : insuranceType;

  const handleQtbClick = () => {
    setShowLeavingHonestPolicyPopup(true);
    setTimeout(() => {
      setShowLeavingHonestPolicyPopup(false);
      window.open(item.qtb_url, { target: '_blank' });
    }, 3000);
  };
  return (
    <Grid
      container
      className={styles.quotesCollapseBottom}
      justifyContent={'space-between'}
    >
      <Grid item md={6} xs={12}>
        <div className={styles.aboutCarrierContainer}>
          <p>
            {item.aboutCarrier?.length > 300
              ? item.aboutCarrier.slice(0, 300) + '...'
              : item.aboutCarrier}
          </p>
          {!!item.logo && (
            <a
              href={`/insurance/${item.slug}/${lineOfBusinessUrl}`}
              target="_blank"
              rel="noreferrer noopener"
              title="View Profile"
            >
              View Profile <ArrowRightAltIcon />
            </a>
          )}
        </div>
      </Grid>
      <Grid item md={4} xs={12}>
        <div className={styles.getQuoteButton}>
          {isUnavailable ? (
            <Button
              title="View Profile"
              onClick={() =>
                window.open(`/insurance/${item.slug}/${lineOfBusinessUrl}`, {
                  target: '_blank',
                })
              }
            >
              Visit {item.name}
            </Button>
          ) : (
            <>
              {!!item.qtb_url && (
                <Button onClick={handleQtbClick}>Finish Process Online</Button>
              )}
              {loading ? (
                <div className={styles.loadingContainer}>
                  <Loading size={100} />
                </div>
              ) : (
                !selectQuoteSent && (
                  <Button
                    className={item.qtb_url ? styles.marginTopButton : ''}
                    onClick={handleSelectQuote}
                  >
                    Have an Honest Agent call me
                  </Button>
                )
              )}
            </>
          )}
          {!isUnavailable && (
            <Button
              type={'Outline'}
              className={styles.marginTopButton}
              onClick={handleShowCoverageDetails}
            >
              Show Coverage Info
            </Button>
          )}
          <span>
            Or call{' '}
            <a title="Call us" href="tel:+18772908182">
              (877) 290-8182
            </a>
            {isBindableOpen() ? ', an agent is available' : ', agents are unavailable'}
          </span>
        </div>
      </Grid>
    </Grid>
  );
};

CoverageCollapsedSection.propTypes = {
  item: PropTypes.object.isRequired,
  setPackageInfo: PropTypes.func.isRequired,
  setShowPackageInfo: PropTypes.func.isRequired,
  selectedPackageType: PropTypes.string,
  isUnavailable: PropTypes.bool.isRequired,
  setShowSelectQuotePopup: PropTypes.func.isRequired,
  setShowLeavingHonestPolicyPopup: PropTypes.func.isRequired,
};

export default CoverageCollapsedSection;
