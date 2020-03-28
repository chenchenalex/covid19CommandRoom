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

export function fetchDataAction(payload) {
  return {
    type: FETCH_SERVER_DATA,
    payload,
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
