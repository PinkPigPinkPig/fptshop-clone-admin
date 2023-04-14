import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const manageRedux = createSlice({
    name: 'manageRedux',
    initialState,
    reducers: {
        getAllCateRequest: (state, action) => {},
        getProductByCategoryRequest: (state, action) => {},
    }
})

export const ManageActions = manageRedux.actions

export default manageRedux.reducer