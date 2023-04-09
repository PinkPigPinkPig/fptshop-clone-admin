import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import { localStorageHelper } from "../helpers"
import { CommonLayout } from "../layout/common"
import { commonLayoutRoutesList, routesList } from "./config"

function PrivateOutlet() {
  return localStorageHelper.isLogin() ? (
    <Outlet />
  ) : (
    <Navigate to='/admin/login' />
  )
}
export const AppRoutes = () => {
  return (
    <Routes>
      {commonLayoutRoutesList.map(
        ({ path, component: Component, isProtected }, i) => {
          const element = (
            <CommonLayout>
              <Component />
            </CommonLayout>
          )
          if (isProtected)
            return (
              <Route path={path} element={<PrivateOutlet />} key={i}>
                <Route path='' element={element} />
              </Route>
            )
          return <Route key={i} path={path} element={element} />
        }
      )}
      {routesList.map(({ path, component: Component, isProtected }, i) => {
        if (isProtected)
          return (
            <Route path={path} element={<PrivateOutlet />} key={i}>
              <Route path='' element={<Component />} />
            </Route>
          )
        return <Route key={i} path={path} element={<Component />} />
      })}
    </Routes>
  )
}
