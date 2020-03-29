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
import { fetchDataAction, orderByAction } from "./actions";
import StatusTable from "../../components/StatusTable";

const StyledContainer = Styled.div`
  margin: 20px auto 0;
  max-width: 1000px;
`;

const StyledPrimaryButton = Styled.button`
  background-color: #b50202;
  color: white;  
  height: 40px;
  border: 0;
  cursor: pointer;
  border-radius: 3px;
`;

const StyledInput = Styled.input`
  height: 40px;
  padding: 0 10px;
  border: 1px solid black;
`;

const LastCheckedTime = Styled.div`
  margin-top: 20px;
`;

export function StatusTableContainer({ ...props }) {
  useInjectReducer({ key: "statusTableContainer", reducer });
  useInjectSaga({ key: "statusTableContainer", saga });
  const [currentCountry, setCountry] = useState("Australia");
  const [searchTerm, setSearchTerm] = useState("");

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
      <StyledPrimaryButton
        onClick={() => {
          props.fetchData(currentCountry);
          setSearchTerm(currentCountry);
        }}
      >
        Check now!
      </StyledPrimaryButton>
      <LastCheckedTime>
        Last updated: {new Date(props.APIData.lastChecked).toString()}
      </LastCheckedTime>
      <StatusTable {...props} currentCountry={searchTerm} />
    </StyledContainer>
  );
}

StatusTableContainer.propTypes = {
  fetchData: PropTypes.func.isRequired,
  APIData: PropTypes.shape({
    statistics: PropTypes.array.isRequired,
    lastChecked: PropTypes.string,
  }),
};

const mapStateToProps = createStructuredSelector({
  APIData: makeSelectStatusTableContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchData: country => dispatch(fetchDataAction(country)),
    reorderData: orderInfo => dispatch(orderByAction(orderInfo)),
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
