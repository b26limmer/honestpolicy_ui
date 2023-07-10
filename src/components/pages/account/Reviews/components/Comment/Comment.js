import React, { useState, useEffect, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import ListItem from '@mui/material/ListItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCar } from '@fortawesome/free-solid-svg-icons';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Rating } from '@mui/material';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import Button from '../../../../../form-button';
import FavoriteIcon from '@mui/icons-material/Favorite';

import * as styles from './comment.module.scss';
import rank0 from '../../../../../../images/carrierTemplate/rank1.png';
import { AlertsContext } from '../../../../../state/AlertsContext';
import PropTypes from 'prop-types';

const DELETE_REVIEW = gql`
  mutation deleteReview($input: DeleteReviewInput!) {
    deleteReview(input: $input) {
      review {
        id
      }
      errors
      success
    }
  }
`;

const Comment = ({ review, handleReviewDeleted, openReviewModal }) => {
  const [data, setData] = useState(review);
  const [isDeleted, setIsDeleted] = useState(false);
  const [open, setOpen] = useState(false);
  const [collapseOpen, setCollapseOpen] = useState(true);
  const { dispatchAlert } = useContext(AlertsContext);
  const [deleteReview, { errors }] = useMutation(DELETE_REVIEW, {
    errorPolicy: 'all',
    onCompleted: result => {
      if (result) {
        if (result.deleteReview.success) {
          setIsDeleted(true);
          handleReviewDeleted(review);
          dispatchAlert('Thank you.', 'success');
        } else {
          dispatchAlert('Something unexpected happened');
        }
      }
    },
  });

  if (errors) {
    dispatchAlert('Something unexpected happened');
  }

  useEffect(() => {
    if (review) {
      setData(review);
    }
  }, [review]);

  const handleClose = () => {
    setOpen(false);
  };

  const confirmDelete = () => {
    try {
      deleteReview({
        variables: {
          input: {
            id: parseInt(data?.id),
          },
        },
      });
    } catch (err) {
      console.error(err);
      dispatchAlert('Something unexpected happend');
    }
  };

  const handleCollapseClick = () => {
    const { id, carrierId, carrierName } = review;
    if (!id) {
      return openReviewModal(carrierId, carrierName);
    }
    setCollapseOpen(!collapseOpen);
  };

  const rating =
    Number(review.overall) +
    Number(review.customerService) +
    Number(review.priceValue) +
    Number(review.claimSatisfaction);

  if (isDeleted) {
    return null;
  } else {
    return (
      <div className={styles.commentCollapse}>
        <ListItem
          button
          onClick={handleCollapseClick}
          classes={{
            root: styles.commentCollapseItem,
          }}
        >
          <div className={styles.collapseHeaderTitle}>
            <ListItemIcon className={styles.collapseHeaderTitleIcon}>
              <FontAwesomeIcon icon={review.lineOfBusiness === 'auto' ? faCar : faHome} />
            </ListItemIcon>
            <label>
              {review?.carrierName}
              <span>{review?.timestamp || 'Not yet reviewed'}</span>
            </label>
          </div>
          <div className={styles.collapseHeaderRightSide}>
            {!review.id && (
              <label
                className={styles.collapseHeaderRightSideCreateReview}
                onClick={() => {
                  openReviewModal(review.carrierId, review.carrierName);
                }}
              >
                Review {review?.carrierName}
              </label>
            )}
            {review.id && (
              <label className={styles.collapseHeaderRightSideRating}>
                Your Rating
                <Rating
                  name="read-only"
                  value={review.stars}
                  readOnly
                  classes={{
                    root: styles.commentCollapseRatingRoot,
                  }}
                />
              </label>
            )}
            {open ? <ExpandLess /> : <ExpandMore />}
          </div>
        </ListItem>
        {review.id && (
          <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
            <Grid container>
              <Grid container className={styles.commentCollapseSubheader}>
                <Grid item md={4} sm={4} xs={6}>
                  <label className={styles.commentSubheaderTitle}>Your Review</label>
                </Grid>
                <Grid item md={4} sm={4} xs={6}>
                  <label className={styles.commentSubheaderScore}>
                    <img loading="lazy" src={rank0} alt={'Emoticon for rank'} />
                    {rating / 4}
                  </label>
                </Grid>
                <Grid
                  item
                  md={4}
                  sm={4}
                  xs={12}
                  className={styles.commentSubheaderRightsideWrapper}
                >
                  <label className={styles.commentSubheaderRightside}>
                    <FavoriteIcon />
                    <span className={styles.commentSubheaderRightsideScore}>
                      {review.weightedAverage}
                    </span>
                    <span>people found your review helpful!</span>
                  </label>
                </Grid>
              </Grid>
              <Grid container>
                <Grid
                  item
                  md={6}
                  sm={6}
                  xs={12}
                  className={styles.commentCollapseDetails}
                >
                  <label>
                    Overall Score
                    <span>{review?.overall || '-'}</span>
                  </label>
                  <Divider />
                  <label>
                    Customer Service
                    <span>{review?.customerService || '-'}</span>
                  </label>
                  <Divider />
                  <label>
                    Claims Process Handling
                    <span>{review?.claimSatisfaction || '-'}</span>
                  </label>
                  <Divider />
                  <label>
                    Value For Price
                    <span>{review?.priceValue || '-'}</span>
                  </label>
                </Grid>
                <Grid
                  item
                  md={6}
                  sm={6}
                  xs={12}
                  className={styles.commentCollapseDetails}
                >
                  <label>
                    Would you recommend to a friend?
                    <span>{review.recommend ? 'Yes' : 'No'}</span>
                  </label>
                  <Divider />
                  <label className={styles.commentCollapseDetailScore}>
                    Why did you give {review?.carrierName} a score of{' '}
                    <span>{review.overall}</span>?
                  </label>
                  <label className={styles.commentCollapseDetailReview}>
                    {review.review}
                  </label>
                </Grid>
                <Grid
                  item
                  md={12}
                  sm={12}
                  xs={12}
                  className={styles.commentCollapseEditReview}
                >
                  <label
                    onClick={() => {
                      openReviewModal(review.carrierId, review.carrierName, review);
                    }}
                  >
                    <FontAwesomeIcon icon={faPencilAlt} />
                    Edit Review
                  </label>
                </Grid>
              </Grid>
            </Grid>
          </Collapse>
        )}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Are you sure want to delete?'}
          </DialogTitle>
          <DialogActions className={styles.commentDialogActions}>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
};

Comment.propTypes = {
  review: PropTypes.object,
  handleReviewDeleted: PropTypes.func,
  openReviewModal: PropTypes.func,
};

export default Comment;
