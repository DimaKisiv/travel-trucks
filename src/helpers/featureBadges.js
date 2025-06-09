// Centralized feature badges config for CamperCard and FeaturesBox

const FEATURE_BADGES = [
  { key: 'transmission', label: (v) => v, icon: 'diagram' },
  { key: 'engine', label: (v) => v, icon: 'fuel-pump' },
  { key: 'AC', label: () => 'AC', icon: 'wind' },
  { key: 'kitchen', label: () => 'Kitchen', icon: 'cup-hot' },
  { key: 'TV', label: () => 'TV', icon: 'tv' },
  { key: 'bathroom', label: () => 'Bathroom', icon: 'ph_shower' },
  { key: 'radio', label: () => 'Radio', icon: 'radio' },
  { key: 'refrigerator', label: () => 'Refrigerator', icon: 'solar_fridge-outline' },
  { key: 'microwave', label: () => 'Microwave', icon: 'lucide_microwave' },
  { key: 'gas', label: () => 'Gas', icon: 'hugeicons_gas-stove' },
  { key: 'water', label: () => 'Water', icon: 'ion_water-outline' },
];

export default FEATURE_BADGES;