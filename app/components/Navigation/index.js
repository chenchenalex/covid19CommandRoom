/**
 *
 * Navigation
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100px;
  background: darkred;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
`;

function Navigation() {
  return (
    <Container>
      <h1>Covid 19 status</h1>
    </Container>
  );
}

Navigation.propTypes = {};

export default Navigation;
