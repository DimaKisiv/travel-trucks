import React from "react";
import styles from "./BookingSuccess.module.css";

const BookingSuccess = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className={styles.successContainer}>
      <h2 className={styles.successTitle}>Booking Submitted!</h2>
      <div className={styles.successDetails}>
        <div className={styles.detailRow}>
          <strong>Name:</strong> {data.name}
        </div>
        <div className={styles.detailRow}>
          <strong>Email:</strong> {data.email}
        </div>
        <div className={styles.detailRow}>
          <strong>Booking date:</strong>{" "}
          {data.bookingDate ? data.bookingDate.toLocaleDateString() : ""}
        </div>
        {data.comment && (
          <div className={styles.detailRow}>
            <strong>Comment:</strong> {data.comment}
          </div>
        )}
      </div>
      <button className={styles.closeBtn} onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default BookingSuccess;