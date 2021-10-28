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
    <div className="inline-block  p-8 space-y-3 shadow-md bg-white text-green-500 text-center">
      <p className="text-xl lg:text-2xl font-medium tracking-wide text-center mb-4">{title}</p>
      <PlanetPicker planets={planets} onChange={onPlanetChange} value={planetValue} />

      <VehiclePicker
        disabled={!selectedPlanet}
        name={title}
        vehicles={vehicles}
        onChange={onVehicleChange}
        checked={vehicleChecked}
      />
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
