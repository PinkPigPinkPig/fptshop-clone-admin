import { Box, Divider, TextField, Stack, Button } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { ManageActions } from "ReduxSaga/Manage/ManageRedux"
import { FormControl, Title } from "components"
import { FlexRow, FormLayout } from "components/Layout/Layout"
import { ROUTE_PATH } from "constant/routes.const"
import dayjs from "dayjs"
import { isEmpty } from "lodash"
import React, { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
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
      setValue("fullName", userDetail?.fullName || "")
      setValue("dob", dayjs(userDetail?.dob?.join('/'))  || "")
      setValue("email", userDetail?.email || "")
      setValue("phoneNumber", userDetail?.phoneNumber || "")
      setValue("address", userDetail?.address || "")
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
