import axios from 'axios';
// eslint-disable-next-line no-undef
export const GATSBY_API_ENDPOINT = process.env.GATSBY_API_ENDPOINT;

export function getYears() {
  return axios.get(`${GATSBY_API_ENDPOINT}/api/v1/search/years`);
}

export function getMakes({ year }) {
  return axios.get(`${GATSBY_API_ENDPOINT}/api/v1/search/makes/${year}`);
}

export function getModels({ year, make }) {
  return axios.get(`${GATSBY_API_ENDPOINT}/api/v1/search/models/${year}/${make}`);
}

export function getStyles({ year, make, model }) {
  let encodedModel = encodeURIComponent(model);
  return axios.get(
    `${GATSBY_API_ENDPOINT}/api/v1/search/trims/${year}/${make}/${encodedModel}`
  );
}
