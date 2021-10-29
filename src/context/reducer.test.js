import { reducer } from './reducer';

const initState = () => ({
  data: null,
  search: {
    planets: [],
    vehicles: [],
    result: null,
  },
  loading: false,
  error: null,
});

describe('context/reducer', () => {
  test('request_start action', () => {
    const action = { type: 'request_start' };
    const expectedState = { ...initState(), loading: true };

    expect(reducer(initState(), action)).toEqual(expectedState);
  });

  test('request_fail action', () => {
    const action = { type: 'request_fail', error: 'oh no' };
    const expectedState = { ...initState(), loading: false, error: 'oh no' };

    expect(reducer(initState(), action)).toEqual(expectedState);
  });

  test('request_success_data action', () => {
    const action = { type: 'request_success_data', planets: ['a', 'b'], vehicles: ['c', 'd'] };
    const expectedState = {
      ...initState(),
      loading: false,
      data: { planets: action.planets, vehicles: action.vehicles },
    };

    expect(reducer(initState(), action)).toEqual(expectedState);
  });

  test('request_success_search action', () => {
    const state = initState();
    const action = { type: 'request_success_search', result: { planet: 'donlon', totalTime: 200 } };
    const expectedState = {
      ...state,
      loading: false,
      search: { ...state.search, result: action.result },
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  test('change_planet action', () => {
    const state = initState();
    const action = { type: 'change_planet', index: 1, value: 'a' };
    const expectedState = {
      ...state,
      search: { ...state.search, planets: [undefined, 'a'] },
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  test('change_vehicle action', () => {
    const state = initState();
    const action = { type: 'change_vehicle', index: 0, value: 'a' };
    const expectedState = {
      ...state,
      search: { ...state.search, vehicles: ['a'] },
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  test('reset_search action', () => {
    const state = initState();
    state.search = { planets: ['a'], vehicles: ['b'], result: { planet: 'a' } };
    state.data = { planets: ['c'] };
    const action = { type: 'reset_search' };
    const expectedState = {
      ...state,
      search: {
        planets: [],
        vehicles: [],
        result: null,
      },
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });
});
