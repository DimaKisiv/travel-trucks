import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./BookingForm.module.css";
import Modal from "../../Shared/Modal/Modal";
import BookingSuccess from "./BookingSuccess";

const BookingForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    bookingDate: null,
    comment: "",
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setForm((prev) => ({ ...prev, bookingDate: date }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const validate = () => {
    return {
      name: !form.name,
      email: !form.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email),
      bookingDate: !form.bookingDate,
    };
  };

  const errors = validate();
  const isValid = !errors.name && !errors.email && !errors.bookingDate;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, bookingDate: true });
    setSubmitted(true);
    if (isValid) {
      setSubmittedData(form);
      setShowModal(true);
      setForm({ name: "", email: "", bookingDate: null, comment: "" });
      setTouched({});
      setSubmitted(false);
    }
  };

  // Set tomorrow as the minimum selectable date
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Book your campervan now</h2>
      <p className={styles.formSubtitle}>
        Stay connected! We are always ready to help you.
      </p>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <label htmlFor="booking-name" className={styles.visuallyHidden}>
          Name*
        </label>
        <input
          id="booking-name"
          className={styles.input}
          type="text"
          name="name"
          placeholder="Name*"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          aria-required="true"
          aria-invalid={!!(touched.name && errors.name)}
        />
        {touched.name && errors.name && (
          <span className={styles.error} id="name-error">
            Name is required
          </span>
        )}

        <label htmlFor="booking-email" className={styles.visuallyHidden}>
          Email*
        </label>
        <input
          id="booking-email"
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email*"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          aria-required="true"
          aria-invalid={!!(touched.email && errors.email)}
        />
        {touched.email && errors.email && (
          <span className={styles.error} id="email-error">
            Valid email is required
          </span>
        )}

        <label htmlFor="booking-date" className={styles.visuallyHidden}>
          Booking date*
        </label>
        <DatePicker
          id="booking-date"
          selected={form.bookingDate}
          onChange={handleDateChange}
          onBlur={() => setTouched((prev) => ({ ...prev, bookingDate: true }))}
          minDate={tomorrow}
          placeholderText="Booking date*"
          dateFormat="MMMM d, yyyy" // <-- human-friendly format
          className={styles.input}
          required
          aria-required="true"
          aria-invalid={!!(touched.bookingDate && errors.bookingDate)}
          formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3)}
        />
        {touched.bookingDate && errors.bookingDate && (
          <span className={styles.error} id="date-error">
            Booking date is required
          </span>
        )}

        <label htmlFor="booking-comment" className={styles.visuallyHidden}>
          Comment
        </label>
        <textarea
          id="booking-comment"
          className={styles.textarea}
          name="comment"
          placeholder="Comment"
          value={form.comment}
          onChange={handleChange}
          rows={3}
          aria-label="Comment"
        />
        <button type="submit" className={styles.submitBtn}>
          Send
        </button>
        {submitted && !isValid && (
          <div className={styles.error}>
            Please fill all required fields correctly.
          </div>
        )}
      </form>

      {showModal && submittedData && (
        <Modal onClose={() => setShowModal(false)}>
          <BookingSuccess data={submittedData} onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default BookingForm;
