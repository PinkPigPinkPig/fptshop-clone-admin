import { Box, Button, Divider, Stack, TextField } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { ManageActions } from "ReduxSaga/Manage/ManageRedux"
import { FormControl, Title } from "components"
import { FlexRow, FormLayout } from "components/Layout/Layout"
import { ROUTE_PATH } from "constant/routes.const"
import { isEmpty } from "lodash"
import React, { useEffect } from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
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
      setValue("fullName", accountDetail?.fullName || "Vũ Quý Tuấn")
      setValue("dob", accountDetail?.dob || "27/06/2000")
      setValue("email", accountDetail?.email || "abc@gmail.com")
      setValue("phoneNumber", accountDetail?.phoneNumber || "0359623327")
      setValue("username", accountDetail?.username || "admin")
      setValue("password", accountDetail?.password || "abc@123")
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
      dob: formValue?.dob,
      address: formValue?.address || 'a',
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
              <DatePicker
                slotProps={{ textField: { size: "small" } }}
                // {...register("dob")}
                autoFocus={true}
                placeholder="Nhập mô tả"
              />
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
            <FormControl label="Tên đăng nhập" required paddingLeft="0">
              <TextField
                size="small"
                hiddenLabel
                {...register("username")}
                autoFocus={true}
                placeholder="Nhập tên đăng nhập"
              />
            </FormControl>
          </Box>
          <Box width={"50%"}>
            <FormControl label="Mật khẩu" required paddingRight="0">
              <TextField
                size="small"
                hiddenLabel
                {...register("password")}
                autoFocus={true}
                placeholder="Nhập mật khẩu"
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
