/**
 *
 * StatusTable
 *
 */

import React from "react";
import PropTypes from "prop-types";
// import PropTypes from 'prop-types';
import styled from "styled-components";
import StatusTableHeading from "./StatusTableHeading";

const NUM_TO_SHOW = 200;

const Container = styled.div`
  margin: 20px auto;
  max-width: 1000px;
`;

const StyledTable = styled.table`
  border: 1px solid black;
  width: 100%;
  text-align: center;

  margin: ${props => (props.margin ? props.margin : "unset")};

  td {
    border: 1px solid black;
  }

  tr {
    &:hover {
      td {
        background: darkred;
        color: white;
      }
    }
  }

  .color-red {
    color: red;
  }

  .color-green {
    color: green;
  }
`;

function StatusTable({ APIData, reorderData }) {
  const INITIAL_TOTAL = {
    confirmed: 0,
    recovered: 0,
    deaths: 0,
  };
  const tableTotalData = APIData
    ? APIData.statistics.reduce((total, current) => {
        total.confirmed += current.confirmed;
        total.recovered += current.recovered;
        total.deaths += current.deaths;
        return total;
      }, INITIAL_TOTAL)
    : INITIAL_TOTAL;

  const tableRowsByProvince = APIData
    ? APIData.statistics.slice(0, NUM_TO_SHOW).map(stat => (
        <tr key={stat.keyId}>
          <td>{stat.province || stat.country}</td>
          <td>{stat.confirmed}</td>
          <td className="color-red">{stat.deaths}</td>
          <td className="color-green">{stat.recovered}</td>
        </tr>
      ))
    : null;
  const country =
    APIData.statistics.length > 0 ? APIData.statistics[0].country : "Unknown";

  const callReorderData = e => {
    const orderByState = APIData.orderBy;
    const name = e.target.getAttribute("name");
    let orderByASC = true;
    if (orderByState) {
      if (orderByState.type === name) {
        orderByASC = !orderByState.orderByASC;
      }
    }

    reorderData({
      type: name,
      orderByASC,
    });
  };

  return (
    <Container>
      <h1>{country}</h1>
      <StyledTable margin={"0 0 30px 0"}>
        <thead>
          <tr>
            <StatusTableHeading>Total Confirmed</StatusTableHeading>
            <StatusTableHeading>Total Recovered</StatusTableHeading>
            <StatusTableHeading>Total Death</StatusTableHeading>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{tableTotalData.confirmed}</td>
            <td>{tableTotalData.recovered}</td>
            <td>{tableTotalData.deaths}</td>
          </tr>
        </tbody>
      </StyledTable>
      <StyledTable>
        <thead>
          <tr>
            <StatusTableHeading>Province / Country</StatusTableHeading>
            <StatusTableHeading
              onClick={callReorderData}
              clickable
              name="confirmed"
              orderBy={APIData.orderBy}
            >
              Confirmed Cases
            </StatusTableHeading>
            <StatusTableHeading
              onClick={callReorderData}
              clickable
              name="deaths"
              orderBy={APIData.orderBy}
            >
              Death cases
            </StatusTableHeading>
            <StatusTableHeading
              onClick={callReorderData}
              clickable
              name="recovered"
              orderBy={APIData.orderBy}
            >
              Recovered
            </StatusTableHeading>
          </tr>
        </thead>
        <tbody>{tableRowsByProvince}</tbody>
      </StyledTable>
    </Container>
  );
}

StatusTable.propTypes = {
  APIData: PropTypes.object.isRequired,
  reorderData: PropTypes.func.isRequired,
};

export default StatusTable;
