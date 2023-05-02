import React from 'react'
import { ROUTE_PATH } from '../constant/routes.const'

const Home = React.lazy(() => import('../pages/Home/Home'))
const Login = React.lazy(() => import('../pages/Login/Login'))
const ManageProduct = React.lazy(() => import('../pages/Manage-Product'))
const ManageAccount = React.lazy(() => import('../pages/Manage-Account'))
const ManageUser = React.lazy(() => import('../pages/Manage-User'))
const ManageOrder = React.lazy(() => import('../pages/Manage-Order'))
const ProductForm = React.lazy(() => import('../pages/Manage-Product/create-product'))

export const routesList = [
    {
        component: Login,
        path: ROUTE_PATH.LOGIN,
        isProtected: false,
    },
    // {
    //     component: Login,
    //     path: ROUTE_PATH.LOGIN,
    //     isProtected: false,
    // },
    // {
    //     component: ManageProduct,
    //     path: ROUTE_PATH.MANAGE_PRODUCT,
    //     isProtected: false,
    // },
    // {
    //     component: ProductForm,
    //     path: ROUTE_PATH.CREATE_PRODUCT,
    //     isProtected: false,
    // },
    // {
    //     component: ProductForm,
    //     path: ROUTE_PATH.UPDATE_PRODUCT,
    //     isProtected: false,
    // },
]

export const commonLayoutRoutesList = [
    {
        component: Home,
        path: ROUTE_PATH.HOME,
        isProtected: true,
    },
    {
        component: ManageProduct,
        path: ROUTE_PATH.MANAGE_PRODUCT,
        isProtected: true,
    },
    {
        component: ProductForm,
        path: ROUTE_PATH.UPDATE_PRODUCT,
        isProtected: true,
    },
    {
        component: ProductForm,
        path: ROUTE_PATH.CREATE_PRODUCT,
        isProtected: true,
    },
    {
        component: ManageAccount,
        path: ROUTE_PATH.MANAGE_ACCOUNT,
        isProtected: true,
    },
    {
        component: ManageUser,
        path: ROUTE_PATH.MANAGE_USER,
        isProtected: true,
    },
    {
        component: ManageOrder,
        path: ROUTE_PATH.MANAGE_ORDER,
        isProtected: true,
    },
]