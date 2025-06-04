import React from 'react';
import { Link } from 'react-router';
import styles from './CamperCard.module.css';

const CamperCard = ({ camper }) => {
  return (
    <div className={styles.camperCard}>
      <h2>
        <Link to={`/campers/${camper.id}`}>{camper.name}</Link>
      </h2>
      <p>{camper.description}</p>
      <img
        className={styles.camperImg}
        src={camper.gallery?.[0]?.thumb || 'https://via.placeholder.com/120x80?text=No+Image'}
        alt={camper.name}
      />
      <Link to={`/campers/${camper.id}`}>
        <button className={styles.detailsBtn}>View Details</button>
      </Link>
    </div>
  );
};

export default CamperCard;