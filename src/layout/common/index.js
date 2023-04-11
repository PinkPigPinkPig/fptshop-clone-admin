import React, { useLayoutEffect } from "react"
import SearchIcon from "@mui/icons-material/Search"
import Breadcrumb from "../Breadcrumb"
import { Footer } from "../Footer/Footer"
import Header from "../Header/Header"
import {
  Avatar,
  Box,
  Container,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material"
import List from "@mui/material/List"
import { MenuItem } from "./MenuItem"
//css
import "./layout.scss"
import { FlexCol } from "../../components/Layout/Layout"
import { listSidebarItems } from "../../constant/sidebarItem.const"
import { useLocation, useNavigate } from "react-router-dom"

export const CommonLayout = ({ children }) => {
  const handleSearchMenu = (event) => {
    // dispatch(setListMenu(event.target.value.trim()))
  }
  const { pathname } = useLocation();
  const navigate = useNavigate()
  const user = {}
  const handleClick = (item) => {
    navigate(item?.path)
  }
  return (
    <div className='wrap-layout'>
      <Header />
      <Container maxWidth='xl'>
        <div className='my-2'>
          <Breadcrumb />
        </div>
        {/* <Box className="common-layout-wrapper">{children}</Box> */}
        <Box className='common-layout-wrapper'>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <div className='sidebar'>
                <List
                  sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                    borderRadius: "10px",
                  }}
                  component='nav'
                  aria-labelledby='nested-list-subheader'
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "12px 12px 29.5px",
                      gap: "23.5px",
                    }}
                  >
                    <Box
                      className='account-name'
                      sx={{ display: "flex", gap: "8px" }}
                    >
                      <Avatar
                        alt='profile'
                        src={user.avatarUrl ?? "/static/images/avatar/2.jpg"}
                      />

                      <Box
                        className='name'
                        sx={{ display: "flex", flexDirection: "column" }}
                      >
                        <span>Udemy</span>
                        <span>Admin@udemy.com</span>
                      </Box>
                    </Box>
                    <TextField
                      required
                      placeholder='Tìm kiếm'
                      fullWidth
                      onChange={handleSearchMenu}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <FlexCol sx={{ p: 2, gap: 0.5 }}>
                    {listSidebarItems.map((item) => {
                      return (
                        <MenuItem
                          item={item}
                          key={item.title}
                          onClick={handleClick}
                        />
                      )
                    })}
                  </FlexCol>
                </List>
              </div>
            </Grid>

            <Grid item xs={9}>
              <div className='content'>{children}</div>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </div>
  )
}
