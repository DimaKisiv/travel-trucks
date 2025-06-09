import React from "react";
import styles from "./Reviews.module.css";
import Icon from "../../Shared/Icon/Icon";

const getStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      i <= Math.round(rating) ? (
        <Icon key={i} name="rating-filled" width={16} height={16} />
      ) : (
        <Icon key={i} name="rating-empty" width={16} height={16} />
      )
    );
  }
  return stars;
};

const Reviews = ({ reviews = [] }) => {
  if (!reviews.length)
    return <div className={styles.noReviews}>No reviews yet.</div>;

  return (
    <div className={styles.reviews}>
      <ul className={styles.reviewList}>
        {reviews.map((review, idx) => (
          <li key={idx} className={styles.reviewItem}>
            <div className={styles.reviewContent}>
              <div className={styles.header}>
                <div className={styles.avatar}>
                  {review.reviewer_name?.[0]?.toUpperCase() || "?"}
                </div>
                <span className={styles.author}>
                  {review.reviewer_name}
                  <span className={styles.stars}>
                    {getStars(review.reviewer_rating)}
                  </span>
                </span>
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
