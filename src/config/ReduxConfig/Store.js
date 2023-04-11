import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { AnyAction, combineReducers, configureStore, MiddlewareArray } from '@reduxjs/toolkit'
import reduxSaga, { authReducer, rootReducer } from "../../ReduxSaga"
import { manageReducer } from "../../ReduxSaga/Manage"

const sagaMiddleware = createSagaMiddleware()

const reducers = {
    root: rootReducer,
    manage: manageReducer,
    auth: authReducer,
}

const logger = createLogger({
  // ...options
})

const rootsReducer = combineReducers(reducers)

export const store = configureStore({
  reducer: rootsReducer,
  middleware: new MiddlewareArray().concat(sagaMiddleware, logger),
})

sagaMiddleware.run(reduxSaga)


