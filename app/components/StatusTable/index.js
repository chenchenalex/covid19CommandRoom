/**
 *
 * StatusTable
 *
 */

import React from "react";
import PropTypes from "prop-types";
// import PropTypes from 'prop-types';
import styled from "styled-components";

const Container = styled.div`
  margin: 20px auto;
  max-width: 1000px;
`;

const StyledTable = styled.table`
  border: 1px solid black;
  width: 100%;
  text-align: center;

  td {
    border: 1px solid black;
  }

  .color-red {
    color: red;
  }

  .color-green {
    color: green;
  }
`;

function StatusTable({ APIData }) {
  const tableRowData = APIData
    ? APIData.statistics.map(stat => (
        <tr key={stat.keyId}>
          <td>{stat.province}</td>
          <td>{stat.confirmed}</td>
          <td className="color-red">{stat.deaths}</td>
          <td className="color-green">{stat.recovered}</td>
        </tr>
      ))
    : null;

  return (
    <Container>
      <h1>Country here</h1>
      <StyledTable>
        <thead>
          <tr>
            <td>Province</td>
            <td>Confirmed Cases</td>
            <td>Death cases</td>
            <td>Recovered</td>
          </tr>
        </thead>
        <tbody>{tableRowData}</tbody>
      </StyledTable>
    </Container>
  );
}

StatusTable.propTypes = {
  APIData: PropTypes.object.isRequired,
};

export default StatusTable;
