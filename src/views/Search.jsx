import React, { useEffect } from 'react';
import SearchForm from 'components/searchForm';
import { useMission } from 'context';
import { useLocation } from 'wouter';
import Toast from 'components/toast';

/* removes black listed planet names from planets list
   @param {planet[]} planets - array of planet { name, distance }
   @param {string[]} blackList - array of planet names to filter out */
export const filterPlanets = (planets = [], blackList = []) => {
  return planets.filter(({ name }) => !blackList.includes(name));
};

/* computes the number of available vehicles given a list of selected vehicles
   @param {vehicle[]} vehicles - array of vehicle { name, max_distance, speed }
   @param {string[]} selectedVehicles - array of selected vehicle names */
export const getVehicleCount = (vehicles = [], selectedVehicles = []) => {
  return vehicles.map(({ name, total_no }) => ({
    name,
    total_no: total_no - selectedVehicles.filter((c) => c === name).length,
  }));
};

/* creates a list of vehicles whose range is shorter than a planet's distance
   @param {vehicle[]} vehicles - array of vehicle { name, max_distance, speed }
   @param {number} planetDistance - distance to planet */
export const getInvalidVehicles = (vehicles = [], planetDistance = -1) => {
  return vehicles
    .filter(({ max_distance }) => planetDistance > max_distance)
    .map(({ name }) => name);
};

export const getPlanet = (planets = [], planetName) => {
  return planets.find(({ name }) => name === planetName) || {};
};

export const getVehicle = (vehicles = [], vehicleName) => {
  return vehicles.find(({ name }) => name === vehicleName) || {};
};

/* gets time taken for all selected vehicles to reach selected planets
   @param {planet[]} planets - array of planet { name, distance }
   @param {vehicle[]} vehicles - array of vehicle { name, max_distance, speed }
   @param {string[]} selectedPlanets - array of selected planet names
   @param {sstring[]} selectedVehicles - array of selected vehicle names */
export const getFlightTime = (planets, vehicles, selectedPlanets, selectedVehicles) => {
  return selectedPlanets.reduce((time, planet, i) => {
    const vehicle = selectedVehicles[i];
    if (!vehicle || !planet) {
      return time;
    }
    const { distance } = getPlanet(planets, planet);
    const { speed } = getVehicle(vehicles, vehicle);
    /* if undefined, either a vehicle or planet is unselected so skip it
       if speed is 0, it means time will be infinity which we assume doesn't occur
       if distance is 0, it means time taken will be instant so return original value */
    if (!speed || !distance) return time;
    return time + distance / speed;
  }, 0);
};

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
    // keep the planet that is already selected for this dropdown if it exists
    const blackList = search.planets.filter((_, i) => i !== index);
    return filterPlanets(data?.planets, blackList);
  };

  /* creates a list of vehicle choices from the vehicles endpoint data for a given planet
     @param {number} index - index of the planet dropdown */
  const vehicleChoices = (index) => {
    if (!data) return [];
    const vehicleCount = getVehicleCount(data.vehicles, search.vehicles);
    const selectedPlanet = search.planets[index];
    const { distance } = getPlanet(data.planets, selectedPlanet);
    const invalidVehicles = getInvalidVehicles(data.vehicles, distance);
    return vehicleCount.map(({ name: vehicle, total_no: qty }) => ({
      vehicle,
      qty,
      disabled: qty === 0 || invalidVehicles.includes(vehicle),
    }));
  };

  const totalTime = getFlightTime(data?.planets, data?.vehicles, search.planets, search.vehicles);

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
