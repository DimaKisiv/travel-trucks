export const filterCampers = (campers, filters) => {
  return campers.filter((camper) => {
    // Location filter (case-insensitive substring match)
    if (
      filters.location &&
      !camper.location.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false;
    }

    // Vehicle Type filter (form: 'panelTruck', 'fullyIntegrated', 'alcove')
    if (filters.vehicleType) {
      const typeMap = {
        van: 'panelTruck',
        'fully-integrated': 'fullyIntegrated',
        alcove: 'alcove',
      };
      if (camper.form !== typeMap[filters.vehicleType]) {
        return false;
      }
    }

    // Equipment filter (all selected equipment must be true in camper)
    if (filters.equipment && filters.equipment.length > 0) {
      const equipmentMap = {
        ac: 'AC',
        automatic: 'transmission', // special: check if 'automatic'
        kitchen: 'kitchen',
        tv: 'TV',
        bathroom: 'bathroom',
      };
      for (const eq of filters.equipment) {
        if (eq === 'automatic') {
          if (camper.transmission !== 'automatic') return false;
        } else if (!camper[equipmentMap[eq]]) {
          return false;
        }
      }
    }

    return true;
  });
};