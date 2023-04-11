import { ROUTE_PATH } from "./routes.const";

export const listSidebarItems = [
    {
        id: 1,
        title: 'Quản lý tài khoản',
        path: ROUTE_PATH.MANAGE_ACCOUNT,
        isOpen: false,
        subItems: []
    },
    {
        id: 2,
        title: 'Quản lý khách hàng',
        path: ROUTE_PATH.MANAGE_USER,
        isOpen: false,
        subItems: []
    },
    {
        id: 3,
        title: 'Quản lý đơn hàng',
        path: ROUTE_PATH.MANAGE_ORDER,
        isOpen: false,
        subItems: []
    },
    {
        id: 4,
        title: 'Quản lý sản phẩm',
        path: ROUTE_PATH.MANAGE_PRODUCT,
        isOpen: false,
        subItems: []
    },
]