import axiosInstance from '../utils/axiosInstance';

export const fetchCountryHistorical = ({countryName}) =>
  axiosInstance.get(`/historical/${countryName}?lastdays=all`).then(res => res?.data)
export const fetchAllHistorical = () =>
  axiosInstance.get('/historical/all?lastdays=all').then(res => res?.data)

export const fetchAllCountries = () =>
  axiosInstance.get('/countries?sort=cases').then(res => res?.data)

export const fetchTotal = () =>
  axiosInstance.get('/all').then(res => res?.data)

export const fetchCountryTotal = ({countryName}) =>
  axiosInstance.get(`/countries/${countryName}`).then(res => res?.data)

export const fetchCountryTotalYesterday = ({countryName}) =>
  axiosInstance.get(`/countries/${countryName}?yesterday=true`).then(res => res?.data)