import { Link } from 'react-router';
import styles from './Banner.module.css';

function Banner() {
  return (
    <div className={styles.banner}>
      <h1>Welcome to Travel Trucks</h1>
      <p>Explore our amazing campers!</p>
      <Link to="/campers" className={styles.button}>
        View Campers
      </Link>
    </div>
  );
}

export default Banner;