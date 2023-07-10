import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

import Paper from '../../../utils/paper';
import rank0 from '../../../../images/carrierTemplate/rank1.png';
import rank1 from '../../../../images/carrierTemplate/rank2.png';
import rank2 from '../../../../images/carrierTemplate/rank3.png';
import rank3 from '../../../../images/carrierTemplate/rank4.png';
import rank4 from '../../../../images/carrierTemplate/rank5.png';
import thumbup from '../../../../images/like-circle.svg';

import useWindowSize from '../../../utils/UseWindowSize';
import CustomerReviewDialog from '../../../dialogs/CustomerReviewDialog';
import AllReviews from './components/AllReviews';
import Button from '../../../form-button';
import { useRedux } from '../../../redux/reduxContext';

import * as styles from './carrier-customer-reviews.module.scss';
import { gql, useQuery } from '@apollo/client';

const CARRIER_REVIEWS = gql(`
      query reviews($carrierId: ID) {
         reviews(carrierId: $carrierId) {
            nodes {
              carrierId
              claimSatisfaction
              customerService
              id
              overall
              stars
              lineOfBusiness
              priceValue
              recommend
              review
              createdAt
              userState
              cachedWeightedAverage
              user {
                firstName
                lastName
              }
              votesFor {
                voter {
                  id
                }
                voteFlag
              }
            }
          }
      }
    `);

const ReviewsSummary = ({
  ranks,
  customersThatRecommend,
  carrierId,
  carrierName,
  handleReviewModal,
  customerReviewDialogOpen,
}) => {
  const [graphWidth, setGraphWidth] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  const graphRef = useRef(null);
  const ulRef = useRef(null);
  const size = useWindowSize();

  useEffect(() => {
    if (graphRef.current) {
      if (size.width > 768) {
        if (graphRef.current.clientWidth > ulRef.current.clientWidth - 111) {
          setGraphWidth(ulRef.current.clientWidth - 111);
        } else {
          setGraphWidth(graphRef.current.clientWidth);
        }
      } else {
        if (graphRef.current.clientWidth < ulRef.current.clientWidth - 88) {
          setGraphWidth(graphRef.current.clientWidth);
        } else {
          setGraphWidth(ulRef.current.clientWidth - 88);
        }
      }
      let rawTotal = [];
      let rawTotalPoint = [];
      for (let rank of ranks) {
        rawTotal.push(parseFloat(rank.q));
        rawTotalPoint.push(parseFloat(rank.value) * parseFloat(rank.q));
      }
      let newTotal = rawTotal.reduce((prev, curr) => prev + curr);
      let newTotalPoints = rawTotalPoint.reduce((prev, curr) => prev + curr);
      setTotal(parseFloat(newTotal));
      setTotalPoints(parseFloat(newTotalPoints));
    }
  }, [graphRef, ulRef, size]);

  return (
    <>
      <Paper className={styles.reviewSummary}>
        <div className={styles.reviewSummaryStats}>
          <div className={styles.leftScoreColumn}>
            <Paper className={styles.scorePaper}>
              <>
                <h4 className={styles.avgReviewScore}>
                  {parseFloat(Math.round((totalPoints / total) * 10) / 10).toString()}
                </h4>
                <div className={styles.greenBase}>Out of 5</div>
              </>
            </Paper>
            <p className={styles.totalReviewsText}>{total} Reviews</p>
          </div>
          <ul className={styles.rightScoreColumn} ref={ulRef}>
            {ranks.map((rank, idx) => (
              <div key={idx} className={styles.scoreVoteRow}>
                <img
                  loading="lazy"
                  src={rank.icon}
                  alt={`Emoticon for rank ${idx}`}
                  className={styles.emoticon}
                />
                <div
                  ref={graphRef}
                  className={styles.graphArea}
                  style={{
                    paddingRight: `${
                      (1 - parseFloat(rank.q) / parseFloat(total)) * graphWidth
                    }px`,
                  }}
                >
                  <span className={styles.coloredGraph} />
                </div>
                <p className={styles.totalReviewsText}>{`(${rank.q})`}</p>
              </div>
            ))}
          </ul>
        </div>
        <div className={styles.reviewSummaryAction}>
          <div className={styles.reviewSummaryActionInner}>
            <div className={styles.ellipse}>
              <img loading="lazy" src={thumbup} alt="Thumb Up" className={styles.thumb} />
            </div>
            <div className={styles.recommendContainer}>
              <h3 className={styles.recommendPercentage}>
                {Math.round(
                  customersThatRecommend.reccomend / customersThatRecommend.reviews
                ) * 100}
                %
              </h3>
              <p className={styles.recommendText}>
                of customers would recommend this company to a friend
              </p>
            </div>
          </div>
          <Button
            className={styles.reviewSummaryActionButton}
            onClick={() => handleReviewModal(true)}
          >
            Leave a review
          </Button>
        </div>
        <CustomerReviewDialog
          open={customerReviewDialogOpen}
          setOpen={handleReviewModal}
          carrierId={carrierId}
          carrierName={carrierName}
        />
      </Paper>
    </>
  );
};

