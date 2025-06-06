import { NavLink } from "react-router";
import styles from "./Navigation.module.css";
import Logo from "../../assets/img/Logo.svg";

function Navigation() {
  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <img
            src={Logo}
            alt="Travel Trucks Logo"
            className={styles.logoImage}
          />
        </div>
        <ul className={styles.centerNav}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.navBtn} ${styles.active}` : styles.navBtn
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/campers"
              className={({ isActive }) =>
                isActive ? `${styles.navBtn} ${styles.active}` : styles.navBtn
              }
            >
              Catalog
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
