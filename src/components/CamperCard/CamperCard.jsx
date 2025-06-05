import React from 'react';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, selectFavorites } from '../../redux/favoritesSlice';
import styles from './CamperCard.module.css';

const HeartIcon = ({ filled }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill={filled ? "#e63946" : "none"}
    stroke="#e63946"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.heartIcon}
  >
    <path d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z" />
  </svg>
);

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.includes(camper.id);

  const handleFavorite = (e) => {
    e.preventDefault();
    dispatch(toggleFavorite(camper.id));
  };

  return (
    <div className={styles.camperCard}>
      <div className={styles.imageCol}>
        <img
          className={styles.camperImg}
          src={camper.gallery?.[0]?.thumb || 'https://via.placeholder.com/292x312?text=No+Image'}
          alt={camper.name}
        />
        <span className={styles.heartWrapper} onClick={handleFavorite}>
          <HeartIcon filled={isFavorite} />
        </span>
      </div>
      <div className={styles.infoCol}>
        <h2>
          <Link to={`/campers/${camper.id}`}>{camper.name}</Link>
        </h2>
        <p>{camper.description}</p>
        <Link to={`/campers/${camper.id}`}>
          <button className={styles.detailsBtn}>View Details</button>
        </Link>
      </div>
    </div>
  );
};

export default CamperCard;