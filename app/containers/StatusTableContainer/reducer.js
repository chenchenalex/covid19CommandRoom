/*
 *
 * StatusTableContainer reducer
 *
 */
import produce from "immer";
import {
  FETCH_SERVER_DATA_SUCCESS,
  FETCH_SERVER_DATA_FAILURE,
  ORDER_BY,
} from "./constants";

export const initialState = {
  statistics: [],
  lastChecked: null,
  orderBy: null,
};

/* eslint-disable default-case, no-param-reassign */
const statusTableContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    let orderByASCFlag;

    switch (action.type) {
      case FETCH_SERVER_DATA_SUCCESS:
        draft.statistics = action.payload.covid19Stats;
        draft.lastChecked = action.payload.lastChecked;
        break;
      case FETCH_SERVER_DATA_FAILURE:
        console.error("data fetch error: ", action.payload);
        break;
      case ORDER_BY:
        draft.orderBy = action.payload;
        orderByASCFlag = action.payload.orderByASC ? 1 : -1;
        // {type: ‘confirmed’, orderByASC: true}
        draft.statistics = draft.statistics.sort(
          (prev, next) =>
            (prev[action.payload.type] - next[action.payload.type]) *
            orderByASCFlag,
        );
    }
  });

export default statusTableContainerReducer;
