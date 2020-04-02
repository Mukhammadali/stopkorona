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

const renderCustomCell = ({row}) => (
    <div className="country-cell">
      <span className={`mr-2 flag-icon flag-icon-${row?.original?.countryInfo?.iso2?.toLowerCase()} `}></span>
      <span>{row?.original?.country}</span>
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
    Header: 'Davlat',
    Cell: renderCustomCell,
    accessor: 'country',
    sortDescFirst: false
  },
  {
    Header: 'Yuqtirganlar',
    accessor: 'cases',
    sortDescFirst: true,
    Cell: renderRow
  },
  {
    Header: 'Aktiv',
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
  {
    Header: 'Jiddiy ahvolda',
    accessor: 'critical',
    sortDescFirst: true,
    Cell: renderRow
  },
];


const CountriesTable = () => {
  const { data, isLoading } = useQuery(queryKeys.ALL_COUNTRIES, fetchAllCountries)
  const [query, setQuery] = useState('');
  const onChange = useCallback(debounce(value => {
    setQuery(value)
  }, 50), []);

  const searchResult = useMemo(() => {
    console.log('filtered');
    if(!query) return data;
    return data?.filter(el => el?.country?.toLowerCase().includes(query.toLowerCase()));
  }, [query, data]);
  const onNavigate = (data) => {
    navigate(`/countries/${data?.country}`, {
      country: data
    })
  }
  return (
    <Styled>
      <div className="table-toolbox mb-2">
        <div>
          <span className="font-weight-bold">Koronavirus aniqlangan davlatlar soni: </span>
          <span>{data?.length}</span>
        </div>
        <div className="table-search">
          <GoSearch className="mx-2"/>
          <input placeholder="Qidiruv"  onChange={({target}) => onChange(target?.value)} />
          {/* <IoMdClose /> */}
        </div>
      </div>
      <Table onClickListItem={onNavigate} columns={TableColumns} data={searchResult || []} initialState={{
          sortBy: [
            {
              id: 'cases',
              desc: true,
            }
          ]
        }} />
      {!searchResult?.length && (
        <p className="text-center">Ma'lumot topilmadi 😔</p>
      )}
    </Styled>
  )
};

export default CountriesTable;

const Styled = styled.div`
  .table-toolbox {
    display: flex;
    flex: 1;
    justify-content: space-between;
    .table-search {
      border-radius: 5px;
      min-width: 300px;
      border: 1px solid #cecece;
      padding: 2px;
      input {
        outline: none;
        border: none;
      }
    }
  }
`;