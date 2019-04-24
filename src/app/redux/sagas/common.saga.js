// import { takeEvery, call, put, cancel, all } from "redux-saga/effects";
// import API from "../api";
// import * as actions from "../actions";
// import { delay } from "redux-saga";

// function* watchWeatherIdReceived(action) {
//   const { id } = action;
//   const { error, data } = yield call(API.findWeatherbyId, id);
//   if (error) {
//     yield put({ type: actions.API_ERROR, code: error.code });
//     yield cancel();
//     return;
//   }
//   yield put({ type: actions.WEATHER_DATA_RECEIVED, data });
// }

// function* watchFetchWeather(action) {
//   const { latitude, longitude } = action;
//   const { error, data } = yield call(
//     API.findLocationByLatLng,
//     latitude,
//     longitude
//   );
//   if (error) {
//     console.log({ error });
//     yield put({ type: actions.API_ERROR, code: error.code });
//     yield cancel();
//     return;
//   }
//   const location = data[0] ? data[0].woeid : false;
//   if (!location) {
//     yield put({ type: actions.API_ERROR });
//     yield cancel();
//     return;
//   }
//   yield put({ type: actions.WEATHER_ID_RECEIVED, id: location });
// }

// function* watchDrone(action) {
//   while (true) {
//     const { error, data } = yield call(API.findDrone);
//     if (error) {
//       yield put({ type: actions.API_ERROR, code: error.code });
//       yield cancel();
//       return;
//     }
//     yield put({ type: actions.WATCH_DRONE_DATA_RECEIVED, data });
//     if (data == null || typeof data == "undefined") continue;
//     const { latitude, longitude } = data.data[data.data.length - 1];
//     yield call(watchFetchWeather, { latitude: latitude, longitude: longitude });
//     yield call(delay, 4000);
//   }
// }

// function* watchAppLoad() {
//   yield all([
//     takeEvery(actions.FETCH_WEATHER, watchFetchWeather),
//     takeEvery(actions.WEATHER_ID_RECEIVED, watchWeatherIdReceived),
//     takeEvery(actions.WATCH_DRONE, watchDrone)
//   ]);
// }

// export default [watchAppLoad];
