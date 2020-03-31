import React, { useMemo, memo } from 'react';
import queryKeys from 'src/lib/constants/queryKeys';
import { fetchAllCountries } from 'src/lib/api';
import Table from 'src/components/Table';
import { useQuery } from 'react-query';
import { numberWithCommas } from 'src/lib/utils';

const CustomCell = memo(({row}) => (
    <div className="country-cell">
      <span className={`mr-2 flag-icon flag-icon-${row?.original?.countryInfo?.iso2?.toLowerCase()} `}></span>
      <span className="ont-weight-bold">{row?.original?.country}</span>
    </div>
))

const renderRow = ({row, column}) => {
  return (
    <span className="stat-cell">{numberWithCommas(row?.original?.[column?.id])}</span>
  )
}


const TableColumns = [
  {
    Header: 'Davlat',
    Cell: ({ row }) => {
      return <CustomCell row={row}/>;
    },
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
];


const CountriesTable = () => {
  const {data, isLoading} = useQuery(queryKeys.ALL_COUNTRIES, fetchAllCountries)
  return (
    <div>
      <Table columns={TableColumns} data={data || []} initialState={{
          sortBy: [
            {
              id: 'cases',
              desc: true,
            }
          ]
        }} />
    </div>
  )
};

export default CountriesTable;