const CustomerReviews = ({
  sectionRef,
  carrierId,
  carrierName,
  activeLineOfBusiness,
}) => {
  const [reviews, setReviews] = useState([]);
  const [customerReviewDialogOpen, setCustomerReviewDialogOpen] = useState(false);
  useQuery(CARRIER_REVIEWS, {
    variables: { carrierId: carrierId },
    onCompleted: data => {
      setReviews(data?.reviews?.nodes);
    },
    onError: error => {
      console.error(error);
    },
  });

  const carrierFilteredReviews = reviews.filter(review => {
    let rawLine = review.lineOfBusiness;
    let line = rawLine.charAt(0).toUpperCase() + rawLine.slice(1);
    if (line !== activeLineOfBusiness) {
      return false;
    } else {
      return true;
    }
  });

  const ranks = [
    {
      value: 5,
      icon: rank0,
      q: 0,
    },
    {
      value: 4,
      icon: rank1,
      q: 0,
    },
    {
      value: 3,
      icon: rank2,
      q: 0,
    },
    {
      value: 2,
      icon: rank3,
      q: 0,
    },
    {
      value: 1,
      icon: rank4,
      q: 0,
    },
  ];
  const customersThatRecommend = {
    reviews: 0,
    reccomend: 0,
  };
  const structuredReviews = carrierFilteredReviews.map(review => {
    let stars = review.stars;
    switch (stars) {
      case 5:
        ranks[0].q += 1;
        break;
      case 4:
        ranks[1].q += 1;
        break;
      case 3:
        ranks[2].q += 1;
        break;
      case 2:
        ranks[3].q += 1;
        break;
      case 1:
        ranks[4].q += 1;
        break;
      default:
        break;
    }
    customersThatRecommend.reviews += 1;
    const recommend = review.recommend;
    recommend ? (customersThatRecommend.reccomend += 1) : '';

    return {
      id: review.id,
      lineOfBusiness: review.lineOfBusiness,
      overall: review.overall,
      priceValue: review.priceValue === 0 ? '-' : review.priceValue,
      claimSatisfaction: review.claimSatisfaction || 'n/a',
      customerService: review.customerService || '-',
      recommend: recommend,
      review: review.review,
      timestamp: review.createdAt,
      firstName: review.user.firstName,
      lastName: review.user.lastName,
      votesFor: review.votesFor,
      weightedAverage: review.cachedWeightedAverage,
    };
  });
  const reduxDispatcher = useRedux()[1];
  const handleReviewModal = isActive => {
    const token = Cookies.get('token');
    if (!token) {
      reduxDispatcher({
        type: 'LOGIN_POPUP_ACTION',
        payload: {
          open: true,
        },
      });
    } else {
      setCustomerReviewDialogOpen(isActive);
    }
  };
  if (structuredReviews.length > 0) {
    return (
      <>
        <h2 className={styles.carrierTemplateTitle} ref={sectionRef} id={'reviews'}>
          Customer Reviews
        </h2>
        <ReviewsSummary
          ranks={ranks}
          customersThatRecommend={customersThatRecommend}
          carrierId={carrierId}
          carrierName={carrierName}
          handleReviewModal={handleReviewModal}
          customerReviewDialogOpen={customerReviewDialogOpen}
        />
        <AllReviews structuredReviews={structuredReviews} />
      </>
    );
  } else {
    return (
      <>
        <h2 className={styles.carrierTemplateTitle} ref={sectionRef} id={'reviews'}>
          Customer Reviews
        </h2>
        <Paper>
          <h3 className={styles.carrierTemplateSectionTitle}>
            {carrierName} doesn&apos;t have reviews yet.
          </h3>
          <CustomerReviewDialog
            open={customerReviewDialogOpen}
            setOpen={handleReviewModal}
            carrierId={carrierId}
            carrierName={carrierName}
          />
          <Button
            className={styles.reviewSummaryActionButton}
            onClick={() => handleReviewModal(true)}
          >
            Be the first to leave a review
          </Button>
        </Paper>
      </>
    );
  }
};

CustomerReviews.propTypes = {
  sectionRef: PropTypes.object.isRequired,
  carrierId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  carrierName: PropTypes.string,
  activeLineOfBusiness: PropTypes.string,
};
AllReviews.propTypes = {
  structuredReviews: PropTypes.array.isRequired,
};
ReviewsSummary.propTypes = {
  ranks: PropTypes.array.isRequired,
  customersThatRecommend: PropTypes.object.isRequired,
  carrierId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  carrierName: PropTypes.string,
  handleReviewModal: PropTypes.func.isRequired,
  customerReviewDialogOpen: PropTypes.bool,
};
export default CustomerReviews;
