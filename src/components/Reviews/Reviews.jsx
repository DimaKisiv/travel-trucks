import React from 'react';
import styles from './Reviews.module.css';

const getStars = (rating) => '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));

const Reviews = ({ reviews = [] }) => {
  if (!reviews.length) return <div className={styles.noReviews}>No reviews yet.</div>;

  return (
    <div className={styles.reviews}>
      <h3>Reviews</h3>
      <ul className={styles.reviewList}>
        {reviews.map((review, idx) => (
          <li key={idx} className={styles.reviewItem}>
            <div className={styles.avatar}>
              {review.reviewer_name?.[0]?.toUpperCase() || '?'}
            </div>
            <div className={styles.reviewContent}>
              <div className={styles.header}>
                <span className={styles.author}>{review.reviewer_name}</span>
                <span className={styles.stars}>{getStars(review.reviewer_rating)}</span>
              </div>
              <div className={styles.text}>{review.comment}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;