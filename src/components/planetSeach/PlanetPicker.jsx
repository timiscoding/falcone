import React from 'react';
import PropTypes from 'prop-types';

const PlanetPicker = ({ onChange, planets, value }) => {
  return (
    <div className="text-center">
      <select
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className="p-1 border-green-400 border-2 rounded-md"
      >
        <option value="">Select planet</option>
        {planets.map(({ name }) => (
          <option value={name} key={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

PlanetPicker.propTypes = {
  /** change handler function */
  onChange: PropTypes.func.isRequired,
  /** planet choices */
  planets: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
  /** selected value */
  value: PropTypes.string,
};

export default PlanetPicker;
