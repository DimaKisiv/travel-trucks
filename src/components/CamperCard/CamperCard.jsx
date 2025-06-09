import React from "react";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { selectFavorites, toggleFavorite } from "../../redux/favoritesSlice";
import styles from "./CamperCard.module.css";
import Icon from "../Icon/Icon";
import FEATURE_BADGES from "../../helpers/featureBadges";

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
          {FEATURE_BADGES.map(
            ({ key, label, icon }) =>
              camper[key] && (
                <span className={styles.badge} key={key}>
                  <Icon name={icon} width={20} height={20} className={styles.badgeIcon} />
                  <span className={styles.badgeText}>{label(camper[key])}</span>
                </span>
              )
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
