import { put, call, takeLatest } from "redux-saga/effects";
import { FETCH_SERVER_DATA } from "./constants";
import { fetchDataSuccessAction, fetchDataFailureAction } from "./actions";

function fetchRemoteAPIGenerator(country = "Canada") {
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

function verifyLocalStorage(country) {
  const EXPIRY_HOURS = 1;

  if (localStorage && localStorage.getItem(country)) {
    const localData = JSON.parse(localStorage.getItem(country));
    const lastCheckedTime = new Date(localData.lastChecked).getTime();
    const timeElapsed = (Date.now() - lastCheckedTime) / 1000 / 60 / 60;
    if (timeElapsed < EXPIRY_HOURS) {
      console.log(
        "Get data from storage, passed time: " +
          timeElapsed.toFixed(2) +
          ", expiry time: " +
          EXPIRY_HOURS,
      );
      // if time passed is less than the expiry time, get data from localStorage
      return localData;
    }
  }

  return null;
}

function* fetchDataSaga(action) {
  // first check local saved data
  const localResult = verifyLocalStorage(action.payload);
  if (localResult) {
    yield put(fetchDataSuccessAction(localResult));
    return;
  }

  try {
    const result = yield call(fetchRemoteAPIGenerator, action.payload);
    if (result.error) {
      throw new Error("API endpoint returns error " + result.message);
    }
    yield put(fetchDataSuccessAction(result.data));
    if (localStorage) {
      yield localStorage.setItem(action.payload, JSON.stringify(result.data));
    }
  } catch (e) {
    yield put(fetchDataFailureAction(e));
  }
}

// Individual exports for testing
export default function* statusTableContainerSaga() {
  yield takeLatest(FETCH_SERVER_DATA, fetchDataSaga);
}
