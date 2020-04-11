import queryKeys from 'src/lib/constants/queryKeys';
import { fetchCountryHistorical, fetchCountryTotal } from 'src/lib/api';
import { useQuery } from 'react-query';

export const useCountryHistorical = ({countryName}) => {
  return useQuery([queryKeys.COUNTRY_HISTORICAL, { countryName }], fetchCountryHistorical, {
    refetchOnWindowFocus: false
  });
}

export const useCountryTotal = ({ countryName }) => {
  return useQuery([queryKeys.TOTAL_COUNTRY, { countryName }], fetchCountryTotal)
}