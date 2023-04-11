import React from 'react'
import { ROUTE_PATH } from '../constant/routes.const'

const Home = React.lazy(() => import('../pages/Home/Home'))
const Login = React.lazy(() => import('../pages/Login/Login'))
const ManageProduct = React.lazy(() => import('../pages/Manage-Product'))

export const routesList = [
    {
        component: Login,
        path: ROUTE_PATH.LOGIN,
        isProtected: false,
    },
    {
        component: Login,
        path: ROUTE_PATH.LOGIN,
        isProtected: false,
    },
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
]