import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Comment from '../Comment';
import Button from '../../../../../form-button';

import * as styles from './all-reviews.module.scss';

const AllReviews = ({ structuredReviews, handleReviewDeleted, openReviewModal }) => {
  const [numberLimitReview, setNumberLimitReview] = useState(6);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (structuredReviews) {
      setReviews(structuredReviews);
    }
  }, [structuredReviews]);
  return (
    <>
      {reviews.map((review, idx) =>
        idx < numberLimitReview ? (
          <Comment
            key={review.id}
            review={review}
            handleReviewDeleted={handleReviewDeleted}
            openReviewModal={openReviewModal}
          />
        ) : (
          ''
        )
      )}

      <div className={styles.seeMoreContainer}>
        {reviews?.length > 6 && (
          <Button
            isOutline
            type="primary"
            onClick={() => {
              if (reviews?.length > numberLimitReview) {
                setNumberLimitReview(numberLimitReview + 10);
              } else {
                setNumberLimitReview(6);
              }
            }}
          >
            {reviews?.length > numberLimitReview ? 'See more' : 'See less'}
          </Button>
        )}
      </div>
    </>
  );
};

AllReviews.propTypes = {
  structuredReviews: PropTypes.func,
  handleReviewDeleted: PropTypes.func,
  openReviewModal: PropTypes.func,
};

export default AllReviews;
