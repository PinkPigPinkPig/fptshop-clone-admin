import React from 'react'
import { ROUTE_PATH } from '../constant/routes.const'

const Home = React.lazy(() => import('../pages/Home/Home'))
const Login = React.lazy(() => import('../pages/Login/Login'))

export const routesList = [
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
]