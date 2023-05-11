import React from 'react'
import { ROUTE_PATH } from '../constant/routes.const'

const Home = React.lazy(() => import('../pages/Home/Home'))
const Login = React.lazy(() => import('../pages/Login/Login'))
const SignUp = React.lazy(() => import('../pages/Sign-Up/SignUp'))
const ForgotPassword = React.lazy(() => import('../pages/Forgot-Password/ForgotPassword'))
const ManageProduct = React.lazy(() => import('../pages/Manage-Product'))
const ManageAccount = React.lazy(() => import('../pages/Manage-Account'))
const ManageUser = React.lazy(() => import('../pages/Manage-User'))
const ManageOrder = React.lazy(() => import('../pages/Manage-Order'))
const OrderDetail = React.lazy(() => import('../pages/Manage-Order/OrderDetail'))
const UserDetail = React.lazy(() => import('../pages/Manage-User/UserDetail'))
const ProductForm = React.lazy(() => import('../pages/Manage-Product/create-product'))
const AccountForm = React.lazy(() => import('../pages/Manage-Account/AccountForm'))

export const routesList = [
    {
        component: Login,
        path: ROUTE_PATH.LOGIN,
        isProtected: false,
    },
    {
        component: SignUp,
        path: ROUTE_PATH.SIGN_UP,
        isProtected: false,
    },
    {
        component: ForgotPassword,
        path: ROUTE_PATH.FORGOT_PASSWORD,
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
        component: AccountForm,
        path: ROUTE_PATH.UPDATE_ACCOUNT,
        isProtected: true,
    },
    {
        component: AccountForm,
        path: ROUTE_PATH.CREATE_ACCOUNT,
        isProtected: true,
    },
    {
        component: ManageUser,
        path: ROUTE_PATH.MANAGE_USER,
        isProtected: true,
    },
    {
        component: UserDetail,
        path: ROUTE_PATH.USER_DETAIL,
        isProtected: true,
    },
    {
        component: ManageOrder,
        path: ROUTE_PATH.MANAGE_ORDER,
        isProtected: true,
    },
    {
        component: OrderDetail,
        path: ROUTE_PATH.ORDER_DETAIL,
        isProtected: true,
    },
]