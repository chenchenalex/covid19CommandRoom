/*
 *
 * StatusTableContainer reducer
 *
 */
import produce from "immer";
import {
  FETCH_SERVER_DATA_SUCCESS,
  FETCH_SERVER_DATA_FAILURE,
} from "./constants";

export const initialState = {
  statistics: [],
};

/* eslint-disable default-case, no-param-reassign */
const statusTableContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_SERVER_DATA_SUCCESS:
        draft.statistics = action.payload.covid19Stats;
        break;
      case FETCH_SERVER_DATA_FAILURE:
        console.error("data fetch error: ", action.payload);
    }
  });

export default statusTableContainerReducer;
