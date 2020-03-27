/**
 *
 * StatusTableContainer
 *
 */

import React, { memo, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import makeSelectStatusTableContainer from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { fetchDataAction } from "./actions";
import StatusTable from "../../components/StatusTable";

export function StatusTableContainer({ ...props }) {
  useInjectReducer({ key: "statusTableContainer", reducer });
  useInjectSaga({ key: "statusTableContainer", saga });

  useEffect(() => {
    props.fetchData();
  }, []);

  return <StatusTable {...props} />;
}

StatusTableContainer.propTypes = {
  fetchData: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  APIData: makeSelectStatusTableContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchData: () => dispatch(fetchDataAction()),
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
