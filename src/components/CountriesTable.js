import React, { useMemo, memo, useState, useCallback } from 'react';
import queryKeys from 'src/lib/constants/queryKeys';
import { fetchAllCountries, fetchCountryHistorical } from 'src/lib/api';
import Table from 'src/components/Table';
import { useQuery, queryCache } from 'react-query';
import {navigate} from 'gatsby'
import moize from 'moize';
import {GoSearch} from 'react-icons/go';
import {IoMdClose} from 'react-icons/io';
import debounce from 'lodash/debounce';
import { numberWithCommas } from 'src/lib/utils';
import styled from 'styled-components';
import { getCountryUzbekName } from 'src/lib/utils/getCountryName';

const renderCustomCell = ({row, ...props}) => {
  return(
    <div className="country-cell">
      <span className="mr-1" style={{width: 30}}>{row.index + 1}.</span>
      <span className={`mr-2 flag-icon flag-icon-${row?.original?.countryInfo?.iso2?.toLowerCase()} `}></span>
      {/* <img className="country-flag mr-2" src={row?.original?.countryInfo?.flag} height={18} width={28} /> */}
      <span>{row?.original?.uzName}</span>
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

const TableColumns = [
  {
    Header: "Davlat nomi",
    Cell: renderCustomCell,
    accessor: 'uzName',
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
          placeholder="Qidiruv"
        />
      );
    }
  },
  {
    Header: 'Yuqtirganlar',
    accessor: 'cases',
    sortDescFirst: true,
    Cell: renderRow
  },
  {
    Header: 'Davolanayotganlar',
    accessor: 'active',
    sortDescFirst: true,
    Cell: renderRow
  },
  {
    Header: 'Tuzalganlar',
    accessor: 'recovered',
    sortDescFirst: true,
    Cell: renderRow
  },
  {
    Header: 'Vafot etganlar',
    accessor: 'deaths',
    sortDescFirst: true,
    Cell: renderRow
  },
  // {
  //   Header: 'Jiddiy ahvolda',
  //   accessor: 'critical',
  //   sortDescFirst: true,
  //   Cell: renderRow
  // },
];



const CountriesTable = () => {
  const { data, isLoading } = useQuery(queryKeys.ALL_COUNTRIES, fetchAllCountries, {
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  const transformedData = useMemo(() => data?.map(el => ({
      ...el,
      uzName: getCountryUzbekName(el?.countryInfo?.iso2) || el?.country,
    })), [data]);

  const onNavigate = (data) => {
    queryCache.prefetchQuery([queryKeys.COUNTRY_HISTORICAL, { countryName:  data?.country }], fetchCountryHistorical);
    navigate(`/countries/${data?.country}`, {
     state: {
       country: data,
     }
    })
  }
 
  return (
    <Styled>
      <div className="mb-2">
        <span className="font-weight-semibold">Koronavirus aniqlangan davlatlar soni: </span>
        <span>{data?.length}</span>
      </div>
      <Table
        onClickListItem={onNavigate}
        columns={TableColumns}
        data={transformedData || []}
        // initialState={}
      />
    </Styled>
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