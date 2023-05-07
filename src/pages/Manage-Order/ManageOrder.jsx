import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { ManageActions } from "ReduxSaga/Manage/ManageRedux"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { DataGrid } from "@mui/x-data-grid"
import { ORDER_STATUS_LOV } from "./config"
import { findItemInOptions } from "utils/Ultilities"
import { PAYMENT_METHOD_LOV } from "constant/system.const"
import { useNavigate } from "react-router-dom"

const ManageOrder = () => {
  const [orderList, setOrderList] = useState([])
  const [orderStatus, setOrderStatus] = useState()

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleChange = (event) => {
    setOrderStatus(event.target.value)
  }

  useEffect(() => {
    dispatch(
      ManageActions.getOrderRequest({
        data: {},
        callback: (res) => {
          if (res) {
            setOrderList(res?.content)
          }
        },
      })
    )
  }, [])

  const COLUMNS = [
    {
      field: "index",
      headerName: "STT",
      width: 60,
      sortable: false,
      renderCell: (params) => {
        return params?.id
      },
      align: "center",
      headerAlign: "center",
    },
    {
      field: "recipientName",
      headerName: "Người nhận",
      width: 200,
      sortable: false,
    },
    {
      field: "recipientPhone",
      headerName: "SĐT người nhận",
      width: 150,
      sortable: false,
    },
    {
      field: "recipientAddress",
      headerName: "Địa chỉ người nhận",
      width: 150,
      sortable: false,
    },
    {
      field: "itemQuantity",
      headerName: "Số lượng",
      width: 100,
      sortable: false,
    },
    {
      field: "totalAmount",
      headerName: "Tổng tiền",
      width: 100,
      sortable: false,
    },
    {
      field: "paymentMethod",
      headerName: "Phương thức thanh toán",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        return findItemInOptions(
          params?.row?.paymentMethod,
          PAYMENT_METHOD_LOV,
          "value"
        )?.label
      },
    },
    {
      field: "orderStatus",
      headerName: "Trạng thái",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const status =  findItemInOptions(
          params?.row?.orderStatus,
          ORDER_STATUS_LOV,
          "value"
        )
        return <Button variant="text" color={status?.color}>{status?.label}</Button>
      },
    },
  ]

  return (
    <Box sx={{ backgroundColor: "#fff", padding: 3, borderRadius: 3 }}>
      <Box sx={{ width: 200, marginBottom: 10 }}>
        <FormControl fullWidth>
          <InputLabel id='category-select-label'>Trạng thái</InputLabel>
          <Select
            labelId='category-select-label'
            value={orderStatus}
            label="Select Category"
            onChange={handleChange}
          >
            {ORDER_STATUS_LOV?.map((item, index) => {
              return (
                <MenuItem key={item?.value} value={item?.value}>
                  {item?.label}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <DataGrid
          rows={orderList}
          columns={COLUMNS}
          // localeText={{
          //   footerRowSelected: (count) => `Đã chọn ${count} bản ghi`,
          //   noRowsLabel: "Không có dữ liệu",
          // }}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          componentsProps={{
            pagination: {
              labelRowsPerPage: "Số bản ghi mỗi trang",
            },
          }}
          autoHeight
          disableColumnFilter
          disableColumnMenu
          disableSelectionOnClick
          onRowClick={(params) => {
            navigate(`/manage-order/detail/${params?.row?.id}`, {
              state: { order: params?.row },
            })
          }}
          sx={{
            // disable cell selection style
            ".MuiDataGrid-cell:focus": {
              outline: "none",
            },
            // pointer cursor on ALL rows
            "& .MuiDataGrid-row:hover": {
              cursor: "pointer",
            },
          }}
        />
      </Box>
    </Box>
  )
}

export default ManageOrder
