import axiosInstance from '../utils/axiosInstance';

export const fetchCountryHistorical = ({countryName}) =>
  axiosInstance.get(`v2/historical/${countryName}?lastdays=all`).then(res => res?.data)
export const fetchAllHistorical = () =>
  axiosInstance.get('v2/historical/all?lastdays=all').then(res => res?.data)

export const fetchAllCountries = () =>
  axiosInstance.get('countries').then(res => res?.data)

export const fetchTotal = () =>
  axiosInstance.get('/all').then(res => res?.data)

export const fetchCountryTotal = ({countryName}) =>
  axiosInstance.get(`/countries/${countryName}`).then(res => res?.data)