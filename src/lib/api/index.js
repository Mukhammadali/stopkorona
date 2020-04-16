import axiosInstance from '../utils/axiosInstance';

export const fetchCountryHistorical = ({countryName}) =>
  axiosInstance.get(`v2/historical/${countryName}?lastdays=all`).then(res => res?.data)
export const fetchAllHistorical = () =>
  axiosInstance.get('v2/historical/all?lastdays=all').then(res => res?.data)

export const fetchAllCountries = () =>
  axiosInstance.get('v2/countries?sort=cases').then(res => res?.data)

export const fetchTotal = () =>
  axiosInstance.get('/v2/all').then(res => res?.data)

export const fetchCountryTotal = ({countryName}) =>
  axiosInstance.get(`/v2/countries/${countryName}`).then(res => res?.data)