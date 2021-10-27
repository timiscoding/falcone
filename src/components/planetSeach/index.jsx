import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetPicker from './PlanetPicker';
import VehiclePicker from './VehiclePicker';

const PlanetSearch = ({ title, planets, vehicles, onChange, vehicleChecked, planetValue }) => {
  const [selectedPlanet, setSelectedPlanet] = useState(false);

  const onPlanetChange = (planet) => {
    onChange({ type: 'planet', value: planet });
    setSelectedPlanet(!!planet);
  };

  const onVehicleChange = (vehicle) => {
    onChange({ type: 'vehicle', value: vehicle });
  };

  return (
    <div>
      <h1>{title}</h1>
      <PlanetPicker planets={planets} onChange={onPlanetChange} value={planetValue} />

      {selectedPlanet && (
        <VehiclePicker
          name={title}
          vehicles={vehicles}
          onChange={onVehicleChange}
          checked={vehicleChecked}
        />
      )}
    </div>
  );
};

PlanetSearch.propTypes = {
  /** title label */
  title: PropTypes.string,
  /** planet choices */
  planets: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
  /** vehicle choices */
  vehicles: PropTypes.arrayOf(
    PropTypes.shape({
      vehicle: PropTypes.string,
      qty: PropTypes.number,
      disabled: PropTypes.bool,
    })
  ),
  /** handler for when planet/vehicle selected */
  onChange: PropTypes.func.isRequired,
  /** selected vehicle */
  vehicleChecked: PropTypes.string,
  /** selected planet */
  planetValue: PropTypes.string,
};

export default PlanetSearch;
