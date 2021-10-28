import React, { useEffect } from 'react';
import SearchForm from 'components/SearchForm';
import { useMission } from 'context';
import { useLocation } from 'wouter';
import Toast from 'components/Toast';

const Search = () => {
  const { state, dispatch } = useMission();
  const setLocation = useLocation()[1];

  const { error, loading, data, search } = state;

  useEffect(() => {
    if (data) return;
    dispatch({ type: 'fetch_data' });
  }, [dispatch, data]);

  const onSearchChange = (type, value, index) => {
    if (type === 'planet') {
      dispatch({ type: 'change_planet', index, value });
    } else if (type === 'vehicle') {
      dispatch({ type: 'change_vehicle', index, value });
    }
  };

  /* creates a list of planet choices from the planets endpoint data for a given planet dropdown
     @param {number} index - index of the planet dropdown */
  const planetChoices = (index) => {
    if (!data) {
      return [];
    }
    // remove planets already selected and keep the currently selected planet
    return data.planets.filter(
      ({ name }) => !search.planets.includes(name) || search.planets[index] === name
    );
  };

  /* creates a list of vehicle choices from the vehicles endpoint data for a given planet dropdown
     @param {number} index - index of the planet dropdown */
  const vehicleChoices = (index) => {
    if (!data) {
      return [];
    }
    return data.vehicles.map(({ name: vehicle, total_no, max_distance }) => {
      const qty = total_no - search.vehicles.filter((c) => c === vehicle).length;
      let outOfRange = false;
      const selectedPlanet = search.planets[index];
      if (selectedPlanet) {
        const { distance } = data.planets.find(({ name }) => name === selectedPlanet);
        outOfRange = distance > max_distance;
      }
      return {
        vehicle,
        qty,
        disabled: qty === 0 || outOfRange,
      };
    });
  };

  /* computes total flight time given current selected planets and vehicles */
  const totalTime = search.planets.reduce((time, planet, i) => {
    const vehicle = search.vehicles[i];
    if (!vehicle || !planet) {
      return time;
    }
    const { distance } = data.planets.find(({ name }) => name === planet);
    const { speed } = data.vehicles.find(({ name }) => name === vehicle);
    return time + distance / speed;
  }, 0);

  let toastMsg = null;
  if (error) {
    toastMsg = 'There was a problem. Try again';
  } else if (loading) {
    toastMsg = 'Loading...';
  }

  const onSubmit = () => {
    dispatch({
      type: 'submit_search',
      data: { planet_names: search.planets, vehicle_names: search.vehicles },
      totalTime,
      setLocation,
    });
  };

  return (
    <div className="text-center">
      <Toast message={toastMsg} />
      <h1>Find Falcone!</h1>
      <SearchForm
        planetChoices={planetChoices}
        vehicleChoices={vehicleChoices}
        onSearchChange={onSearchChange}
        onSubmit={onSubmit}
        search={search}
        loading={loading}
        totalTime={totalTime}
      />
    </div>
  );
};

export default Search;
