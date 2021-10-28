import { getInvalidVehicles } from './Search';
import { getFlightTime } from './Search';
import { getPlanet } from './Search';
import { filterPlanets, getVehicleCount } from './Search';

const planets = [
  { name: 'pluto', distance: 1 },
  { name: 'earth', distance: 2 },
  { name: 'mars', distance: 3 },
];
const vehicles = [
  { name: 'a', total_no: 2, max_distance: 1, speed: 1 },
  { name: 'b', total_no: 1, max_distance: 3, speed: 2 },
  { name: 'c', total_no: 0, max_distance: 2, speed: 0.5 },
];

describe('views/Search', () => {
  describe('filterPlanets', () => {
    const filterPlanetTestCases = [
      ['all planets given empty blacklist', planets, [], { length: 3, value: planets }],
      [
        'filtered planets',
        planets,
        [planets[1].name],
        { length: 2, value: [planets[0], planets[2]] },
      ],
      ['all planets given non-empty blacklist', planets, ['a', 'b'], { length: 3, value: planets }],
      [
        'no planets given matching blacklist',
        planets,
        planets.map(({ name }) => name),
        { length: 0, value: [] },
      ],
      ['no planets given empty planets list', [], ['a'], { length: 0, value: [] }],
      ['no planets given undefined planets', undefined, [], { length: 0, value: [] }],
      ['no planets given undefined blacklist', [], undefined, { length: 0, value: [] }],
    ];

    test.each(filterPlanetTestCases)(
      '#%# filterPlanets returns %s',
      (_, planets, blackList, expected) => {
        const res = filterPlanets(planets, blackList);
        expect(res).toHaveLength(expected.length);
        expect(res).toEqual(expected.value);
      }
    );
  });

  describe('getVehicleCount', () => {
    const vehicleCountTestCases = [
      [
        'full count given no vehicles selected',
        vehicles,
        [],
        vehicles.map(({ name, total_no }) => ({ name, total_no })),
      ],
      [
        'reduced count given some vehicles selected',
        vehicles,
        [vehicles[0].name, vehicles[1].name],
        [
          { name: 'a', total_no: 1 },
          { name: 'b', total_no: 0 },
          { name: 'c', total_no: 0 },
        ],
      ],
      ['empty list if given no vehicles', [], [], []],
      ['empty list if given undefined vehicles', undefined, [], []],
      ['empty list if given undefined selected vehicles', [], undefined, []],
    ];

    test.each(vehicleCountTestCases)(
      '#%# getVehicleCount returns %s',
      (_, vehicles, selectedVehicles, expected) => {
        const res = getVehicleCount(vehicles, selectedVehicles);
        expect(res).toEqual(expected);
      }
    );
  });

  describe('getPlanet', () => {
    const getPlanetTestCases = [
      ['planet data given a valid planet name', planets, 'earth', planets[1]],
      ['empty object given a invalid planet name', planets, 'qaz', {}],
      ['empty object given undefined planet name', planets, undefined, {}],
      ['empty object given undefined planets', undefined, 'earth', {}],
    ];

    test.each(getPlanetTestCases)(
      '#%# getPlanet returns %s',
      (_, planets, planetName, expected) => {
        const res = getPlanet(planets, planetName);
        expect(res).toEqual(expected);
      }
    );
  });

  describe('getInvalidVehicles', () => {
    const invalidVehiclesTestCases = [
      ['no vehicles given planet distance within range', vehicles, 1, []],
      [
        'all vehicles given planet distance out of range',
        vehicles,
        4,
        vehicles.map(({ name }) => name),
      ],
      ['some vehicles given planet distance', vehicles, 2, ['a']],
      ['no vehicles given no planet distance', vehicles, undefined, []],
      ['empty list given undefined vehicles', undefined, 1, []],
    ];

    test.each(invalidVehiclesTestCases)(
      '#%# getInvalidVehicles returns %s',
      (_, vehicles, planetDistance, expected) => {
        const res = getInvalidVehicles(vehicles, planetDistance);
        expect(res).toEqual(expected);
      }
    );
  });

  describe('getFlightTime', () => {
    const flightTimeTestCases = [
      ['time for no planets/vehicles selected', planets, vehicles, [], [], 0],
      [
        'time for some planets/vehicles selected',
        planets,
        vehicles,
        ['pluto', 'mars'],
        ['a', 'c'],
        7,
      ],
      [
        'time for a planet selected and vehicle unselected',
        planets,
        vehicles,
        ['pluto', 'mars'],
        ['a'],
        1,
      ],
      [
        'time for a vehicle selected and planet unselected',
        planets,
        vehicles,
        [undefined, 'mars'],
        ['a', 'c'],
        6,
      ],
      ['time given no planets data', undefined, vehicles, [], [], 0],
      ['time given no vehicles data', planets, undefined, [], [], 0],
    ];

    test.each(flightTimeTestCases)(
      '#%# getFlightTime returns %s',
      (_, planets, vehicles, selectedPlanets, selectedVehicles, expected) => {
        const res = getFlightTime(planets, vehicles, selectedPlanets, selectedVehicles);
        expect(res).toEqual(expected);
      }
    );
  });
});
