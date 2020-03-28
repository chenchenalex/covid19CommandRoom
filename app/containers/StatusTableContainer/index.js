/**
 *
 * StatusTableContainer
 *
 */

import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Styled from "styled-components";

import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import makeSelectStatusTableContainer from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { fetchDataAction } from "./actions";
import StatusTable from "../../components/StatusTable";

const StyledContainer = Styled.div`
  margin: 20px auto 0;
  max-width: 1000px;
`;

const StyledPrimaryButton = Styled.button`
  background-color: darkred;
  color: white;  
  height: 40px;
  border: 0;
  border-radius: 3px;
`;

const StyledInput = Styled.input`
  height: 40px;
  padding: 0 10px;
  border: 1px solid black;
`;

export function StatusTableContainer({ ...props }) {
  useInjectReducer({ key: "statusTableContainer", reducer });
  useInjectSaga({ key: "statusTableContainer", saga });
  const [currentCountry, setCountry] = useState("Australia");

  useEffect(() => {
    props.fetchData(currentCountry);
  }, []);

  return (
    <StyledContainer>
      <StyledInput
        type="text"
        value={currentCountry}
        onChange={e => setCountry(e.target.value)}
      />
      <StyledPrimaryButton onClick={() => props.fetchData(currentCountry)}>
        Check now!
      </StyledPrimaryButton>
      <StatusTable {...props} />
    </StyledContainer>
  );
}

StatusTableContainer.propTypes = {
  fetchData: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  APIData: makeSelectStatusTableContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchData: country => dispatch(fetchDataAction(country)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(StatusTableContainer);
