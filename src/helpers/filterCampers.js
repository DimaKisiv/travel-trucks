import FEATURE_BADGES from './featureBadges';

// Map vehicleType filter to camper.form values
const typeMap = {
  van: 'panelTruck',
  'fully-integrated': 'fullyIntegrated',
  alcove: 'alcove',
};

export const filterCampers = (campers, filters) => {
  return campers.filter((camper) => {
    // Location filter (case-insensitive substring match)
    if (
      filters.location &&
      !camper.location.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false;
    }

    // Vehicle Type filter
    if (filters.vehicleType) {
      if (camper.form !== typeMap[filters.vehicleType]) {
        return false;
      }
    }

    // Equipment filter: all selected equipment must be present/true/match
    if (filters.equipment && filters.equipment.length > 0) {
      for (const eqKey of filters.equipment) {
        // Find badge config for this key
        const badge = FEATURE_BADGES.find((b) => b.key === eqKey);
        if (!badge) continue;

        // Special handling for transmission/engine (string match)
        if (eqKey === 'transmission' || eqKey === 'engine') {
          // If you want to allow filtering by specific transmission/engine, add dropdowns in filters UI
          // For now, skip as not present in filterableBadges
          continue;
        }

        // For boolean features (AC, kitchen, TV, etc)
        if (typeof camper[eqKey] === 'boolean') {
          if (!camper[eqKey]) return false;
        }
        // For string features (should be present and not falsy)
        else if (typeof camper[eqKey] === 'string') {
          if (!camper[eqKey]) return false;
        }
        // For number features (should be present and not zero)
        else if (typeof camper[eqKey] === 'number') {
          if (!camper[eqKey]) return false;
        }
        // If feature is missing
        else if (camper[eqKey] === undefined) {
          return false;
        }
      }
    }

    return true;
  });
};