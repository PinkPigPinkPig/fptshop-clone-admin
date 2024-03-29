import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material"
import { Container } from "@mui/system"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ReactComponent as HomepageLogo } from "../../assets/icon/homepage-logo.svg"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import { useDispatch, useSelector } from "react-redux"
import { ROUTE_PATH } from "constant/routes.const"
import { localStorageHelper } from "helpers"
import { LOCAL_STORE } from "constant/system.const"
import logo from "../../assets/icon/logo.png"
import { AuthSelector } from "ReduxSaga/Auth/AuthRedux"
import jwtDecode from "jwt-decode"

const settings = [
  // {
  //   key: "profile",
  //   name: "Thông tin cá nhân",
  //   path: "/profile",
  // },
  {
    key: "Logout",
    name: "Đăng xuất",
  },
]
const Header = () => {
  const [user, setUser] = useState({
    email: "abc@gmail.com",
    username: "abc",
  })

  const token = localStorageHelper.getItem(LOCAL_STORE.TOKEN)

  useEffect(() => {
    if (token) {
      const { email, username } = jwtDecode(token)
      setUser({ username: username, email: email })
    }
  }, [token])

  const navigate = useNavigate()
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const handleSignOut = () => {
    // dispatch(signOut());
    // dispatch(reset());
    navigate(ROUTE_PATH.LOGIN)
    localStorageHelper.removeItem(LOCAL_STORE.TOKEN)
  }
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: ' #2196f3' }} className="header-container">
      <AppBar
        position="static"
        sx={{ backgroundColor: "#2196f3", color: "#FFF", boxShadow: "none" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1 }}>
              <Link to="/">
                <img src={logo} style={{ maxWidth: 200, height: "auto" }} />
              </Link>
            </Box>
            <div>
              <div className="d-flex align-items-center">
                <span>{user?.username}</span>
                <IconButton sx={{ p: 0, marginLeft: "1rem" }}>
                  <Avatar
                    alt={user?.username || "a"}
                    src={user?.username ?? "/static/images/avatar/2.jpg"}
                  />
                </IconButton>
                <IconButton onClick={handleOpenUserMenu}>
                  <ArrowDropDownIcon color="action" />
                </IconButton>
              </div>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings?.map((setting, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      if (setting.key === "Logout") {
                        return handleSignOut()
                      }
                      navigate(setting.path)
                      handleCloseUserMenu()
                    }}
                  >
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}

export default Header
