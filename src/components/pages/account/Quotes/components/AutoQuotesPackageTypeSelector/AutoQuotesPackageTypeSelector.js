import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../../../../Loading';
import classNames from 'classnames';
import { Grid } from '@mui/material';

const AutoQuotesPackageTypeSelector = ({
  packages,
  styles,
  selectedPackageType,
  handleCoverageChange,
  setSelectedPackageType,
  quotesLoading,
  getQuotesLength,
  handlePackageInfo,
  getLowestPrice,
  quotes,
}) => {
  return (
    <Grid item sm={12} className={styles.quotesHeaderContainer}>
      <Grid className={styles.quoteId} lg={3} xs={12} item>
        <h3>Coverage Level:</h3>
      </Grid>
      <Grid xs={12} lg={9} item className={styles.packagesOptionContainer}>
        {packages.map((pk, idx) => (
          <Grid className={styles.packageOptionContainer} item xs={4} key={idx}>
            <button
              className={classNames(
                styles.packageOption,
                selectedPackageType === pk ? styles.selectedPackageOption : ''
              )}
              onClick={() => handleCoverageChange(pk) && setSelectedPackageType(pk)}
            >
              <h3 className={styles.packageTitle}>
                {pk}{' '}
                <a
                  title={`Show ${pk} coverages`}
                  className={styles.tooltipButton}
                  onClick={e => {
                    e.stopPropagation();
                    handleCoverageChange(pk) && handlePackageInfo(pk);
                  }}
                >
                  i
                </a>
              </h3>
              {pk in quotes ? (
                getQuotesLength(pk) ? (
                  <p>
                    from <strong>{getLowestPrice(pk)}</strong>
                  </p>
                ) : (
                  <p>0 quotes</p>
                )
              ) : quotesLoading ? (
                <div className={styles.shieldLoadingContainer}>
                  <Loading size={25} />
                </div>
              ) : (
                <p>Check this coverage level</p>
              )}
              {selectedPackageType === pk && (
                <span className={styles.selectedIndicator} />
              )}
            </button>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

AutoQuotesPackageTypeSelector.propTypes = {
  packages: PropTypes.array.isRequired,
  styles: PropTypes.object.isRequired,
  selectedPackageType: PropTypes.string.isRequired,
  handleCoverageChange: PropTypes.func.isRequired,
  setSelectedPackageType: PropTypes.func.isRequired,
  quotesLoading: PropTypes.bool.isRequired,
  getQuotesLength: PropTypes.func.isRequired,
  handlePackageInfo: PropTypes.func.isRequired,
  getLowestPrice: PropTypes.func.isRequired,
  quotes: PropTypes.object.isRequired,
};

export default AutoQuotesPackageTypeSelector;
