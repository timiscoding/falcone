import React from 'react';
import PropTypes from 'prop-types';
import PlanetSearch from './planetSeach';

const SearchForm = ({
  onSubmit,
  planetChoices,
  vehicleChoices,
  onSearchChange,
  search,
  loading,
  destinationCount,
}) => {
  const canSubmit = () => {
    const planetsCount = search.planets.filter(Boolean).length;
    const vehiclesCount = search.vehicles.filter(Boolean).length;
    return planetsCount === destinationCount && vehiclesCount === destinationCount;
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (canSubmit()) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={onSubmitForm}>
      {Array(destinationCount)
        .fill()
        .map((_, i) => (
          <PlanetSearch
            key={i}
            title={`Destination ${i + 1}`}
            planets={planetChoices(i)}
            vehicles={vehicleChoices(i)}
            onChange={({ type, value }) => onSearchChange(type, value, i)}
            planetValue={search.planets[i]}
            vehicleChecked={search.vehicles[i]}
          />
        ))}
      <button type="submit" disabled={!canSubmit() || loading}>
        Find Falcone
      </button>
    </form>
  );
};

SearchForm.propTypes = {
  /** function that returns array of planet choices for a given PlanetSearch */
  planetChoices: PropTypes.func.isRequired,
  /** function that returns array of vehicle choices for a given PlanetSearch */
  vehicleChoices: PropTypes.func.isRequired,
  /** function that handles whenever a planet/vehicle gets selected */
  onSearchChange: PropTypes.func.isRequired,
  /** submit form handler */
  onSubmit: PropTypes.func.isRequired,
  /** vehicles/planets selected */
  search: PropTypes.shape({
    vehicles: PropTypes.arrayOf(PropTypes.string),
    planets: PropTypes.arrayOf(PropTypes.string),
  }),
  /** indicates api request in progress */
  loading: PropTypes.bool,
  /** number of planets to search */
  destinationCount: PropTypes.number,
};

SearchForm.defaultProps = {
  destinationCount: 4,
};

export default SearchForm;
