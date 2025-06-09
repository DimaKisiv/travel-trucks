import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './BookingForm.module.css';

const BookingForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    bookingDate: null,
    comment: '',
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

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
      alert('Booking submitted!');
      setForm({ name: '', email: '', bookingDate: null, comment: '' });
      setTouched({});
      setSubmitted(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Book your campervan now</h2>
      <p className={styles.formSubtitle}>Stay connected! We are always ready to help you.</p>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="Name*"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {touched.name && errors.name && <span className={styles.error}>Name is required</span>}
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email*"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {touched.email && errors.email && <span className={styles.error}>Valid email is required</span>}
        <DatePicker
          selected={form.bookingDate}
          onChange={handleDateChange}
          onBlur={() => setTouched((prev) => ({ ...prev, bookingDate: true }))}
          minDate={new Date()}
          placeholderText="Booking date*"
          dateFormat="yyyy-MM-dd"
          className={styles.input}
          required
          formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3)}
        />
        {touched.bookingDate && errors.bookingDate && <span className={styles.error}>Booking date is required</span>}
        <textarea
          className={styles.textarea}
          name="comment"
          placeholder="Comment"
          value={form.comment}
          onChange={handleChange}
          rows={3}
        />
        <button type="submit" className={styles.submitBtn}>Send</button>
        {submitted && !isValid && <div className={styles.error}>Please fill all required fields correctly.</div>}
      </form>
    </div>
  );
};

export default BookingForm;