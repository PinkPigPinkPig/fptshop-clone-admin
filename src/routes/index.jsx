import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import { localStorageHelper } from "../helpers"
import { CommonLayout } from "../layout/common"
import { commonLayoutRoutesList, routesList } from "./config"
import { ROUTE_PATH } from "constant/routes.const"
import jwtDecode from "jwt-decode"
import { LOCAL_STORE } from "constant/system.const"

function PrivateOutlet() {
  const token = localStorageHelper.getItem(LOCAL_STORE.TOKEN)
  const isTokenExpired = () => {
    try {
      const { exp } = jwtDecode(token)
      const expirationTime = (exp * 1000) - 60000
      return Date.now() > expirationTime
    } catch (error) {
      console.error("Error decoding token:", error)
      return true // Assuming the token is expired if there's an error
    }
  }
  return !isTokenExpired() ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTE_PATH.LOGIN} />
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
                <Route path="" element={element} />
              </Route>
            )
          return <Route key={i} path={path} element={element} />
        }
      )}
      {routesList.map(({ path, component: Component, isProtected }, i) => {
        if (isProtected)
          return (
            <Route path={path} element={<PrivateOutlet />} key={i}>
              <Route path="" element={<Component />} />
            </Route>
          )
        return (
          <Route
            key={i}
            path={path}
            element={
              // <CommonLayout>
              <Component />
              // </CommonLayout>
            }
          />
        )
      })}
    </Routes>
  )
}
