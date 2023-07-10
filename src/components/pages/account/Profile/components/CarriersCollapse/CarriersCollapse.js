import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCar } from '@fortawesome/fontawesome-pro-solid';
import * as styles from './carriers-collapse.module.scss';
import { Link } from 'gatsby';
import { useQuery } from '@apollo/client';
import { GET_REVIEW } from '../../../../../utils/queries';
import rank1 from '../../../../../../images/carrierTemplate/rank1.png';
import rank2 from '../../../../../../images/carrierTemplate/rank2.png';
import rank3 from '../../../../../../images/carrierTemplate/rank3.png';
import rank4 from '../../../../../../images/carrierTemplate/rank4.png';
import rank5 from '../../../../../../images/carrierTemplate/rank5.png';

const CarriersCollapse = ({ policy }) => {
  const [carrierReview, setCarrierReview] = useState({});
  const [open, setOpen] = useState(false);
  useQuery(GET_REVIEW, {
    onCompleted: ({ reviews }) => {
      reviews.nodes.forEach(review => {
        if (review.carrier.name !== policy.carrier.name) {
          setCarrierReview(review);
        }
      });
    },
    onError: err => {
      console.error(err);
    },
  });
  const handleClick = () => {
    setOpen(!open);
  };
  const insuranceType = policy.insuranceType;
  const getAssetNamesInsured = () => {
    let assets = policy.insuranceOptions;
    let names = [];
    switch (insuranceType) {
      case 'Vehicle':
        names = assets.map(asset => `${asset.year} ${asset.make} - ${asset.model}`);
        break;
      case 'Property':
        names = assets.map(asset => `${asset.address} ${asset.state} - ${asset.zipCode}`);
        break;
      default:
        break;
    }
    return names;
  };
  const getEmojiForRank = rank => {
    let img;
    switch (rank) {
      case 5:
        img = rank1;
        break;
      case 4:
        img = rank2;
        break;
      case 3:
        img = rank3;
        break;
      case 2:
        img = rank4;
        break;
      case 1:
        img = rank5;
        break;
      default:
        break;
    }
    return img;
  };
  return (
    <div className={styles.carrierCollapse}>
      <ListItem
        classes={{ root: styles.carrierCollapseItem }}
        button
        onClick={handleClick}
      >
        <div className={styles.carrierCollapseItemName}>
          <FontAwesomeIcon icon={insuranceType === 'Vehicle' ? faCar : faHome} />
          <span>
            {policy.carrier.name}
            {getAssetNamesInsured().map((name, idx) => (
              <div key={idx}>{name}</div>
            ))}
          </span>
          {!!Object.keys(carrierReview).length > 0 && (
            <div className={styles.starsContainer}>
              <img
                className={styles.emojiRankImg}
                src={getEmojiForRank(carrierReview.stars)}
                alt="Emoji for stars"
              />
              <p className={styles.reviewText}>{carrierReview.stars}</p>
            </div>
          )}
        </div>
        <div className={styles.carrierCollapseItemRightSide}>
          <div className={styles.quotesCollapseItemIcon}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </div>
        </div>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem classes={{ gutters: styles.carrierCollapseItemPadding }}>
            <div className={styles.collapseBodyList}>
              <Link to={'/account/wallet'} state={{ openPolicy: policy }}>
                See Insurance Info
              </Link>
              <Link to={insuranceType == 'Vehicle' ? '/quote-auto' : '/quote-home'}>
                Get New Quote
              </Link>
              {!!Object.keys(carrierReview).length === 0 && (
                <Link
                  to={'/account/reviews'}
                  state={{ carrierToReview: policy.carrier.name }}
                >
                  Review {policy.carrier.name}
                </Link>
              )}
            </div>
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
};
CarriersCollapse.propTypes = {
  policy: PropTypes.object.isRequired,
};
export default CarriersCollapse;
