import {
  Box,
  Button,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { FormControl, InputSelect, Title } from "components"
import { FlexRow, FormLayout } from "components/Layout/Layout"
import { ROUTE_PATH } from "constant/routes.const"
import { PAYMENT_METHOD_LOV } from "constant/system.const"
import { isEmpty } from "lodash"
import React, { useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { ManageActions } from "ReduxSaga/Manage/ManageRedux"
import { ORDER_FIELD_NAME, ORDER_STATUS_LOV } from "./config"

const OFN = ORDER_FIELD_NAME

const OrderDetail = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  const { fields, append, remove } = useFieldArray({
    name: "orderDetails",
    control,
  })

  const [orderDetail, setOrderDetail] = useState({})

  useEffect(() => {
    if (location?.state?.order) {
      dispatch(
        ManageActions.getOrderDetailRequest({
          params: { orderId: location?.state?.order?.id },
          callback: (res) => {
            if (res) {
              console.log({ res })
              setOrderDetail(res)
            }
          },
        })
      )
    }
  }, [location])

  useEffect(() => {
    if (!isEmpty(orderDetail)) {
      setValue("recipientName", orderDetail?.recipientName)
      setValue("recipientPhone", orderDetail?.recipientPhone)
      setValue("recipientAddress", orderDetail?.recipientAddress)
      setValue("itemQuantity", orderDetail?.itemQuantity)
      setValue("totalAmount", orderDetail?.totalAmount)
      setValue("orderStatus", orderDetail?.orderStatus?.toString())
      setValue("paymentMethod", orderDetail?.paymentMethod)
      orderDetail?.orderDetails?.map((item, index) => {
        append({
          productName: item?.productName,
          quantity: item?.quantity,
          totalAmount: item?.totalAmount,
        })
      })
    }
  }, [orderDetail])

  const renderProduct = (field, index) => {
    return (
      <Box key={field?.id}>
        <Typography sx={{ fontSize: 16, fontWeight: "700", marginTop: 3 }}>
          Thông tin sản phẩm {index + 1}
        </Typography>
        <FlexRow>
          <Box width={"50%"}>
            <FormControl label='Sản phẩm' required paddingLeft='0' disabled>
              <TextField
                size='small'
                hiddenLabel
                {...register(`orderDetails.${index}.productName`)}
                disabled
              />
            </FormControl>
          </Box>
          <Box width={"50%"}>
            <FormControl label='Số lượng sản phẩm' required paddingRight='0'>
              <TextField
                size='small'
                hiddenLabel
                {...register(`orderDetails.${index}.quantity`)}
              />
            </FormControl>
          </Box>
        </FlexRow>
        <FlexRow>
          <Box width={"50%"}>
            <FormControl label='Giá tiền' required paddingLeft='0' disabled>
              <TextField
                size='small'
                hiddenLabel
                {...register(`orderDetails.${index}.totalAmount`)}
                disabled
              />
            </FormControl>
          </Box>
        </FlexRow>
        <Divider />
      </Box>
    )
  }

  const handleUpdateOrder = () => {
    const formValue = getValues()
    const data = {
      customerId: orderDetail?.customerId,
      orderId: orderDetail?.customerId,
      orderStatus: formValue?.orderStatus,
    }
    dispatch(
      ManageActions.updateOrderRequest({
        data,
        callback: (isSuccess) => {
            console.log({isSuccess})
            if(isSuccess) {
                navigate(ROUTE_PATH.MANAGE_ORDER)
            } else {
                alert("Cập nhật không thành công!")
            }
        },
      })
    )
  }

  return (
    <Box sx={{ backgroundColor: "#fff", padding: 3, borderRadius: 3 }}>
      <Title>Chi tiết đơn hàng</Title>
      <Divider />
      <FormLayout>
        {fields?.map(renderProduct)}
        <Typography sx={{ fontSize: 16, fontWeight: "700", marginTop: 3 }}>
          Thông tin nhận hàng
        </Typography>
        <FlexRow>
          <Box width={"50%"}>
            <FormControl label='Tên người nhận' required paddingLeft='0'>
              <TextField
                size='small'
                hiddenLabel
                {...register("recipientName")}
              />
            </FormControl>
          </Box>
          <Box width={"50%"}>
            <FormControl label='SĐT người nhận' required paddingRight='0'>
              <TextField
                size='small'
                hiddenLabel
                {...register("recipientPhone")}
              />
            </FormControl>
          </Box>
        </FlexRow>
        <FlexRow>
          <Box width={"50%"}>
            <FormControl label='Địa chỉ người nhận' required paddingLeft='0'>
              <TextField
                size='small'
                hiddenLabel
                {...register("recipientAddress")}
              />
            </FormControl>
          </Box>
        </FlexRow>
        <FlexRow>
          <Box width={"50%"}>
            <FormControl label='Số lượng tổng' required paddingLeft='0'>
              <TextField
                size='small'
                hiddenLabel
                {...register("itemQuantity")}
              />
            </FormControl>
          </Box>
          <Box width={"50%"}>
            <FormControl label='Tổng tiền' required paddingRight='0'>
              <TextField
                size='small'
                hiddenLabel
                {...register("totalAmount")}
              />
            </FormControl>
          </Box>
        </FlexRow>
        <FlexRow>
          <Box width={"50%"}>
            <FormControl
              label='Phương thức thanh toán'
              required
              paddingLeft='0'
            >
              <InputSelect
                control={control}
                name={"paymentMethod"}
                // label='Phương thức thanh toán'
              >
                {PAYMENT_METHOD_LOV?.map((item, index) => {
                  return (
                    <MenuItem key={item?.value} value={item?.value}>
                      {item?.label}
                    </MenuItem>
                  )
                })}
              </InputSelect>
            </FormControl>
          </Box>
          <Box width={"50%"}>
            <FormControl label='Trạng thái' required paddingRight='0'>
              <InputSelect
                control={control}
                name={"orderStatus"}
                // label='Trạng thái'
              >
                {ORDER_STATUS_LOV?.map((item, index) => {
                  return (
                    <MenuItem key={item?.value} value={item?.value}>
                      {item?.label}
                    </MenuItem>
                  )
                })}
              </InputSelect>
            </FormControl>
          </Box>
        </FlexRow>
        <Stack
          direction='row'
          spacing={2}
          justifyContent='flex-end'
          marginTop={3}
        >
          <Button
            variant='outlined'
            onClick={() => navigate(ROUTE_PATH.MANAGE_ORDER)}
          >
            Hủy
          </Button>

          <Button variant='contained' onClick={handleUpdateOrder}>
            Cập nhật
          </Button>
        </Stack>
      </FormLayout>
    </Box>
  )
}

export default OrderDetail
