import queryKeys from 'src/lib/constants/queryKeys';
import { fetchCountryHistorical, fetchCountryTotal, fetchCountryTotalYesterday } from 'src/lib/api';
import { useQuery } from 'react-query';

export const useCountryHistorical = ({countryName}) => {
  return useQuery([queryKeys.COUNTRY_HISTORICAL, { countryName }], fetchCountryHistorical, {
    refetchOnWindowFocus: false
  });
}

// export const useCountryTotal = ({ countryName, initialData }) => {
//   return useQuery([queryKeys.TOTAL_COUNTRY, { countryName }], fetchCountryTotal, {
//     initialData
//   })
// }

export const useCountryTotal = ({ countryName, initialData, yesterday = false }) => {
  if(yesterday) {
    return useQuery([queryKeys.TOTAL_COUNTRY_YESTERDAY, { countryName }], fetchCountryTotalYesterday, {
      initialData
    })
  }
  return useQuery([queryKeys.TOTAL_COUNTRY, { countryName }], fetchCountryTotal, {
    initialData
  })
}