import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledTableHeading = styled.th`
  border: 1px solid black;
  background: darkred;
  position: relative;
  color: white;
  height: 40px;
  cursor: ${props => (props.clickable ? "pointer" : null)};
  span {
    position: absolute;
    right: 10px;
  }
`;
function StatusTableHeading({ onClick, children, name, orderBy, clickable }) {
  let orderFlag;
  if (!orderBy || orderBy.type !== name) {
    orderFlag = null;
  } else {
    orderFlag = orderBy.orderByASC ? "⬆" : "⬇";
  }

  return (
    <StyledTableHeading onClick={onClick} name={name} clickable={clickable}>
      {children}
      <span>{orderFlag}</span>
    </StyledTableHeading>
  );
}

StatusTableHeading.propTypes = {
  children: PropTypes.elementType,
  clickable: PropTypes.bool,
  orderBy: PropTypes.object,
  onClick: PropTypes.func,
  name: PropTypes.name,
};

export default StatusTableHeading;
