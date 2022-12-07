import { put, call, takeLatest, take } from "redux-saga/effects";
import { authService } from "../../service/AuthService";
import {
  setActiveUser,
  setToken,
  login,
  register,
  refreshToken,
  logout,
  getActiveUser,
} from "./slice";

function* loginHandler(action) {
  try {
    const data = yield call([authService, authService.login], action.payload);

    yield put(setActiveUser(data.user));
    yield put(setToken(data.authorization.token));
  } catch (e) {
    console.error(e);
  }
}

function* registerHandler(action) {
  try {
    const data = yield call([authService, authService.register], action.payload);

    yield put(setActiveUser(data.user));
    yield put(setToken(data.authorization.token));
  } catch (e) {
    console.error(e);
  }
}

function* refreshTokenHandler() {
  try {
    const data = yield call([authService, authService.refresh]);

    yield put(setActiveUser(data.user));
    yield put(setToken(data.authorization.token));
  } catch (e) {
    console.error(e);
  }
}
function* logoutHandler() {
  try {
    yield call([authService, authService.logout]);

    yield put(setActiveUser(null));
    yield put(setToken(null));
  } catch (e) {
    console.error(e);
  }
}

function* getActiveUserHendler() {
  try {
    const activeUser = yield call([authService, authService.getActiveUser]);
    
    yield put(setActiveUser(activeUser));
  } catch (e) {
    console.error(e);
  }
}

export function* watchForUserSagas() {
  yield takeLatest(login.type, loginHandler);
  yield takeLatest(register.type, registerHandler);
  yield takeLatest(refreshToken.type, refreshTokenHandler);
  yield takeLatest(logout.type, logoutHandler);
  yield takeLatest(getActiveUser.type, getActiveUserHendler);
}
