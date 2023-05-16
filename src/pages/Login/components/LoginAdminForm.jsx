import { Email } from "@mui/icons-material"
import KeyIcon from "@mui/icons-material/Key"
import {
  Box,
  Button,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { ReactComponent as HomepageLogo } from "../../../assets/icon/homepage-logo.svg"
import logo from "../../../assets/icon/logo.png"
import { ROUTE_PATH } from "../../../constant/routes.const"
import { LOCAL_STORE } from "../../../constant/system.const"
import { localStorageHelper } from "../../../helpers"
import { AuthActions } from "../../../ReduxSaga/Auth/AuthRedux"
import '../Login.scss'

const LoginAdminForm = () => {
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    username: "",
    password: "",
  })
  const [isWrong, setIsWrong] =useState(false)

  const disabledLogin = (!values.password || !values.username)

  let navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value.trim() })
  }

  const loginCallback = (isSuccess) => {
    if(isSuccess) {
      setIsWrong(false)
      navigate(ROUTE_PATH.HOME)
    } else {
      setIsWrong(true)
    }
  }

  const handleLogin = () => {
    dispatch(AuthActions.loginRequest({data: values, callback: loginCallback}))
  };

  const onKeyDownEnter = (event) => {
    if (event.key === "Enter") {
      handleLogin()
    }
  }
  return (
    <div className='login'>
      <img src={logo} style={{maxWidth: 250, height: 'auto'}} className='login__cmc-logo' />
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
                <div className="login-form__remember">
                  {isWrong && <Typography color={'red'}>Sai tài khoản hoặc mật khẩu</Typography>}
                </div>
              </div>
              {/* <Stack direction='row' justifyContent='space-between'>
                <Link to={ROUTE_PATH.SIGN_UP}>Đăng ký tài khoản</Link>
                <Link to={ROUTE_PATH.FORGOT_PASSWORD}>Quên mật khẩu</Link>
              </Stack> */}
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

      <p className='copyright'>Copyright @2021 SmartThings. All rights reserved.</p>
    </div>
  )
}

export default LoginAdminForm
