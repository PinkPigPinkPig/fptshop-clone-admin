import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {}
}

const authRedux = createSlice({
    name: 'authRedux',
    initialState,
    reducers: {
        loginRequest: (state, action) => {},
        loginSuccess: (state, action) => {

        },
        loginFailed: (state, action) => {},

        signupRequest: (state, action) => {},
    }
})
export const AuthSelector = state => state.user
export const AuthActions = authRedux.actions

export default authRedux.reducer