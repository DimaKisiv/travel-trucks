import React from 'react';
import styles from './FeaturesBox.module.css';
import Icon from '../Icon/Icon';

const FeaturesBox = ({ camper }) => (
  <div className={styles.featuresSection}>
    <div className={styles.features}>
      {camper.transmission && (
        <span className={styles.badge}>
          <Icon name="diagram" width={20} height={20} className={styles.badgeIcon} />
          <span className={styles.badgeText}>{camper.transmission}</span>
        </span>
      )}
      {camper.engine && (
        <span className={styles.badge}>
          <Icon name="fuel-pump" width={20} height={20} className={styles.badgeIcon} />
          <span className={styles.badgeText}>{camper.engine}</span>
        </span>
      )}
      {camper.AC && (
        <span className={styles.badge}>
          <Icon name="wind" width={20} height={20} className={styles.badgeIcon} />
          <span className={styles.badgeText}>AC</span>
        </span>
      )}
      {camper.kitchen && (
        <span className={styles.badge}>
          <Icon name="cup-hot" width={20} height={20} className={styles.badgeIcon} />
          <span className={styles.badgeText}>Kitchen</span>
        </span>
      )}
      {camper.TV && (
        <span className={styles.badge}>
          <Icon name="tv" width={20} height={20} className={styles.badgeIcon} />
          <span className={styles.badgeText}>TV</span>
        </span>
      )}
      {camper.bathroom && (
        <span className={styles.badge}>
          <Icon name="ph_shower" width={20} height={20} className={styles.badgeIcon} />
          <span className={styles.badgeText}>Bathroom</span>
        </span>
      )}
    </div>
    <div className={styles.vehicleDetails}>
      <h3>Vehicle details</h3>
      <table>
        <tbody>
          <tr>
            <td>Type</td>
            <td>{camper.form}</td>
          </tr>
          <tr>
            <td>Length</td>
            <td>{camper.length}</td>
          </tr>
          <tr>
            <td>Width</td>
            <td>{camper.width}</td>
          </tr>
          <tr>
            <td>Height</td>
            <td>{camper.height}</td>
          </tr>
          <tr>
            <td>Tank</td>
            <td>{camper.tank}</td>
          </tr>
          <tr>
            <td>Consumption</td>
            <td>{camper.consumption}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default FeaturesBox;