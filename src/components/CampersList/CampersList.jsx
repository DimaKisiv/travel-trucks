import React from 'react';
import CamperCard from '../CamperCard/CamperCard';
import styles from './CampersList.module.css';

const CampersList = ({ campers, status }) => {
  if (status !== 'loading' && (!campers || campers.length === 0)) {
    return <div>No campers found.</div>;
  }

  return (
    <div className={styles.campersList}>
      {campers.map((camper) => (
        <CamperCard key={camper.id} camper={camper} />
      ))}
    </div>
  );
};

export default CampersList;