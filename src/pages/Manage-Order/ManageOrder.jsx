import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material"
import { ManageActions } from "ReduxSaga/Manage/ManageRedux"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { DataGrid } from "@mui/x-data-grid"
import { ORDER_STATUS_LOV } from "./config"
import { findItemInOptions } from "utils/Ultilities"
import { PAYMENT_METHOD_LOV } from "constant/system.const"
import { useNavigate } from "react-router-dom"

const ManageOrder = () => {
  const [orderStatus, setOrderStatus] = useState()
  const [tableData, setTableData] = useState({})
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [searchParams, setSearchParams] = useState({})

  const handleChangePage = (event, newPage) => {
    const params = {
      ...searchParams,
      pageable: { page: newPage },
    }
    setPage(newPage)
    fetchOrderList(params)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
    const params = {
      ...searchParams,
      pageable: { size: +event.target.value, page: 0 },
    }
    fetchOrderList(params)
  }

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleChange = (event) => {
    setOrderStatus(event.target.value)
  }

  useEffect(() => {
    fetchOrderList({ pageable: { size: rowsPerPage }, request: {} })
  }, [])

  useEffect(() => {
    fetchOrderList({
      pageable: { size: rowsPerPage },
      request: { orderStatus: orderStatus },
    })
  }, [orderStatus])

  const fetchOrderList = (params) => {
    setSearchParams(params)
    dispatch(
      ManageActions.getOrderRequest({
        data: params,
        callback: (res) => {
          if (res) {
            setTableData(res)
          }
        },
      })
    )
  }

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
        const status = findItemInOptions(
          params?.row?.orderStatus,
          ORDER_STATUS_LOV,
          "value"
        )
        return (
          <Button variant="text" color={status?.color}>
            {status?.label}
          </Button>
        )
      },
    },
  ]

  return (
    <Box sx={{ backgroundColor: "#fff", padding: 3, borderRadius: 3 }}>
      <Box sx={{ width: 200, marginBottom: 10 }}>
        <FormControl fullWidth>
          <InputLabel id="category-select-label">Trạng thái</InputLabel>
          <Select
            labelId="category-select-label"
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {COLUMNS?.map((column) => (
                  <TableCell
                    key={column?.field}
                    style={{ minWidth: column?.width }}
                  >
                    {column?.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.content?.map((row, index) => {
                const status = findItemInOptions(
                  row?.orderStatus,
                  ORDER_STATUS_LOV,
                  "value"
                )
                return (
                  <TableRow
                    key={row?.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#def6fa" },
                    }}
                    onClick={() =>
                      navigate(`/manage-order/detail/${row?.id}`, {
                        state: { order: row },
                      })
                    }
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row?.recipientName}</TableCell>
                    <TableCell>{row?.recipientPhone}</TableCell>
                    <TableCell>{row?.recipientAddress}</TableCell>
                    <TableCell>{row?.itemQuantity}</TableCell>
                    <TableCell>{row?.totalAmount}</TableCell>
                    <TableCell>{row?.paymentMethod}</TableCell>
                    <TableCell>
                      <Button variant="text" color={status?.color}>
                        {status?.label}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2}>
                        <Link
                          to={`/manage-account/update-account/${row?.username}`}
                          state={{ account: row, isUpdate: true }}
                        >
                          Edit
                        </Link>
                        <Link
                          to="#"
                          onClick={() => {
                            handleClickDelete(row)
                          }}
                        >
                          Delete
                        </Link>
                      </Stack>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 20]}
          component="div"
          count={tableData?.totalElements}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  )
}

export default ManageOrder
