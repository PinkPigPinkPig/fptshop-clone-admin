import { Box, Divider, TextField, Stack, Button } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { ManageActions } from "ReduxSaga/Manage/ManageRedux"
import { FormControl, Title } from "components"
import { FlexRow, FormLayout } from "components/Layout/Layout"
import { ROUTE_PATH } from "constant/routes.const"
import { isEmpty } from "lodash"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

const UserDetail = () => {
  const [customerId, setCustomerId] = useState("")
  const [userDetail, setUserDetail] = useState({})

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
    if (location?.state) {
      setCustomerId(location?.state?.user?.id || "")
    }
  }, [location])

  useEffect(() => {
    if (customerId) {
      dispatch(
        ManageActions.getUserDetailRequest({
          params: { customerId },
          callback: (res) => {
            if (res) {
              setUserDetail(res)
            }
          },
        })
      )
    }
  }, [customerId])

  useEffect(() => {
    if (!isEmpty(userDetail)) {
      setValue("fullName", userDetail?.fullName || "Vũ Quý Tuấn")
      setValue("dob", userDetail?.dob || "27/06/2000")
      setValue("email", userDetail?.email || "abc@gmail.com")
      setValue("phoneNumber", userDetail?.phoneNumber || "0359623327")
      setValue("address", userDetail?.address || "Hà Nội")
    }
  }, [userDetail])

  return (
    <Box sx={{ backgroundColor: "#fff", padding: 3, borderRadius: 3 }}>
      <Title>{"Thông tin khách hàng"}</Title>
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
                disabled
              />
            </FormControl>
          </Box>
          <Box width={"50%"}>
            <FormControl label="Ngày sinh" required paddingRight="0">
              <DatePicker
                slotProps={{ textField: { size: "small" } }}
                {...register("dob")}
                autoFocus={true}
                placeholder="Nhập mô tả"
                disabled
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
                disabled
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
                disabled
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
                placeholder="Nhập tên đăng nhập"
                disabled
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
            onClick={() => navigate(ROUTE_PATH.MANAGE_USER)}
          >
            Quay lại
          </Button>
        </Stack>
      </FormLayout>
    </Box>
  )
}

export default UserDetail
