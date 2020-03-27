/*
 *
 * StatusTableContainer actions
 *
 */

import {
  FETCH_SERVER_DATA,
  FETCH_SERVER_DATA_FAILURE,
  FETCH_SERVER_DATA_SUCCESS,
} from "./constants";

export function fetchDataAction() {
  return {
    type: FETCH_SERVER_DATA,
  };
}

export function fetchDataSuccessAction(payload) {
  return {
    type: FETCH_SERVER_DATA_SUCCESS,
    payload,
  };
}

export function fetchDataFailureAction(payload) {
  return {
    type: FETCH_SERVER_DATA_FAILURE,
    payload,
  };
}
