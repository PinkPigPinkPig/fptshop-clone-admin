import { Box, Button, Divider, Stack, TextField } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { ManageActions } from "ReduxSaga/Manage/ManageRedux"
import { FormControl, Title } from "components"
import { FlexRow, FormLayout } from "components/Layout/Layout"
import { ROUTE_PATH } from "constant/routes.const"
import dayjs from "dayjs"
import { isEmpty } from "lodash"
import React, { useEffect } from "react"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

const AccountForm = () => {
  const [isUpdate, setIsUpdate] = useState(false)
  const [username, setUsername] = useState("")
  const [accountDetail, setAccountDetail] = useState({})

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const location = useLocation()

  const methods = useForm({
    mode: "onSubmit",
  })

  const {
    register,
    control,
    getValues,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = methods

  useEffect(() => {
    if (location?.state?.isUpdate) {
      setIsUpdate(location?.state?.isUpdate)
      setUsername(location?.state?.account?.username || "admin")
    } else {
      setIsUpdate(location?.state?.isUpdate)
    }
  }, [location])

  useEffect(() => {
    if (isUpdate && username) {
      dispatch(
        ManageActions.getAccountDetailRequest({
          username,
          callback: (res) => {
            if (!isEmpty(res)) {
              setAccountDetail(res)
            }
          },
        })
      )
    }
  }, [username, isUpdate])

  useEffect(() => {
    if (!isEmpty(accountDetail)) {
      setValue("fullName", accountDetail?.fullName || "")
      setValue("dob", dayjs(accountDetail?.dob?.join("/")) || "")
      setValue("email", accountDetail?.email || "")
      setValue("phoneNumber", accountDetail?.phoneNumber || "")
      setValue("username", accountDetail?.username || "")
      setValue("password", accountDetail?.password || "")
      setValue("address", accountDetail?.address || "")
    }
  }, [accountDetail])

  const handleCreateAccount = () => {
    const formValue = getValues()
    dispatch(
      ManageActions.createAccountRequest({
        data: formValue,
        callback: (isSuccess) => {
          if (isSuccess) {
            navigate(ROUTE_PATH.MANAGE_ACCOUNT)
          } else {
            alert("Tạo mới không thành công!")
          }
        },
      })
    )
  }

  const handleUpdateAccount = () => {
    const formValue = getValues()
    const data = {
      username: formValue?.username,
      fullName: formValue?.fullName,
      phoneNumber: formValue?.phoneNumber,
      email: formValue?.email,
      dob: dayjs(formValue?.dob).format("YYYY-MM-DD"),
      address: formValue?.address,
      password: formValue?.password,
    }
    dispatch(
      ManageActions.updateAccountRequest({
        data: data,
        callback: (isSuccess) => {
          if (isSuccess) {
            navigate(ROUTE_PATH.MANAGE_ACCOUNT)
          } else {
            alert("Cập nhật không thành công!")
          }
        },
      })
    )
  }

  return (
    <Box sx={{ backgroundColor: "#fff", padding: 3, borderRadius: 3 }}>
      <Title>{!isUpdate ? "Thêm mới tài khoản" : "Cập nhật tài khoản"}</Title>
      <Divider />
      <FormLayout>
        <FlexRow>
          <Box width={"50%"}>
            <FormControl label="Họ và tên" required paddingLeft="0">
              <TextField
                size="small"
                hiddenLabel
                {...register("fullName")}
                autoFocus={true}
                placeholder="Nhập họ và tên"
              />
            </FormControl>
          </Box>
          <Box width={"50%"}>
            <FormControl label="Ngày sinh" required paddingRight="0">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  control={control}
                  name="dob"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    formState,
                  }) => (
                    <DatePicker
                      format="DD/MM/YYYY"
                      slotProps={{
                        textField: {
                          size: "small",
                          error: !isEmpty(errors?.["dob"]),
                          helperText: errors?.["dob"]?.message,
                        },
                      }}
                      value={value}
                      onChange={onChange}
                      error={!isEmpty(errors?.["dob"])}
                      helperText={errors?.["dob"]?.message}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  )}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
        </FlexRow>
        <FlexRow>
          <Box width={"50%"}>
            <FormControl label="Email" required paddingLeft="0">
              <TextField
                size="small"
                hiddenLabel
                {...register("email")}
                autoFocus={true}
                placeholder="Nhập email"
              />
            </FormControl>
          </Box>
          <Box width={"50%"}>
            <FormControl label="Số điện thoại" required paddingRight="0">
              <TextField
                size="small"
                hiddenLabel
                {...register("phoneNumber")}
                autoFocus={true}
                placeholder="Nhập số điện thoại"
              />
            </FormControl>
          </Box>
        </FlexRow>
        <FlexRow>
          <Box width={"50%"}>
            <FormControl
              label="Tên đăng nhập"
              required
              paddingLeft="0"
              disabled={isUpdate}
            >
              <TextField
                size="small"
                hiddenLabel
                {...register("username")}
                autoFocus={true}
                placeholder="Nhập tên đăng nhập"
                disabled={isUpdate}
              />
            </FormControl>
          </Box>
          <Box width={"50%"}>
            <FormControl label="Mật khẩu" required paddingRight="0" disabled={isUpdate}>
              <TextField
                size="small"
                hiddenLabel
                {...register("password")}
                autoFocus={true}
                placeholder="Nhập mật khẩu"
                disabled={isUpdate}
              />
            </FormControl>
          </Box>
        </FlexRow>
        <FlexRow>
          <Box width={"50%"}>
            <FormControl label="Địa chỉ" required paddingLeft="0">
              <TextField
                size="small"
                hiddenLabel
                {...register("address")}
                autoFocus={true}
                placeholder="Nhập địa chỉ"
              />
            </FormControl>
          </Box>
        </FlexRow>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          marginTop={3}
        >
          <Button
            variant="outlined"
            onClick={() => navigate(ROUTE_PATH.MANAGE_ACCOUNT)}
          >
            Hủy
          </Button>
          {!isUpdate ? (
            <Button variant="contained" onClick={handleCreateAccount}>
              Tạo mới
            </Button>
          ) : (
            <Button variant="contained" onClick={handleUpdateAccount}>
              Cập nhật
            </Button>
          )}
        </Stack>
      </FormLayout>
    </Box>
  )
}

export default AccountForm
