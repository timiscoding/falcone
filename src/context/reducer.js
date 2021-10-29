import { createSearch, createSearchToken, fetchPlanets, fetchVehicles } from 'services';

export const initState = {
  data: null,
  search: {
    planets: [],
    vehicles: [],
    result: null,
  },
  loading: false,
  error: null,
};

export const reducer = (state, action) => {
  if (action.type === 'request_start') {
    return { ...state, loading: true };
  } else if (action.type === 'request_fail') {
    return { ...state, error: action.error, loading: false };
  } else if (action.type === 'request_success_data') {
    return {
      ...state,
      loading: false,
      data: { planets: action.planets, vehicles: action.vehicles },
    };
  } else if (action.type === 'request_success_search') {
    return {
      ...state,
      loading: false,
      search: {
        ...state.search,
        result: action.result,
      },
    };
  } else if (action.type === 'change_planet') {
    const planets = [...state.search.planets];
    planets[action.index] = action.value;
    return {
      ...state,
      search: {
        ...state.search,
        planets,
      },
    };
  } else if (action.type === 'change_vehicle') {
    const vehicles = [...state.search.vehicles];
    vehicles[action.index] = action.value;
    return {
      ...state,
      search: {
        ...state.search,
        vehicles,
      },
    };
  } else if (action.type === 'reset_search') {
    return {
      ...state,
      search: {
        planets: [],
        vehicles: [],
        result: null,
      },
    };
  } else {
    throw new Error('unknown action type');
  }
};

export const asyncActionHandlers = {
  fetch_data:
    ({ dispatch }) =>
    async () => {
      dispatch({ type: 'request_start' });
      try {
        const data = await Promise.all([fetchPlanets(), fetchVehicles()]);
        dispatch({ type: 'request_success_data', planets: data[0], vehicles: data[1] });
      } catch (error) {
        dispatch({ type: 'request_fail', error: 'Could not fetch planets/vehicles data' });
      }
    },
  submit_search:
    ({ dispatch }) =>
    async (action) => {
      dispatch({ type: 'request_start' });
      try {
        const data = await createSearchToken();
        const result = await createSearch(action.data, data.token);
        if (result.status === 'success') {
          result.planet = result.planet_name;
          delete result.planet_name;
        }
        dispatch({
          type: 'request_success_search',
          result: { ...result, totalTime: action.totalTime },
        });
        action.setLocation('/result');
      } catch (error) {
        dispatch({ type: 'request_fail', error: 'Could not submit search' });
      }
    },
};
