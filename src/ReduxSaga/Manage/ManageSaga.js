import { all, call, takeLatest } from "redux-saga/effects"
import ApiConfig from "../../config/ApiConfig"
import ApiUtil from "../../utils/ApiUtil"
import { ManageActions } from "./ManageRedux"

export function* watchManageSaga() {
  yield all([
    takeLatest(ManageActions.getAllCateRequest.type, handleGetAllCategory),
    takeLatest(
      ManageActions.getProductByCategoryRequest.type,
      handleGetProductByCategory
    ),
    takeLatest(
      ManageActions.getBrandByCategoryRequest.type,
      handleGetBrandByCategory
    ),
    takeLatest(
      ManageActions.getBrandByCategoryRequest.type,
      handleGetBrandByCategory
    ),
    takeLatest(ManageActions.getImageLinkRequest.type, handleGetImageLink),
    takeLatest(ManageActions.saveFileRequest.type, handleSaveFile),
    takeLatest(ManageActions.createProductRequest.type, handleCreateProduct),
    takeLatest(ManageActions.updateProductRequest.type, handleUpdateProduct),
    takeLatest(ManageActions.deleteProductRequest.type, handleDeleteProduct),
    takeLatest(ManageActions.getOrderRequest.type, handleGetOrder),
    takeLatest(ManageActions.getOrderDetailRequest.type, handleGetOrderDetail),
    takeLatest(ManageActions.updateOrderRequest.type, handleUpdateOrder),

    takeLatest(ManageActions.getAccountListRequest.type, handleGetAccountList),
    takeLatest(ManageActions.getAccountDetailRequest.type, handleGetAccountDetail),
    takeLatest(ManageActions.createAccountRequest.type, handleCreateAccount),
    takeLatest(ManageActions.updateAccountRequest.type, handleUpdateAccount),
    takeLatest(ManageActions.deleteAccountRequest.type, handleDeleteAccount),
  ])
}

function* handleGetAllCategory(action) {
  const { callback } = action.payload
  try {
    const api = () =>
      ApiUtil.fetch(ApiConfig.GET_ALL_CATEGORY, { method: "GET" })
    const response = yield call(api)
    const isSuccess = response?.code === 200
    callback && callback(response?.data)
  } catch (error) {
    console.log("error", error)
  }
}

function* handleGetProductByCategory(action) {
  const { params, callback } = action.payload
  try {
    const api = () =>
      ApiUtil.fetch(ApiConfig.GET_PRODUCT_BY_CATEGORY, {
        method: "GET",
        params,
      })
    const response = yield call(api)
    const isSuccess = response?.code === 200
    callback && callback(response?.data)
  } catch (error) {
    console.log("error", error)
  }
}

function* handleGetBrandByCategory(action) {
  const { params, callback } = action.payload
  try {
    const api = () =>
      ApiUtil.fetch(ApiConfig.GET_BRAND_BY_CATEGORY, {
        method: "GET",
        params,
      })
    const response = yield call(api)
    const isSuccess = response?.code === 200
    callback && callback(response?.data)
  } catch (error) {
    console.log("error", error)
  }
}

function* handleGetImageLink(action) {
  const { params, callback } = action.payload
  try {
    const api = () =>
      ApiUtil.fetch(ApiConfig.GET_IMAGE_LINK, {
        method: "GET",
        params,
      })
    const response = yield call(api)
    const isSuccess = response?.code === 200
    callback && callback(response?.data)
  } catch (error) {
    console.log("error", error)
  }
}

function* handleSaveFile(action) {
  const { data, callback } = action.payload
  try {
    const api = () =>
      ApiUtil.fetch(ApiConfig.SAVE_FILE, {
        method: "POST",
        data,
      })
    const response = yield call(api)
    const isSuccess = response?.code === 200
    callback && callback(response?.data)
  } catch (error) {
    console.log("error", error)
  }
}

function* handleCreateProduct(action) {
  const { data, callback } = action.payload
  try {
    const api = () =>
      ApiUtil.fetch(ApiConfig.PRODUCT, {
        method: "POST",
        data,
      })
    const response = yield call(api)
    const isSuccess = response?.code === 200 && response?.message == "Success"
    callback && callback(isSuccess)
  } catch (error) {
    console.log("error", error)
  }
}

