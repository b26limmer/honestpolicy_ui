import React, { useState } from 'react';
import Comment from '../Comment';
import Button from '../../../../../form-button';
import * as styles from './all-reviews.module.scss';
import { gql, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';

export const GET_CURRENT_USER = gql`
  query currentUser {
    currentUser {
      id
      email
      firstName
      lastName
    }
  }
`;

const AllReviews = ({ structuredReviews }) => {
  const [numberLimitReview, setNumberLimitReview] = useState(6);
  const [currentUser, setCurrentUser] = useState(null);

  const onGetUser = data => {
    const { currentUser } = data || {};
    setCurrentUser(currentUser);
  };
  useQuery(GET_CURRENT_USER, {
    onCompleted: data => {
      onGetUser(data);
    },
  });

  return (
    <>
      <div className={styles.allReviewsHead}>
        <p className={styles.allReviewsTitle}>
          {structuredReviews.length} customer reviews
        </p>
      </div>
      {structuredReviews.map((review, idx) =>
        idx < numberLimitReview ? (
          <Comment key={idx} review={review} currentUser={currentUser} />
        ) : (
          ''
        )
      )}

      <div className={styles.seeMoreContainer}>
        {structuredReviews?.length > 6 && (
          <Button
            isOutline
            type="primary"
            onClick={() => {
              if (structuredReviews?.length > numberLimitReview) {
                setNumberLimitReview(numberLimitReview + 10);
              } else {
                setNumberLimitReview(6);
              }
            }}
          >
            {structuredReviews?.length > numberLimitReview ? 'See more' : 'See less'}
          </Button>
        )}
      </div>
    </>
  );
};
AllReviews.propTypes = {
  structuredReviews: PropTypes.array,
};
export default AllReviews;
