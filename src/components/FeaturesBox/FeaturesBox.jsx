import React from 'react';
import styles from './FeaturesBox.module.css';

const FEATURES_TOP = [
  { label: 'Transmission', key: 'transmission' },
  { label: 'Engine', key: 'engine' },
  { label: 'AC', key: 'AC' },
  { label: 'Bathroom', key: 'bathroom' },
  { label: 'Kitchen', key: 'kitchen' },
  { label: 'TV', key: 'TV' },
  { label: 'Radio', key: 'radio' },
  { label: 'Refrigerator', key: 'refrigerator' },
  { label: 'Microwave', key: 'microwave' },
  { label: 'Gas', key: 'gas' },
  { label: 'Water', key: 'water' },
];

const FEATURES_DETAILS = [
  { label: 'Type', key: 'form' },
  { label: 'Length', key: 'length' },
  { label: 'Width', key: 'width' },
  { label: 'Height', key: 'height' },
  { label: 'Tank', key: 'tank' },
  { label: 'Consumption', key: 'consumption' },
];

const FeaturesBox = ({ camper }) => (
  <div className={styles.featuresLeft}>
    <div className={styles.topFeatures}>
      {FEATURES_TOP.filter(f => camper[f.key]).map(f => (
        <div key={f.key} className={styles.featureItem}>
          <strong>{f.label}:</strong>{' '}
          {typeof camper[f.key] === 'boolean'
            ? camper[f.key] ? 'Yes' : 'No'
            : camper[f.key]}
        </div>
      ))}
    </div>
    <ul className={styles.detailsList}>
      {FEATURES_DETAILS.map(f => (
        <li key={f.key}>
          <strong>{f.label}:</strong> {camper[f.key]}
        </li>
      ))}
    </ul>
  </div>
);

export default FeaturesBox;