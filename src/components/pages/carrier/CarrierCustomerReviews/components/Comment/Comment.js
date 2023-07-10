import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { gql, useMutation } from '@apollo/client';
import classNames from 'classnames';
import Cookies from 'js-cookie';
import Paper from '../../../../../utils/paper';
import emoji from '../../../../../../images/review-happy-emoji.svg';
import Button from '../../../../../form-button';
import { useRedux } from '../../../../../redux/reduxContext';

import * as styles from './comment.module.scss';

const UPDATE_REVIEW = gql`
  mutation updateReview($input: UpdateReviewInput!) {
    updateReview(input: $input) {
      review {
        id
      }
      errors
      success
    }
  }
`;

const Comment = ({ review, currentUser }) => {
  const reduxDispatcher = useRedux()[1];

  const [active, setActive] = useState(false);
  const [description, setDescription] = useState('');
  const [vote, setVote] = useState('');
  const [updateReview] = useMutation(UPDATE_REVIEW, {
    onCompleted: () => {},
  });

  useEffect(() => {
    setDescription(review?.review?.slice(0, 350));
  }, []);

  const handleHelpfulClick = e => {
    const token = Cookies.get('token');
    if (!token) {
      reduxDispatcher({
        type: 'LOGIN_POPUP_ACTION',
        payload: {
          open: true,
        },
      });
      return;
    }
    let targetVote = '';
    if (e.target.innerText == 'Yes') {
      targetVote = 'good';
      setVote('good');
    } else {
      targetVote = 'bad';
      setVote('bad');
    }
    updateReview({ variables: { input: { vote: targetVote, id: review.id } } });
  };

  const handleShowMore = () => {
    setDescription(active ? review?.review?.slice(0, 350) : review?.review);
    setActive(!active);
  };

  const isCurrentUserVotted = flag => {
    if (currentUser && review?.votesFor.length != 0) {
      const userVote = review?.votesFor.find(vote => vote.voter.id == currentUser.id);
      let voteFlag = '';
      if (userVote) {
        voteFlag = userVote.voteFlag ? 'good' : 'bad';
      }
      return voteFlag == flag;
    } else {
      if (currentUser && review?.votesFor.length != 0) {
        const userVote = review?.votesFor.find(vote => vote.voter.id == currentUser.id);
        let voteFlag = '';
        if (userVote) {
          voteFlag = userVote.voteFlag ? 'good' : 'bad';
        }
        return voteFlag == flag;
      } else {
        return false;
      }
    }
  };

  return (
    <>
      <Paper className={styles.comment}>
        <div className={styles.commentHeader}>
          <h4 className={styles.commentUser}>
            {review.firstName || 'Honest Policy'} {review.lastName || 'User'}
          </h4>
          <span className={styles.commentRate}>
            <div className={styles.commentRateImage}>
              <img loading="lazy" src={emoji} alt="emoji" />
            </div>
            <div className={styles.commentRateScore}>
              {(review.overall || 0).toFixed(2)}
            </div>
          </span>
        </div>
        <div className={styles.commentBody}>
          <p
            className={classNames(styles.commentDescription, {
              [styles.commentDescriptionMore]: active,
            })}
          >
            {description}
            {review?.review?.length > 350 && (
              <span onClick={handleShowMore}>Show {!active ? 'More' : 'Less'} </span>
            )}
          </p>
          <div className={styles.commentTags}>
            <p className={styles.commentTag}>
              Price Value: <span>{review.priceValue}</span>
            </p>
            <p className={styles.commentTag}>
              Claim Satisfaction: <span>{review.claimSatisfaction}</span>
            </p>
            <p className={styles.commentTag}>
              Customer Service: <span>{review.customerService}</span>
            </p>
            <p className={styles.commentTag}>
              Recommend: <span>{review.recommend ? 'yes' : 'no'}</span>
            </p>
          </div>
          <div className={styles.commentReview}>
            <p className={styles.commentReviewText}>Did you find this review helpful?</p>
            <div className={styles.commentReviewButtons}>
              <Button
                type="secondary"
                isOutline
                onClick={handleHelpfulClick}
                className={
                  vote == 'good' || isCurrentUserVotted('good') ? styles.buttonActive : ''
                }
                isDisabled={vote == 'good' || isCurrentUserVotted('good')}
              >
                Yes
              </Button>
              <Button
                type="secondary"
                isOutline
                onClick={handleHelpfulClick}
                className={
                  vote == 'bad' || isCurrentUserVotted('bad') ? styles.buttonActive : ''
                }
                isDisabled={vote == 'bad' || isCurrentUserVotted('bad')}
              >
                No
              </Button>
            </div>
            {review.upvotesCount ? (
              <p className={styles.commentReviewScore}>
                {review.upvotesCount} Honest Policy users found this review helpful
              </p>
            ) : (
              ''
            )}
          </div>
        </div>
      </Paper>
    </>
  );
};

Comment.propTypes = {
  review: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
};
export default Comment;
