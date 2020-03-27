import { put, call, takeLatest } from "redux-saga/effects";
import { FETCH_SERVER_DATA } from "./constants";
import { fetchDataSuccessAction, fetchDataFailureAction } from "./actions";

function fetchRemoteAPIGenerator(country) {
  return fetch(
    `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=${country}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
        "x-rapidapi-key": "5c1ee2e1a1msh70e16e352bd634dp1fd168jsne6be5bcd83d7",
      },
    },
  ).then(res => res.json());
}

function* fetchDataSaga() {
  try {
    const result = yield call(fetchRemoteAPIGenerator, "China");
    if (result.error) {
      throw new Error("API endpoint returns error " + result.message);
    }
    yield put(fetchDataSuccessAction(result.data));
  } catch (e) {
    yield put(fetchDataFailureAction(e));
  }
}

// Individual exports for testing
export default function* statusTableContainerSaga() {
  yield takeLatest(FETCH_SERVER_DATA, fetchDataSaga);
}
