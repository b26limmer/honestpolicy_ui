import React, { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Grid } from '@mui/material';
import shield from '../../../../../../images/carrierTemplate/shield.png';
import * as styles from './quotes-collapse.module.scss';
import PropTypes from 'prop-types';
import { formatToCurrency } from '../../../../../../utils/validation';
import SelectedQuotePopup from '../SelectedQuotePopup/SelectedQuotePopup';
import classNames from 'classnames';
import CoverageCollapsedSection from './CoverageCollapsedSection';
import LeavingHonestPolicyPopup from '../LeavingHonestPolicyPopup';

const QuotesCollapse = ({
  item,
  selectedPackageType,
  setPackageInfo,
  setShowPackageInfo,
  isUnavailable,
}) => {
  const [open, setOpen] = useState(false);

  const [showSelectQuotePopup, setShowSelectQuotePopup] = useState(false);
  const [showLeavingHonestPolicyPopup, setShowLeavingHonestPolicyPopup] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div
      className={classNames(
        styles.quotesCollapse,
        isUnavailable ? styles.unavailableCarrierCard : ''
      )}
    >
      {!!showSelectQuotePopup && (
        <SelectedQuotePopup closeFunc={() => setShowSelectQuotePopup(false)} />
      )}
      {!!showLeavingHonestPolicyPopup && (
        <LeavingHonestPolicyPopup carrierName={item.name} />
      )}
      <ListItem
        classes={{
          root: styles.quotesCollapseItem,
        }}
        onClick={handleClick}
      >
        <Grid container justifyContent="space-between">
          <Grid item xs={12} sm={6}>
            <div className={styles.quotesCollapseItemName}>
              <div className={styles.carrierLogoContainer}>
                {item.logo ? (
                  <img className={styles.carrierLogo} src={item.logo} />
                ) : (
                  <h4 className={styles.notFoundCarrierName}>{item.name}</h4>
                )}
              </div>
              <label>
                {item.name}
                <span>{!isUnavailable ? selectedPackageType : 'No quote'}</span>
              </label>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} className={styles.quotesCollapseItemRightSide}>
            <div className={styles.quotesCollapseItemScore}>
              <img loading="lazy" src={shield} alt={'Emoticon for score'} />
              <span>{item.smartScore}</span>
            </div>
            <div className={styles.quotesCollapseItemPrice}>
              {isUnavailable ? 'Learn More' : `${formatToCurrency(item.price)}/mo`}
            </div>
            <div className={styles?.quotesCollapseItemIcon}>
              {open ? <ExpandLess /> : <ExpandMore />}
            </div>
          </Grid>
        </Grid>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit className={styles.bottom}>
        <CoverageCollapsedSection
          item={item}
          setPackageInfo={setPackageInfo}
          setShowPackageInfo={setShowPackageInfo}
          selectedPackageType={selectedPackageType}
          isUnavailable={isUnavailable}
          setShowSelectQuotePopup={setShowSelectQuotePopup}
          setShowLeavingHonestPolicyPopup={setShowLeavingHonestPolicyPopup}
        />
        <Grid className={styles.scoresSection} container justifyContent={'space-between'}>
          {item.indicators.map((indicator, idx) => (
            <Grid item md={6} xs={12} className={styles.scoreContainer} key={idx}>
              <h4>{indicator.title}</h4>
              <p
                className={
                  indicator.title === 'Official Complaints' ? styles.complaintsScore : ''
                }
              >
                {indicator.data}
              </p>
            </Grid>
          ))}
        </Grid>
      </Collapse>
    </div>
  );
};
QuotesCollapse.defaultProps = {
  isUnavailable: false,
};
QuotesCollapse.propTypes = {
  item: PropTypes.object.isRequired,
  selectedPackageType: PropTypes.string,
  setPackageInfo: PropTypes.func.isRequired,
  setShowPackageInfo: PropTypes.func.isRequired,
  isUnavailable: PropTypes.bool,
};
export default QuotesCollapse;
