import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperById } from "../../redux/operations";
import {
  selectCamper,
  selectCamperStatus,
  selectCamperError,
} from "../../redux/camperSlice";
import Reviews from "../../components/Reviews/Reviews";
import BookingForm from "../../components/BookingForm/BookingForm";
import Gallery from "../../components/Gallery/Gallery";
import Modal from "../../components/Modal/Modal";
import FeaturesBox from "../../components/FeaturesBox/FeaturesBox";
import Icon from "../../components/icon/icon";
import styles from "./CamperPage.module.css";

const CamperPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const camper = useSelector(selectCamper);
  const status = useSelector(selectCamperStatus);
  const error = useSelector(selectCamperError);

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("features");

  useEffect(() => {
    if (id) {
      dispatch(fetchCamperById(id));
    }
  }, [dispatch, id]);

  if (status === "loading") return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!camper) return <div>No camper found.</div>;

  // Show up to 4 thumbnails in a row
  const thumbnails = camper.gallery?.slice(0, 4) || [];

  return (
    <main className="main camper-page">
      <h2 className={styles.headline}>{camper.name}</h2>
      <div className={styles.infoRow}>
        <span className={styles.rank}>
          <Icon
            name="rating-filled"
            width={16}
            height={16}
            className={styles.stars}
          />
          {camper.rating}
          {camper.reviews?.length
            ? ` (${camper.reviews.length} Review${
                camper.reviews.length > 1 ? "s" : ""
              })`
            : ""}
        </span>
        <Icon name="location-selected" width={16} height={16} />
        <span className={styles.location}>{camper.location}</span>
      </div>
      <div className={styles.price}>
        €
        {Number(camper.price)
          .toLocaleString("uk-UA", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
          .replace(/,/g, ".")}
      </div>
      <div className={styles.thumbnailsRow}>
        {thumbnails.map((img, idx) => (
          <img
            key={idx}
            src={img.thumb}
            alt={camper.name}
            className={styles.thumbnailImg}
            onClick={() => {
              setSelectedImage(idx);
              setGalleryOpen(true);
            }}
          />
        ))}
      </div>
      <p className={styles.description}>{camper.description}</p>
      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={activeTab === "features" ? styles.activeTab : ""}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
        <button
          className={activeTab === "reviews" ? styles.activeTab : ""}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "features" && (
        <div className={styles.featuresTab}>
          <FeaturesBox camper={camper} />
          <div className={styles.featuresRight}>
            <BookingForm />
          </div>
        </div>
      )}

      {activeTab === "reviews" && (
        <div className={styles.reviewsTab}>
          <Reviews reviews={camper.reviews} />
        </div>
      )}

      {galleryOpen && (
        <Modal onClose={() => setGalleryOpen(false)}>
          <Gallery images={camper.gallery} startIndex={selectedImage} />
        </Modal>
      )}
    </main>
  );
};

export default CamperPage;
