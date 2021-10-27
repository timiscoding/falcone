const BASE_URL = 'https://5f5ff7f790cf8d00165573ed.mockapi.io';

const fetcher = async (...args) => {
  const res = await fetch(...args);
  if (!res.ok) {
    throw new Error(res.status);
  }
  return res.json();
};

export const fetchPlanets = async () => fetcher(`${BASE_URL}/planets`);

export const fetchVehicles = async () => fetcher(`${BASE_URL}/vehicles`);

export const createSearchToken = async () =>
  fetcher(`${BASE_URL}/token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  });

export const createSearch = async (data, token) =>
  fetcher(`${BASE_URL}/find`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, ...data }),
  });
