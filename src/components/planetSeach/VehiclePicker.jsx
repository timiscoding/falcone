import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const VehiclePicker = ({ name, vehicles, onChange, checked, disabled }) => {
  return (
    <div
      className={clsx(disabled ? 'invisible' : 'visible', 'inline-block')}
      data-testid="vehicle-picker"
    >
      {vehicles.map(({ vehicle, qty, disabled }, i) => (
        <div key={`${name}-${i}`} className="flex space-x-4 items-center">
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
