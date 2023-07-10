import React, { useRef } from 'react';
import * as styles from '../../scss/home/reviews.module.scss';
import startSvg from '../../../images/star.svg';
import SvgIcon from '@mui/material/SvgIcon';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { reviews } from './data';

const Reviews = () => {
  const reviewsCount = {
    stars: 4.73,
    total: 600,
  };
  const carouselRef = useRef(null);
  const handleMove = direction => {
    if (direction === 'left') {
      const x = carouselRef.current
        ? carouselRef.current.scrollWidth / reviews.length
        : '';
      if (carouselRef.current.scrollLeft === 0) {
        carouselRef.current.scrollLeft += x * reviews.length;
      } else {
        carouselRef.current.scrollLeft -= Math.floor(x);
      }
    } else {
      const width = carouselRef.current ? carouselRef.current.scrollWidth : '';
      const x = carouselRef.current
        ? carouselRef.current.scrollWidth / reviews.length
        : '';
      if (
        width - (carouselRef.current.scrollLeft + carouselRef.current.offsetWidth) <=
        x
      ) {
        carouselRef.current.scrollLeft = 0;
      } else {
        carouselRef.current.scrollLeft += Math.floor(x);
      }
    }
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>People loved Honest Policy</h2>
      <p className={styles.text}>
        <strong>{reviewsCount.stars} stars</strong> out of 5 based on
        <strong> {reviewsCount.total} reviews</strong>
      </p>
      <div className={styles.cardReviewsContainer} ref={carouselRef}>
        {reviews.map((review, id) => {
          const stars = Array.apply(null, Array(Math.ceil(review.stars))).map(() => 1);
          return (
            <div className={styles.card} key={id}>
              <div className={styles.starsContainer}>
                {stars.map((_, idx) => (
                  <img
                    loading="lazy"
                    className={styles.starSvg}
                    key={idx}
                    src={startSvg}
                    alt="Star SVG"
                    title={`${review.stars} out of 5`}
                  />
                ))}
              </div>
              <h3 className={styles.cardTitle}>{review.title}</h3>
              <p
                className={styles.reviewText}
                dangerouslySetInnerHTML={{ __html: review.review }}
              />
              <div className={styles.user}>
                <img
                  loading="lazy"
                  className={styles.userImage}
                  src={review.userImg}
                  alt={review.userName}
                />
                <div className={styles.userInfo}>
                  <h5 className={styles.userName}>{review.userName}</h5>
                  <p className={styles.userType}>Customer</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.moveButtonsContainer}>
        <SvgIcon
          className={styles.moveButton}
          component={ChevronLeftIcon}
          onClick={() => handleMove('left')}
        />
        <SvgIcon
          className={styles.moveButton}
          component={ChevronRightIcon}
          onClick={() => handleMove('right')}
        />
      </div>
    </div>
  );
};

export default Reviews;
