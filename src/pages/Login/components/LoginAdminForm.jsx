import { Email } from "@mui/icons-material"
import KeyIcon from "@mui/icons-material/Key"
import {
  Box,
  Button,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ReactComponent as HomepageLogo } from "../../../assets/icon/homepage-logo.svg"
import { ROUTE_PATH } from "../../../constant/routes.const"
import { LOCAL_STORE } from "../../../constant/system.const"
import { localStorageHelper } from "../../../helpers"
import '../Login.scss'

const LoginAdminForm = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  })

  const disabledLogin = (!values.password || !values.username) && false

  let navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value.trim() })
  }

  const handleLogin = () => {
    localStorageHelper.setItem(LOCAL_STORE.TOKEN, {token: 'string'})
    navigate(ROUTE_PATH.HOME)
  }

  const onKeyDownEnter = (event) => {
    if (event.key === "Enter") {
      handleLogin()
    }
  }
  return (
    <div className='login'>
      <HomepageLogo className='login__cmc-logo' />
      <div className='login-form-container'>
        <div className='align-center'>
          <h2 className='login-form__header'>Đăng nhập</h2>

          <div>
            <div className='login-form'>
              <div className='login-inputs'>
                <Box
                  component='form'
                  sx={{
                    "& .MuiTextField-root": { marginBottom: 2 },
                    width: "100%",
                  }}
                  noValidate
                  autoComplete='off'
                >
                  <InputLabel className='login-form__label'>
                    Tài khoản
                  </InputLabel>
                  <TextField
                    onKeyDown={onKeyDownEnter}
                    required
                    value={values.username}
                    onChange={handleChange("username")}
                    id='outlined-required'
                    placeholder='Nhập tài khoản LDAP'
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <InputLabel className='login-form__label'>
                    Mật khẩu
                  </InputLabel>
                  <TextField
                    onKeyDown={onKeyDownEnter}
                    id='outlined-password-input'
                    value={values.password}
                    type='password'
                    onChange={handleChange("password")}
                    autoComplete='current-password'
                    placeholder='Mật khẩu'
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <KeyIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                {/* <div className="login-form__remember">
                  <FormControlLabel
                    control={<Checkbox onChange={onChangeRememberMe} value={rememberMe} />}
                    label="Duy trì đăng nhập"
                  />
                </div> */}
              </div>
              <Button
                onClick={handleLogin}
                variant='contained'
                disabled={disabledLogin}
                disableElevation
                sx={{
                  backgroundColor: "#1FBDF8",
                  color: "#fff",
                  gap: "32px",
                  width: "100%",
                  padding: "14px 0px",
                  mt: 4,
                }}
              >
                Đăng nhập
              </Button>
            </div>

            {/* <a href="/" className="login-form__forgot">
              Quên mật khẩu ?
            </a> */}
          </div>
        </div>
      </div>

      <p className='copyright'>Copyright @2021 Udemy. All rights reserved.</p>
    </div>
  )
}

export default LoginAdminForm
