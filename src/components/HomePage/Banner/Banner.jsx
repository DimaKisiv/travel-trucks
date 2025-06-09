import { Link } from "react-router";
import styles from "./Banner.module.css";

function Banner() {
  return (
    <div className={styles.banner}>
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
