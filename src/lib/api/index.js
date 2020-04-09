import axiosInstance from '../utils/axiosInstance';

export const fetchCountryHistorical = ({country}) =>
  axiosInstance.get(`v2/historical/${country}?lastdays=all`).then(res => res?.data)
export const fetchAllHistorical = () =>
  axiosInstance.get('v2/historical/all?lastdays=all').then(res => res?.data)

export const fetchAllCountries = () =>
  axiosInstance.get('countries').then(res => res?.data)

export const fetchTotal = () =>
  axiosInstance.get('/all').then(res => res?.data)

export const fetchCountryTotal = ({country}) =>
  axiosInstance.get(`/countries/${country}`).then(res => res?.data)