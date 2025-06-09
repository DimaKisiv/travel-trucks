import { Link } from "react-router";
import styles from "./Banner.module.css";

function Banner() {
  return (
    <div className={styles.banner}>
      <picture className={styles.bannerPicture}>
        <source srcSet="../../assets/img/banner-2x.jpg" media="(min-width: 1600px)" />
        <source srcSet="../../assets/img/banner-xl.jpg" media="(min-width: 1200px)" />
        <source srcSet="../../assets/img/banner-lg.jpg" media="(min-width: 992px)" />
        <source srcSet="../../assets/img/banner-md.jpg" media="(min-width: 768px)" />
        <source srcSet="../../assets/img/banner-sm.jpg" media="(min-width: 576px)" />
        <img
          src="../../assets/img/banner-xs.jpg"
          alt="Camper van at sunset"
          className={styles.responsiveBanner}
          loading="eager"
        />
      </picture>
      <div className={styles.bannerContent}>
        <h1 className={styles.headline}>Campers of your dreams</h1>
        <h2 className={styles.subHeadline}>
          You can find everything you want in our catalog
        </h2>
        <Link to="/campers" className={styles.viewMoreBtn}>
          View Now
        </Link>
      </div>
    </div>
  );
}

export default Banner;
