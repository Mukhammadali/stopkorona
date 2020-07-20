import React, { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
import rawData from 'src/static/data/regions.json';
import { useTranslation } from 'react-i18next';

const RegionsTable = () => {
  const regions = useMemo(() => {
    return rawData.data?.sort((a,b) => b.cases - a.cases) || [];
  }, [])
 const {t} = useTranslation()
  return (
    <Styles>
      <span className="mb-1 font-semibold">{t("Last updated")}: </span><span>8 May</span>
      <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>{t("Region name")}</th>
            <th>{t("Cases")}</th>
            <th>{t("Recovered")}</th>
            <th>{t("Deaths")}</th>
          </tr>
        </thead>
        <tbody>
          {
            regions?.map((region, idx) => (
              <tr key={region?.name}>
                <td className="country-cell">{idx + 1}. {region?.name} {region?.cases === region?.recovered ? '🎉' : ''}</td>
                <td className="stat-cell">{region?.cases}</td>
                <td className="stat-cell">{region?.recovered || '-'}</td>
                <td className="stat-cell">{region?.deaths || '-'}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      </div>
    </Styles>
  )
}

export default RegionsTable

const Styles = styled.div`
  .table-wrapper{
    overflow-x: auto;
  }
  table {
    border-radius: 5px;
    border-spacing: 0;
    width: 100%;
    cursor: pointer;
    tr {
      .country-cell {
        height: 100%;
        align-items: center;
        padding-left: 10px;
        font-size: 1.10rem;
      }
      .stat-cell {
        padding:0 1rem !important;
        font-family: "ProximaNova Semibold";
        font-size: 1.10rem;
      }
    }
    th,
    td {
      margin: 0;
      padding: 0px;
      border-bottom: 1px solid #e2e8f0;
      border-right: 1px solid #e2e8f0;
      height: 2.5rem;
      :last-child {
        border-right: 1px solid #e2e8f0;
      }
      :first-child {
        border-left: 1px solid #e2e8f0;
      }
      &:first-child {
        font-size: 1rem;
        width: 15rem;
        @media only screen and (max-width: 980px) {
          min-width: 13rem;
        }
      }
    }
    th {
      background-color: #edf2f7;
      padding: 0.5rem;
      z-index: 2;
      .table-head {
        display: flex;
        align-items: center;
      }
    }
    thead {
      position: sticky;
      top: 0;
      left:0;
      right: 0;
    }
  }
`
