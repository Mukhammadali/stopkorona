import React, { useMemo, memo, useState, useCallback } from 'react';
import queryKeys from 'src/lib/constants/queryKeys';
import { fetchAllCountries, fetchCountryHistorical } from 'src/lib/api';
import Table from 'src/components/Table';
import { useQuery, queryCache } from 'react-query';
import moize from 'moize';
import {GoSearch} from 'react-icons/go';
import {IoMdClose} from 'react-icons/io';
import debounce from 'lodash/debounce';
import { numberWithCommas } from 'src/lib/utils';
import styled from 'styled-components';
import { getCountryUzbekName } from 'src/lib/utils/getCountryName';
import { navigate } from 'src/lib/utils/i18n';
import SEO from './seo';
import Layout from './Layout';
import { useTranslation } from 'react-i18next';

const renderCustomCell = ({row, ...props}) => {
  return(
    <div className="country-cell">
      <span className="mr-1" style={{width: 30}}>{row.index + 1}.</span>
      <span className={`mr-2 flag-icon flag-icon-${row?.original?.countryInfo?.iso2?.toLowerCase()} `}></span>
      <span>{row?.original?.country}</span>
    </div>
  )
}

const renderRow = ({row, column}) => {
  if(column?.id === 'cases' && row?.original?.todayCases) {
    return (
      <div className="stat-cell d-flex align-items-center">
        <span>{numberWithCommas(row?.original?.[column?.id])}</span>
        <span className="text-danger ml-1 today-stat">+{row?.original?.todayCases}</span>
      </div>
    )
  }
  if(column?.id === 'deaths' && row?.original?.todayDeaths) {
    return (
      <div className="stat-cell d-flex align-items-center">
        <span>{numberWithCommas(row?.original?.[column?.id])}</span>
        <span className="text-danger ml-1 today-stat">+{row?.original?.todayDeaths}</span>
      </div>
    )
  }
  return (
    <span className="stat-cell">{numberWithCommas(row?.original?.[column?.id])}</span>
  )
}




const CountriesTable = () => {
  const { i18n, t } = useTranslation();
  const isUzbekLocale = i18n.language === 'uz';
  const { data, isLoading } = useQuery(queryKeys.ALL_COUNTRIES, fetchAllCountries, {
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  const transformedData = useMemo(() => data?.map(el => ({
    ...el,
    country: isUzbekLocale ? getCountryUzbekName(el?.countryInfo?.iso2) : el?.country,
  })), [data]);


  const onNavigate = (data) => {
    queryCache.prefetchQuery([queryKeys.COUNTRY_HISTORICAL, { countryName:  data?.country }], fetchCountryHistorical);
    navigate(`/countries/${data?.country}`, {
     state: {
       country: data,
     }
    })
  }

  const TableColumns = useMemo(() =>[
    {
      Header: t("Country name"),
      Cell: renderCustomCell,
      accessor: 'country',
      sortDescFirst: false,
      disableSortBy: true,
      Filter: function DefaultColumnFilter({
        column: { filterValue, setFilter }
      }) {
        return (
          <input
            className="table-search w-100 font-regular"
            value={filterValue || ""}
            autoComplete="false"
            type="text"
            onChange={e => {
              e.preventDefault();
              e.stopPropagation();
              setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
            }}
            placeholder={t("Search")}
          />
        );
      }
    },
    {
      Header: t("Cases"),
      accessor: 'cases',
      sortDescFirst: true,
      Cell: renderRow
    },
    {
      Header: t("Active"),
      accessor: 'active',
      sortDescFirst: true,
      Cell: renderRow
    },
    {
      Header: t("Recovered"),
      accessor: 'recovered',
      sortDescFirst: true,
      Cell: renderRow
    },
    {
      Header: t("Deaths"),
      accessor: 'deaths',
      sortDescFirst: true,
      Cell: renderRow
    }
  ], []);
  
 
  return (
    <Layout>
      <Styled>
        <SEO title="Davlatlar Koronavirus statistikasi" description="Butun dunyo davlatlarining koronavirus statistikasi jadvali"/>
        <div className="mb-2">
          <span className="font-weight-semibold">{t("Number of countries")}: </span>
          <span>{data?.length}</span>
        </div>
        <Table
          onClickListItem={onNavigate}
          columns={TableColumns}
          data={transformedData || []}
        />
      </Styled>
    </Layout>
  )
};

export default memo(CountriesTable);

const Styled = styled.div`
  .country-flag {
    border-radius: 2px;
    border: 1px solid #f4f4f4;
  }
  .table-toolbox {
    display: flex;
    flex: 1;
    justify-content: space-between;
  }
  .table-search {
    font-family: "ProximaNova Regular";
    outline: none;
    border: none;
    padding: 0px 5px;
    /* max-width: 100%; */
    height: 30px;
    /* width: 300px; */
    border-radius: 2px;
  }
`;