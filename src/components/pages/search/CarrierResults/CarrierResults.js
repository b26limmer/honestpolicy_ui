import React, { useContext } from 'react';
import { navigate, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { CompareContext } from '../../../state/CompareContextProvider';
import { Grid, Hidden } from '@mui/material';
import Button from '../../../form-button';
import SmartScore from '../../../SmartScore';

import * as styles from './carrier-results.module.scss';
import { GatsbyImage } from 'gatsby-plugin-image';

const CarrierCardContent = ({ children }) => {
  return (
    <Grid container classes={{ root: styles.carrierCardContainer }}>
      <Hidden mdUp>
        <div className={styles.carrierCard}>{children}</div>
      </Hidden>
      <Hidden smDown>
        <div className={styles.carrierCard} classes={{ root: styles.carrierCard }}>
          {children}
        </div>
      </Hidden>
    </Grid>
  );
};

export const CarrierCard = ({
  isComparePage,
  currentCarrier,
  carrier,
  activeLineOfBusiness,
}) => {
  const { carriersToCompare, setCarriersToCompare, addNewCarrier, removeCarrier } =
    useContext(CompareContext);
  const image =
    carrier?.Company_Logos[0]?.data?.Attachments?.localFiles[0].childImageSharp
      .gatsbyImageData;
  const getRatings = () => {
    let ratings = undefined;
    if (carrier.Ratings) {
      carrier.Ratings.forEach(element => {
        if (element.data.Line === activeLineOfBusiness) {
          ratings = element.data;
        }
      });
    }
    return ratings;
  };
  const ratings = getRatings();
  const { name } = carrier;
  if (image && ratings) {
    return (
      <CarrierCardContent slug={carrier.slug} name={name}>
        <div className={styles.carrierResults}>
          <div className={styles.carrierResultsLeftSide}>
            <div className={styles.carrierResultsImage}>
              <GatsbyImage
                alt={`${carrier.name} Logo`}
                image={image}
                objectFit="contain"
                className={styles.carrierLogo}
                imgClassName={styles.carrierLogoImg}
              />
              <div className={styles.carrierResultsLogoText}>{name.toUpperCase()}</div>
            </div>
            <div className={styles.carrierResultsSmartScore}>
              <SmartScore
                rating={ratings.Smart_Score}
                type="Smart Score"
                isActive={true}
              />
              <SmartScore rating={ratings.Customer_Service} type="Service" />
              <SmartScore rating={ratings.Value_for_Price} type="Value" />
              <SmartScore rating={ratings.Claims_Process} type="Claims" />
            </div>
          </div>
          <div className={styles.carrierResultsActions}>
            <div className={styles.carrierResultsActionsTitle}>
              <h3 className={styles.subtitle}>{name.toUpperCase()}</h3>
            </div>
            <div className={styles.carrierResultsButtons}>
              <Button
                type={!carriersToCompare.includes(name) ? 'primary' : 'error'}
                className={styles.learnMoreButton}
                isOutline
                onClick={async () => {
                  if (!isComparePage) {
                    if (!carriersToCompare.includes(name)) {
                      addNewCarrier(name);
                    } else {
                      removeCarrier(name);
                    }
                  } else {
                    setCarriersToCompare([currentCarrier, name]);
                    navigate('/compare');
                  }
                }}
              >
                {!carriersToCompare.includes(name)
                  ? isComparePage
                    ? 'Compare with this carrier'
                    : 'Add to Compare'
                  : 'Remove'}
              </Button>
              <Button
                className={styles.learnMoreButton}
                Component={Link}
                to={`/insurance/${carrier.slug}/${
                  activeLineOfBusiness === 'Auto'
                    ? 'car'
                    : activeLineOfBusiness?.toLowerCase()
                }`}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </CarrierCardContent>
    );
  }

  return null;
};

const CarrierResults = ({ searchResults, activeLineOfBusiness }) => {
  return (
    <div className={styles.columnContainer}>
      {searchResults.map((edge, idx) => {
        return (
          <CarrierCard
            carrier={edge.node.data}
            key={idx}
            isComparable
            activeLineOfBusiness={activeLineOfBusiness}
          />
        );
      })}
    </div>
  );
};

CarrierCardContent.propTypes = {
  children: PropTypes.node,
  slug: PropTypes.string,
  name: PropTypes.string,
  isComparable: PropTypes.bool,
};

CarrierResults.propTypes = {
  carriersData: PropTypes.array.isRequired,
  searchResults: PropTypes.any,
  industryAvg: PropTypes.array,
  activeLineOfBusiness: PropTypes.string.isRequired,
};
CarrierCard.propTypes = {
  isComparePage: PropTypes.bool,
  currentCarrier: PropTypes.string,
  carrier: PropTypes.object,
  isComparable: PropTypes.bool,
  activeLineOfBusiness: PropTypes.string,
};

export default CarrierResults;
