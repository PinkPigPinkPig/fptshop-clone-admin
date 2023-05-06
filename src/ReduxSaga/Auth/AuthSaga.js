import { all, call, takeLatest } from "redux-saga/effects";
import ApiConfig from "../../config/ApiConfig";
import { LOCAL_STORE } from "../../constant/system.const";
import { localStorageHelper } from "../../helpers";
import ApiUtil from "../../utils/ApiUtil";
import { AuthActions } from "./AuthRedux";



export function* watchAuthSaga() {
    yield all([
        takeLatest(AuthActions.loginRequest.type, handleLogin),
        takeLatest(AuthActions.signupRequest.type, handleSignup),
    ])
}

function* handleLogin(action) {
    const { data, callback } = action.payload
    try {
        const api = () => ApiUtil.fetch(ApiConfig.LOGIN, {
            method: 'POST',
            data,
        })
        const response = yield call(api)
        console.log('response', response)
        const isSuccess = response?.code === 200 && response?.message
        if(isSuccess) {
            localStorageHelper.setItem(LOCAL_STORE.TOKEN, response?.data?.accessToken)
        }
        callback(isSuccess)
    } catch (error) {
        console.log('error', error)
    }
}

function* handleSignup(action) {
    const { data, callback } = action.payload
    try {
        const api = () => ApiUtil.fetch(ApiConfig.SIGN_UP, {
            method: 'POST',
            data,
        })
        const response = yield call(api)
        console.log('response', response)
        const isSuccess = response?.code === 200 && response?.message
        if(isSuccess) {
            // localStorageHelper.setItem(LOCAL_STORE.TOKEN, response?.data?.accessToken)
        }
        callback(isSuccess)
    } catch (error) {
        console.log('error', error)
    }
}