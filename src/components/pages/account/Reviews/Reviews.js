import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import DashboardLayout from '../../../layout/DashboardLayout';
import AllReviews from './components/AllReviews';
import AddReviewDialog from './components/AddReview';

import * as styles from './reviews.module.scss';
import SEO from '../../../layout/seo';
import { POLICIES, GET_REVIEW } from '../../../utils/queries';

const Reviews = ({ updateBreadcrumbs, location }) => {
  const [reviews, setReviews] = useState([]);
  const [homePolicies, setHomePolicies] = useState([]);
  const [autoPolicies, setAutoPolicies] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [carrierName, setCarrierName] = useState('');
  const [carrierId, setCarrierId] = useState(0);
  const [reviewData, setReviewData] = useState(null);
  const policyTypes = ['auto', 'home'];
  policyTypes.forEach(policyType => {
    useQuery(POLICIES, {
      variables: { policyType: policyType },
      onCompleted: data => {
        if (policyType == 'auto') {
          setAutoPolicies(data?.usersPolicies?.nodes || []);
        } else {
          setHomePolicies(data?.usersPolicies?.nodes || []);
        }
      },
      onError: err => {
        console.error(err);
      },
    });
  });

  const onGetReviews = data => {
    const reviewsData = data.reviews.nodes || [];
    setReviews(reviewsData);
  };

  useQuery(GET_REVIEW, {
    onCompleted: data => {
      onGetReviews(data);
    },
    onError: err => {
      console.error(err);
    },
  });

  // const confirmDelete = async e => {
  //   try {
  //     await deleteReview({
  //       variables: {
  //         input: {
  //           id: parseInt(data?.id),
  //         },
  //       },
  //     });
  //   } catch (err) {
  //     setError('Something unexpected happend');
  //   }
  // };

  const handleReviewDeleted = review => {
    let allReviews = reviews.filter(r => r.id != review.id);
    setReviews(allReviews);
  };

  const structuredReviews = reviews.map(review => {
    return {
      id: review.id,
      lineOfBusiness: review.lineOfBusiness,
      overall: review.overall,
      priceValue: review.priceValue === 0 ? '-' : review.priceValue,
      claimSatisfaction: review.claimSatisfaction || 'n/a',
      customerService: review.customerService || '-',
      recommend: review.recommend,
      review: review.review,
      timestamp: review.createdAt,
      firstName: review?.user?.firstName,
      lastName: review?.user?.lastName,
      carrierId: review.carrierId,
      userState: review.userState,
      carrierName: review.carrier?.name,
      weightedAverage: review.cachedWeightedAverage,
      stars: review?.stars,
    };
  });

  const reviewedCarrierIds = reviews.map(review => review.carrierId);

  const notYetReviewedPolicies = [...homePolicies, ...autoPolicies].filter(
    policy => !reviewedCarrierIds.includes(policy.carrier.id)
  );

  const structuredPolices = notYetReviewedPolicies.map(policy => {
    return {
      id: null,
      carrierId: policy.carrier?.id,
      carrierName: policy.carrier?.name,
    };
  });

  const handleReviewModal = (carrierId, carrierName, reviewData) => {
    setModalOpen(true);
    setCarrierId(carrierId);
    setCarrierName(carrierName);
    setReviewData(reviewData);
  };

  const handleUpdateData = ({ review }) => {
    let isEdited = false;
    const newReviews = reviews.map(item => {
      if (review.id === item.id) {
        isEdited = true;
        return review;
      }
      return item;
    });

    isEdited ? setReviews(newReviews) : setReviews([...reviews, review]);
  };
  useEffect(() => {
    updateBreadcrumbs({ displayName: 'Reviews', link: '/account/reviews' });
    if (location?.state?.carrierToReview) {
      handleReviewModal(undefined, location.state.carrierToReview.carrierName);
    }
  }, []);

  return (
    <DashboardLayout
      title={'Reviews'}
      subTitle={'Why review insurance carriers?'}
      classes={{
        layoutInner: styles.reviewDashboardLayoutInner,
      }}
    >
      <SEO title="Reviews" />
      <div className={styles.reviews}>
        <AllReviews
          structuredReviews={[...structuredPolices, ...structuredReviews]}
          handleReviewDeleted={handleReviewDeleted}
          openReviewModal={handleReviewModal}
        />
      </div>
      <AddReviewDialog
        open={modalOpen}
        carrierId={carrierId}
        carrierName={carrierName}
        reviewData={reviewData}
        handleUpdateData={handleUpdateData}
        setOpen={value => {
          setModalOpen(value);
        }}
      />
    </DashboardLayout>
  );
};

Reviews.propTypes = {
  updateBreadcrumbs: PropTypes.func.isRequired,
  location: PropTypes.object,
};
AllReviews.propTypes = {
  structuredReviews: PropTypes.array.isRequired,
};

export default Reviews;
