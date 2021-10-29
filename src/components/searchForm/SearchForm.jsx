import React from 'react';
import PropTypes from 'prop-types';
import PlanetSearch from '../planetSeach';

const SearchForm = ({
  onSubmit,
  planetChoices,
  vehicleChoices,
  onSearchChange,
  search,
  loading,
  destinationCount,
  totalTime,
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
    <form
      onSubmit={onSubmitForm}
      className="border-2 border-gray-200 bg-gray-50 p-10 flex lg:inline-flex flex-col"
    >
      <h2 className="text-2xl text-center lg:text-2xl lg:text-left mb-6">
        Select planets you want to search in:
      </h2>
      <div className="flex flex-col items-center space-y-6 lg:flex-row lg:space-x-6 lg:space-y-0 lg:items-stretch mb-6">
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
      </div>
      <div className="relative self-center text-center">
        <div className="lg:absolute left-5/4 top-1/2 transform -translate-y-1/2 whitespace-nowrap font-mono font-medium text-lg">
          Total time: {totalTime}
        </div>
        <button type="submit" disabled={!canSubmit() || loading}>
          Find Falcone
        </button>
      </div>
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
  /** total time to search planets */
  totalTime: PropTypes.number,
};

SearchForm.defaultProps = {
  destinationCount: 4,
};

export default SearchForm;
