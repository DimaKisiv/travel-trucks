const equipmentOptions = [
  { label: 'AC', value: 'ac' },
  { label: 'Automatic', value: 'automatic' },
  { label: 'Kitchen', value: 'kitchen' },
  { label: 'TV', value: 'tv' },
  { label: 'Bathroom', value: 'bathroom' },
];

const vehicleTypeOptions = [
  { label: 'All', value: '' },
  { label: 'Van', value: 'van' },
  { label: 'Fully Integrated', value: 'fully-integrated' },
  { label: 'Alcove', value: 'alcove' },
];

const CamperFilters = ({ filters, setFilters }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleEquipmentChange = (e) => {
    const { value, checked } = e.target;
    let newEquipment = filters.equipment || [];
    if (checked) {
      newEquipment = [...newEquipment, value];
    } else {
      newEquipment = newEquipment.filter((item) => item !== value);
    }
    setFilters({
      ...filters,
      equipment: newEquipment,
    });
  };

  return (
    <div className="camper-filters">
      <h2>Filter Campers</h2>
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={filters.location || ''}
          onChange={handleInputChange}
          placeholder="Enter location"
        />
      </label>
      <label>
        Vehicle Type:
        <select
          name="vehicleType"
          value={filters.vehicleType || ''}
          onChange={handleInputChange}
        >
          {vehicleTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
      <fieldset>
        <legend>Vehicle Equipment:</legend>
        {equipmentOptions.map((option) => (
          <label key={option.value} style={{ marginRight: '1em' }}>
            <input
              type="checkbox"
              value={option.value}
              checked={filters.equipment?.includes(option.value) || false}
              onChange={handleEquipmentChange}
            />
            {option.label}
          </label>
        ))}
      </fieldset>
    </div>
  );
};

export default CamperFilters;