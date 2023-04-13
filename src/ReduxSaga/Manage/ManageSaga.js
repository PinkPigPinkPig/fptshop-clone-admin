import { all, call, takeLatest } from "redux-saga/effects"
import ApiConfig from "../../config/ApiConfig"
import ApiUtil from "../../utils/ApiUtil"
import { ManageActions } from "./ManageRedux"

export function* watchManageSaga() {
  yield all([
    takeLatest(ManageActions.getAllCateRequest.type, handleGetAllCategory),
  ])
}

function* handleGetAllCategory(action) {
  const { callback } = action.payload
  try {
    const api = () =>
      ApiUtil.fetch(ApiConfig.GET_ALL_CATEGORY, { method: "GET" })
    const response = yield call(api)
    const isSuccess = response?.code === 200
    callback && callback(response.data)
  } catch (error) {
    console.log("error", error)
  }
}
