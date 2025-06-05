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
      // Here you would send data to backend or show a success message
      alert('Booking submitted!');
      setForm({ name: '', email: '', bookingDate: null, comment: '' });
      setTouched({});
      setSubmitted(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h3>Book This Camper</h3>
      <div className={styles.field}>
        <label>Name*</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {touched.name && errors.name && <span className={styles.error}>Name is required</span>}
      </div>
      <div className={styles.field}>
        <label>Email*</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {touched.email && errors.email && <span className={styles.error}>Valid email is required</span>}
      </div>
      <div className={styles.field}>
        <label>Booking Date*</label>
        <DatePicker
          selected={form.bookingDate}
          onChange={handleDateChange}
          onBlur={() => setTouched((prev) => ({ ...prev, bookingDate: true }))}
          minDate={new Date()}
          placeholderText="Select a date"
          dateFormat="yyyy-MM-dd"
          required
        />
        {touched.bookingDate && errors.bookingDate && <span className={styles.error}>Booking date is required</span>}
      </div>
      <div className={styles.field}>
        <label>Comment</label>
        <textarea
          name="comment"
          value={form.comment}
          onChange={handleChange}
          rows={3}
        />
      </div>
      <button type="submit" className={styles.submitBtn}>Book Now</button>
      {submitted && !isValid && <div className={styles.error}>Please fill all required fields correctly.</div>}
    </form>
  );
};

export default BookingForm;