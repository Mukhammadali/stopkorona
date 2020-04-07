import React from 'react'
import { useTable, useSortBy, useFilters} from 'react-table'
import styled from 'styled-components'
import { IoMdArrowRoundUp, IoMdArrowRoundDown } from 'react-icons/io';

const getBgClassName = (col) => {
  let bgClassName = "bg-custom"
  if(col.id === 'cases'){
    bgClassName = "bg-warning"
  }
  return  bgClassName
}


function Table({ onClickListItem, columns, data, initialState }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: initialState || {},
      disableSortRemove: true
    },
    useFilters,
    useSortBy,
  )

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  // const firstPageRows = rows.slice(0, 20)

  return (
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => {
                return(
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div className="table-head font-weight-semibold">
                    {(column.Filter && column.canFilter) ? column.render("Filter") : column.render('Header')}
                    {
                      column.isSorted && (
                      <span>
                          {
                            column.isSortedDesc
                              ? <IoMdArrowRoundDown className="ml-2"  />
                              : <IoMdArrowRoundUp className="ml-2" />
                          }
                      </span>
                      )
                    }
                  </div>
                </th>
              )})}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(
            (row, i) => {
              prepareRow(row);
              // onClick={() => onClickListItem(row?.original)}
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell =>  (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  )}
                </tr>
              )}
          )}
        </tbody>
      </table>
    </Styles>
  )
}

export default Table

const Styles = styled.div`
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  height: 500px;
  table {
    border-radius: 5px;
    border-spacing: 0;
    width: 100%;
    tr {
      transition: 0.2s all ease-in;
      :hover {
        background-color: #edf2f7;
        cursor: pointer;
        transition: 0.2s all ease-out;
      }
    }
    th,
    td {
      margin: 0;
      padding: 0px;
      border-bottom: 1px solid #e2e8f0;
      border-right: 1px solid #e2e8f0;
      height: 2.5rem;
      .stat-cell {
        padding:0 1rem !important;
        font-family: "ProximaNova Semibold";
        font-size: 1.10rem;
        .today-stat {
          font-size: 0.95rem;
          font-weight: normal;
        }
      }
      .country-cell {
        height: 100%;
        display: flex;
        align-items: center;
        padding-left: 10px;
      }
      :last-child {
        border-right: 1px solid #e2e8f0;
      }
      :first-child {
        border-left: 1px solid #e2e8f0;
      }
      &:first-child {
        font-size: 1rem;
        width: 15rem;
        max-width: 15rem;
        @media only screen and (max-width: 980px) {
          width: 10rem;
          max-width: 10rem;
        }
      }
    }
    th {
      background-color: #edf2f7;
      padding: 0.5rem;
      position: sticky;
      top: 0;
      z-index: 2;
      .table-head font-weight-semibold {
        display: flex;
        align-items: center;
      }
    }
   
  }
`