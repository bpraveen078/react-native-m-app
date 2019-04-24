import { takeEvery, call, put, cancel, all } from "redux-saga/effects";
import { AsyncStorage } from "react-native";
import { login } from "../../services/login";
import * as actions from "../actions/common.action";
import { delay } from "redux-saga";

function* appLogin(action) {
  debugger;
  try {
    const response = yield call(login, action.loginData, "api/account/login");
    AsyncStorage.setItem("UserID", responseJson.Result.UserId.toString());
    this.props.navigation.navigate("drawerStack", {
      userId: responseJson.Result.UserId
    });
    yield put({ type: actions.LOGIN_SUCCESS, data: response.data });
    debugger;
  } catch (error) {
    debugger;
    yield put({ type: actions.ERROR, error });
  }
}
function* appLoginWatcher() {
  yield takeEvery(actions.LOGIN_REQUEST, appLogin);
}
function* watchAppLogin() {
  yield all([appLoginWatcher()]);
}

export default [watchAppLogin];
