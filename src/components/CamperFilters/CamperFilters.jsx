import React from 'react';
import styles from './CamperFilters.module.css';
import Icon from '../icon/icon';

const equipmentOptions = [
  { icon: <Icon name="wind" width={36} height={32} />, label: 'AC', value: 'ac' },
  { icon: <Icon name="diagram" width={36} height={28} />, label: 'Automatic', value: 'automatic' },
  { icon: <Icon name="cup-hot" width={36} height={32} />, label: 'Kitchen', value: 'kitchen' },
  { icon: <Icon name="tv" width={36} height={28} />, label: 'TV', value: 'tv' },
  { icon: <Icon name="ph_shower" width={35} height={33} />, label: 'Bathroom', value: 'bathroom' },
];

const typeOptions = [
  { icon: <Icon name="bi_grid-1x2" width={32} height={32} />, label: 'Van', value: 'van', class:'' },
  { icon: <Icon name="bi_grid" width={40} height={32} />, label: 'Fully Integrated', value: 'fully-integrated', class: 'fullyIntegrated' },
  { icon: <Icon name="bi_grid-3x3-gap" width={40} height={32} />, label: 'Alcove', value: 'alcove', class:'' },
];

function CamperFilters({
  filters = {},
  setFilters = () => {},
  onSearch = () => {},
}) {
  // Location input handler
  const handleLocationChange = (e) => {
    setFilters({ ...filters, location: e.target.value });
  };

  // Equipment toggle handler (array)
  const handleEquipmentClick = (value) => {
    const eq = filters.equipment || [];
    setFilters({
      ...filters,
      equipment: eq.includes(value)
        ? eq.filter((v) => v !== value)
        : [...eq, value],
    });
  };

  // Vehicle type (single value)
  const handleTypeClick = (value) => {
    setFilters({
      ...filters,
      vehicleType: filters.vehicleType === value ? '' : value,
    });
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.filterBlock}>
        <label className={styles.filterLabel} htmlFor="location-input">Location</label>
        <div className={styles.locationBox}>
          <span className={styles.icon}>
            <Icon name={filters.location ? "location-selected" : "location-unselected"} width={20} height={20} />
          </span>
          <input
            id="location-input"
            className={styles.locationInput}
            type="text"
            placeholder="City"
            value={filters.location || ''}
            onChange={handleLocationChange}
          />
        </div>
      </div>

      <div className={styles.filterBlock}>
        <h3>Filters</h3>

        <div className={styles.filterGroup}>
          <p className={styles.filterTitle}>Vehicle equipment</p>
          <div className={styles.filterOptions}>
            {equipmentOptions.map(opt => (
              <button
                key={opt.value}
                className={`${styles.filterBtn} ${filters.equipment?.includes(opt.value) ? styles.active : ''}`}
                onClick={() => handleEquipmentClick(opt.value)}
                type="button"
              >
                {opt.icon} <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <p className={styles.filterTitle}>Vehicle type</p>
          <div className={styles.filterOptions}>
            {typeOptions.map(opt => (
              <button
                key={opt.value}
                className={`${styles.filterBtn} ${styles[opt.class]} ${filters.vehicleType === opt.value ? styles.active : ''}`}
                onClick={() => handleTypeClick(opt.value)}
                type="button"
              >
                {opt.icon} <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button className={styles.searchBtn} onClick={onSearch} type="button">
          Search
        </button>
      </div>
    </aside>
  );
}

export default CamperFilters;