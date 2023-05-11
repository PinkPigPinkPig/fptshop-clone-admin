import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const manageRedux = createSlice({
    name: 'manageRedux',
    initialState,
    reducers: {
        getAllCateRequest: (state, action) => {},
        getProductByCategoryRequest: (state, action) => {},
        getBrandByCategoryRequest: (state, action) => {},
        getImageLinkRequest: (state, action) => {},
        saveFileRequest: (state, action) => {},
        createProductRequest: (state, action) => {},
        updateProductRequest: (state, action) => {},
        deleteProductRequest: (state, action) => {},

        getOrderRequest: (state, action) => {},
        getOrderDetailRequest: (state, action) => {},
        updateOrderRequest: (state, action) => {},

        getAccountListRequest: (state, action) => {},
        getAccountDetailRequest: (state, action) => {},
        createAccountRequest: (state, action) => {},
        updateAccountRequest: (state, action) => {},
        deleteAccountRequest: (state, action) => {},

        getUserListRequest: (state, action) => {},
        getUserDetailRequest:(state, action) => {},
    }
})

export const ManageActions = manageRedux.actions

export default manageRedux.reducer