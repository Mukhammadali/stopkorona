import React, { useMemo, memo, useState, useCallback } from 'react';
import queryKeys from 'src/lib/constants/queryKeys';
import { fetchAllCountries } from 'src/lib/api';
import Table from 'src/components/Table';
import { useQuery } from 'react-query';
import {navigate} from 'gatsby'
import moize from 'moize';
import {GoSearch} from 'react-icons/go';
import {IoMdClose} from 'react-icons/io';
import debounce from 'lodash/debounce';
import { numberWithCommas } from 'src/lib/utils';
import styled from 'styled-components';
import { getCountryUzbekName } from 'src/lib/utils/getCountryName';

const renderCustomCell = ({row}) => (
    <div className="country-cell">
      <span className={`mr-2 flag-icon flag-icon-${row?.original?.countryInfo?.iso2?.toLowerCase()} `}></span>
      <span>{getCountryUzbekName(row?.original?.countryInfo?.iso2) || row?.original?.country}</span>
    </div>
)

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
    Header: "Country",
    Cell: renderCustomCell,
    accessor: 'country',
    sortDescFirst: false,
    disableSortBy: true,
    Filter: function DefaultColumnFilter({
      column: { filterValue, preFilteredRows, setFilter }
    }) {
      const count = preFilteredRows.length;
      return (
        <input
          className="table-search w-100"
          value={filterValue || ""}
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
  const { data, isLoading } = useQuery(queryKeys.ALL_COUNTRIES, fetchAllCountries)
  const [query, setQuery] = useState('');
  const onChange = useCallback(debounce(value => {
    setQuery(value)
  }, 50), []);

  const searchResult = useMemo(() => {
    if(!query) return data;
    return data?.filter(el => el?.country?.toLowerCase().includes(query.toLowerCase()));
  }, [query, data]);

  const onNavigate = (data) => {
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
        onClickListItem={onNavigate} columns={TableColumns} data={searchResult || []}
        initialState={{
          sortBy: [
            {
              id: 'cases',
              desc: true,
            }
          ]
        }}
      />
    </Styled>
  )
};

export default CountriesTable;

const Styled = styled.div`
  .table-toolbox {
    display: flex;
    flex: 1;
    justify-content: space-between;
  }
  .table-search {
    font-family: "ProximaNova Light";
    outline: none;
    border: none;
    padding: 0px 5px;
    max-width: 100%;
  }
`;