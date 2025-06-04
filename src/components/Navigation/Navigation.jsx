import { Link } from 'react-router';
import styles from './Navigation.module.css';

function Navigation() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/campers">Campers</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;