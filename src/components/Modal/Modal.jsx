import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ children, onClose }) => (
  <div className={styles.overlay} onClick={onClose}>
    <div className={styles.content} onClick={e => e.stopPropagation()}>
      <button className={styles.closeBtn} onClick={onClose}>&times;</button>
      {children}
    </div>
  </div>
);

export default Modal;