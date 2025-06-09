import { NavLink } from "react-router";
import styles from "./Navigation.module.css";
import Logo from "/assets/svg/Logo.svg";

function Navigation() {
  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <NavLink to="/" className={styles.logoImage}>
            <img
              src={Logo}
              alt="Travel Trucks Logo"
              style={{ width: "100%", height: "auto" }}
            />
          </NavLink>
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
              end
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
