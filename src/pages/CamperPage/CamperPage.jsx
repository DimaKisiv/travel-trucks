import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperById } from "../../redux/operations";
import {
  selectCamper,
  selectCamperStatus,
  selectCamperError,
} from "../../redux/camperSlice";
import Reviews from "../../components/CamperPage/Reviews/Reviews";
import BookingForm from "../../components/CamperPage/BookingForm/BookingForm";
import Gallery from "../../components/CamperPage/Gallery/Gallery";
import Modal from "../../components/Shared/Modal/Modal";
import FeaturesBox from "../../components/CamperPage/FeaturesBox/FeaturesBox";
import Icon from "../../components/Shared/Icon/Icon";
import Loader from "../../components/Shared/Loader/Loader";
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

  if (status === "loading") return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!camper) return <div>No camper found.</div>;

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
            alt={`Interior view of ${camper.name} camper, photo ${idx + 1}`}
            className={styles.thumbnailImg}
            onClick={() => {
              setSelectedImage(idx);
              setGalleryOpen(true);
            }}
          />
        ))}
      </div>
      <p className={styles.description}>{camper.description}</p>
      <nav className={styles.tabs} aria-label="Camper details navigation">
        <button
          role="tab"
          className={activeTab === "features" ? styles.activeTab : ""}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
        <button
          role="tab"
          className={activeTab === "reviews" ? styles.activeTab : ""}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </nav>

      <div className={styles.featuresTab}>
        <section className={styles.featuresLeft} aria-label="Features or Reviews">
          {activeTab === "features" ? (
            <section aria-label="Features">
              <FeaturesBox camper={camper} />
            </section>
          ) : (
            <article aria-label="Reviews">
              <Reviews reviews={camper.reviews} />
            </article>
          )}
        </section>
        <aside className={styles.featuresRight} aria-label="Booking">
          <BookingForm />
        </aside>
      </div>

      {galleryOpen && (
        <Modal onClose={() => setGalleryOpen(false)}>
          <Gallery images={camper.gallery} startIndex={selectedImage} camperName={camper.name} />
        </Modal>
      )}
    </main>
  );
};

export default CamperPage;