function* handleUpdateProduct(action) {
  const { data, callback } = action.payload
  try {
    const api = () =>
      ApiUtil.fetch(ApiConfig.PRODUCT, {
        method: "PUT",
        data,
      })
    const response = yield call(api)
    const isSuccess = response?.code === 200 && response?.message == "Success"
    callback && callback(isSuccess)
  } catch (error) {
    console.log("error", error)
  }
}

function* handleDeleteProduct(action) {
  const { data, callback } = action.payload
  try {
    const api = () =>
      ApiUtil.fetch(ApiConfig.PRODUCT, {
        method: "DELETE",
        data,
      })
    const response = yield call(api)
    const isSuccess = response?.code === 200
    callback && callback(isSuccess)
  } catch (error) {
    console.log("error", error)
  }
}

function* handleGetOrder(action) {
  const { data, callback } = action.payload
  try {
    const api = () =>
      ApiUtil.fetch(ApiConfig.GET_ORDER, {
        method: "POST",
        data,
      })
    const response = yield call(api)
    const isSuccess = response?.code === 200
    callback && callback(response?.data)
  } catch (error) {
    console.log("error", error)
  }
}

function* handleGetOrderDetail(action) {
  const { params, callback } = action.payload
  try {
    const api = () =>
      ApiUtil.fetch(ApiConfig.GET_ORDER_DETAIL, {
        method: "GET",
        params,
      })
    const response = yield call(api)
    const isSuccess = response?.code === 200
    callback && callback(response?.data)
  } catch (error) {
    console.log("error", error)
  }
}

function* handleUpdateOrder(action) {
  const { data, callback } = action.payload
  try {
    const api = () =>
      ApiUtil.fetch(ApiConfig.UPDATE_ORDER, {
        method: "POST",
        data,
      })
    const response = yield call(api)
    const isSuccess = response?.code === 200 && response?.message == "Success"
    callback && callback(isSuccess)
  } catch (error) {
    console.log("error", error)
  }
}

function* handleGetAccountList(action) {
  const { params, callback } = action.payload
  try {
    const api = () =>
      ApiUtil.fetch(ApiConfig.GET_ACCOUNT_LIST, {
        method: "GET",
        params,
      })
    const response = yield call(api)
    const isSuccess = response?.code === 200
    callback && callback(response?.data)
  } catch (error) {
    console.log("error", error)
  }
}

function* handleGetAccountDetail(action) {
  const { username, callback } = action.payload
  try {
    const api = () =>
      ApiUtil.fetch(ApiConfig.GET_ACCOUNT_DETAIL + `/${username}`, {
        method: "GET",
      })
    const response = yield call(api)
    const isSuccess = response?.code === 200
    callback && callback(response?.data)
  } catch (error) {
    console.log("error", error)
  }
}

function* handleCreateAccount(action) {
  const { data, callback } = action.payload
  try {
    const api = () =>
      ApiUtil.fetch(ApiConfig.ACCOUNT, {
        method: "POST",
        data,
      })
    const response = yield call(api)
    const isSuccess = response?.code === 200 && response?.message == "Success"
    callback && callback(isSuccess)
  } catch (error) {
    console.log("error", error)
  }
}

function* handleUpdateAccount(action) {
  const { data, callback } = action.payload
  try {
    const api = () =>
      ApiUtil.fetch(ApiConfig.ACCOUNT, {
        method: "POST",
        data,
      })
    const response = yield call(api)
    const isSuccess = response?.code === 200 && response?.message == "Success"
    callback && callback(isSuccess)
  } catch (error) {
    console.log("error", error)
  }
}

function* handleDeleteAccount(action) {
  const { data, callback } = action.payload
  try {
    const api = () =>
      ApiUtil.fetch(ApiConfig.ACCOUNT, {
        method: "DELETE",
        data,
      })
    const response = yield call(api)
    const isSuccess = response?.code === 200
    callback && callback(isSuccess)
  } catch (error) {
    console.log("error", error)
  }
}
