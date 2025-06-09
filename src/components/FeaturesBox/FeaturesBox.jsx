import React from 'react';
import styles from './FeaturesBox.module.css';
import Icon from '../Icon/Icon';
import FEATURE_BADGES from '../../helpers/featureBadges';

const VEHICLE_DETAILS = [
  { label: 'Type', key: 'form' },
  { label: 'Length', key: 'length' },
  { label: 'Width', key: 'width' },
  { label: 'Height', key: 'height' },
  { label: 'Tank', key: 'tank' },
  { label: 'Consumption', key: 'consumption' },
];

const FeaturesBox = ({ camper }) => (
  <div className={styles.featuresSection}>
    <div className={styles.features}>
      {FEATURE_BADGES.map(({ key, label, icon }) =>
        camper[key] ? (
          <span className={styles.badge} key={key}>
            <Icon name={icon} width={20} height={20} className={styles.badgeIcon} />
            <span className={styles.badgeText}>{label(camper[key])}</span>
          </span>
        ) : null
      )}
    </div>
    <div className={styles.vehicleDetails}>
      <h3>Vehicle details</h3>
      {VEHICLE_DETAILS.map(({ label, key }) => (
        <div className={styles.detailsRow} key={key}>
          <span className={styles.detailsName}>{label}</span>
          <span className={styles.detailsValue}>{camper[key]}</span>
        </div>
      ))}
    </div>
  </div>
);

export default FeaturesBox;