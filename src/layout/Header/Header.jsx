import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { Container } from "@mui/system"
import React from "react"
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as HomepageLogo } from '../../assets/icon/homepage-logo.svg';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch } from "react-redux";

const settings = [
  {
    key: "profile",
    name: "Thông tin cá nhân",
    path: "/profile",
  },
  {
    key: "Logout",
    name: "Đăng xuất",
  },
]
const Header = () => {
  const user = {}
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSignOut = () => {
    // dispatch(signOut());
    // dispatch(reset());
    navigate('/admin/login');
  };
  return (
    <Box sx={{ flexGrow: 1 }} className='header-container'>
      <AppBar
        position='static'
        sx={{ backgroundColor: "#FFF", color: "#0A033C", boxShadow: "none" }}
      >
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1 }}>
              <Link to='/'>
                <HomepageLogo />
              </Link>
            </Box>
            <div>
              <div className='d-flex align-items-center'>
                <span>{user.username}</span>
                <IconButton sx={{ p: 0, marginLeft: "1rem" }}>
                  <Avatar
                    alt='profile'
                    src={user.avatarUrl ?? "/static/images/avatar/2.jpg"}
                  />
                </IconButton>
                <IconButton onClick={handleOpenUserMenu}>
                  <ArrowDropDownIcon color='action' />
                </IconButton>
              </div>

              <Menu
                sx={{ mt: "45px" }}
                id='menu-appbar'
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
                    <Typography textAlign='center'>{setting.name}</Typography>
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