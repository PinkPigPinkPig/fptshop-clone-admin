import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const authRedux = createSlice({
    name: 'authRedux',
    initialState,
    reducers: {
        loginRequest: (state, action) => {},
        loginSuccess: (state, action) => {},
        loginFailed: (state, action) => {},

        signupRequest: (state, action) => {},
    }
})

export const AuthActions = authRedux.actions

export default authRedux.reducer