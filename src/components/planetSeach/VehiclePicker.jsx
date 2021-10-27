import React from 'react';
import PropTypes from 'prop-types';

const VehiclePicker = ({ name, vehicles, onChange, checked }) => {
  return (
    <div>
      {vehicles.map(({ vehicle, qty, disabled }, i) => (
        <div key={`${name}-${i}`}>
          <input
            id={`${name}-${vehicle}`}
            type="radio"
            name={name}
            value={vehicle}
            onChange={(e) => onChange(e.target.value)}
            checked={vehicle === checked}
            disabled={disabled}
          />
          <label htmlFor={`${name}-${vehicle}`}>
            {vehicle} ({qty})
          </label>
        </div>
      ))}
    </div>
  );
};

VehiclePicker.propTypes = {
  /** radio buttons `name` attribute */
  name: PropTypes.string.isRequired,
  /** vehicle choices */
  vehicles: PropTypes.arrayOf(
    PropTypes.shape({
      vehicle: PropTypes.string,
      qty: PropTypes.number,
      disabled: PropTypes.bool,
    })
  ),
  /** change handler function */
  onChange: PropTypes.func.isRequired,
  /** selected radio value */
  checked: PropTypes.string,
};

export default VehiclePicker;
