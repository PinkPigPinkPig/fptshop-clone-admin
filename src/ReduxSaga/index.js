import { all, fork } from "redux-saga/effects";
import { watchAuthSaga } from "./Auth/AuthSaga";
import { watchManageSaga } from "./Manage/ManageSaga";
import { watchRootSaga } from "./Root/RootSaga";

export * from './Root'
export * from './Auth'

export default function* reduxSaga() {
  yield all([
    fork(watchRootSaga),
    fork(watchAuthSaga),
    fork(watchManageSaga),
  ])
}
