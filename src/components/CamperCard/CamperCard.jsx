import React from "react";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { selectFavorites, toggleFavorite } from "../../redux/favoritesSlice";
import styles from "./CamperCard.module.css";
import Icon from "../icon/icon";

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.includes(camper.id);

  const MAX_DESC_LENGTH = 68;
  const getShortDescription = (desc) => {
    if (!desc) return "";
    return desc.length > MAX_DESC_LENGTH
      ? desc.slice(0, MAX_DESC_LENGTH) + "..."
      : desc;
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(camper.id));
  };

  return (
    <article className={styles.camperCard}>
      <div className={styles.imageCol}>
        <img
          className={styles.camperImg}
          src={camper.gallery?.[0]?.thumb}
          alt={camper.name}
        />
      </div>
      <div className={styles.infoCol}>
        <div className={styles.cardHeader}>
          <h2>{camper.name}</h2>
          <div className={styles.priceFavRow}>
            <span className={styles.price}>
              €
              {Number(camper.price)
                .toLocaleString("uk-UA", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                })
                .replace(/,/g, ".")}
            </span>
            <span
              className={styles.favoriteIcon}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
              tabIndex={0}
              role="button"
              onClick={handleFavoriteClick}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleFavoriteClick(e);
              }}
            >
              <Icon
                name={isFavorite ? "heart-filled" : "heart-empty"}
                width={24}
                height={20}
              />
            </span>
          </div>
        </div>
        <p className={styles.reviews}>
          <Icon
            name="rating-filled"
            width={16}
            height={16}
            className={styles.starIcon}
          />{" "}
          {camper.rating}
          {camper.reviews?.length
            ? ` (${camper.reviews.length} Reviews)`
            : ""}{" "}
          <span className={styles.location}>
            <Icon
              name="location-selected"
              width={16}
              height={16}
              className={styles.locationIcon}
            />{" "}
            {camper.location}
          </span>
        </p>
        <p className={styles.desc}>{getShortDescription(camper.description)}</p>
        <div className={styles.tags}>
          {camper.transmission && (
            <span className={styles.badge}>
              <Icon name="diagram" size={20} className={styles.badgeIcon} />
              <span className={styles.badgeText}>{camper.transmission}</span>
            </span>
          )}
          {camper.engine && (
            <span className={styles.badge}>
              <Icon name="fuel-pump" size={20} className={styles.badgeIcon} />
              <span className={styles.badgeText}>{camper.engine}</span>
            </span>
          )}
          {camper.AC && (
            <span className={styles.badge}>
              <Icon name="wind" className={styles.badgeIcon} />
              <span className={styles.badgeText}>AC</span>
            </span>
          )}
          {camper.kitchen && (
            <span className={styles.badge}>
              <Icon name="cup-hot" className={styles.badgeIcon} />
              <span className={styles.badgeText}>Kitchen</span>
            </span>
          )}
          {camper.TV && (
            <span className={styles.badge}>
              <Icon name="tv" className={styles.badgeIcon} />
              <span className={styles.badgeText}>TV</span>
            </span>
          )}
          {camper.bathroom && (
            <span className={styles.badge}>
              <Icon name="ph_shower" className={styles.badgeIcon} />
              <span className={styles.badgeText}>Bathroom</span>
            </span>
          )}
        </div>
        <Link to={`/campers/${camper.id}`} className={styles.showMore}>
          Show more
        </Link>
      </div>
    </article>
  );
};

export default CamperCard;
