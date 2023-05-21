import {
  Box,
  Button,
  Stack,
  Modal,
  Typography,
  TablePagination,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
  tableCellClasses,
} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { ManageActions } from "ReduxSaga/Manage/ManageRedux"
import { ROUTE_PATH } from "constant/routes.const"
import { isEmpty, sortBy } from "lodash"
import { useStyles } from "pages/Manage-Product/ManageProduct"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

const ManageAccount = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [username, setUsername] = useState("")
  const [tableData, setTableData] = useState({})
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [searchParams, setSearchParams] = useState({
    content: [],
    totalElements: 0,
  })

  const handleChangePage = (event, newPage) => {
    const params = { ...searchParams, page: newPage }
    setPage(newPage)
    fetchAccountList(params)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
    const params = { ...searchParams, page: 0, size: +event.target.value }
    fetchAccountList(params)
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    fetchAccountList({ size: rowsPerPage })
  }, [])

  const fetchAccountList = (params) => {
    setSearchParams(params)
    dispatch(
      ManageActions.getAccountListRequest({
        params: params,
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
      field: "fullName",
      headerName: "Họ và tên",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return params?.row?.fullName || "Vũ Quý Tuấn"
      },
    },
    {
      field: "dob",
      headerName: "Ngày sinh",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return params?.row?.dob || "27/06/2000"
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        return params?.row?.dob || "acb@gmail.com"
      },
    },
    {
      field: "phoneNumber",
      headerName: "Số điện thoại",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return params?.row?.phoneNumber || "0359623327"
      },
    },
    {
      field: "username",
      headerName: "Tài khoản",
      width: 100,
      sortable: false,
      renderCell: (params) => {
        return params?.row?.username || "admin"
      },
    },
    {
      field: "password",
      headerName: "Mật khẩu",
      width: 100,
      sortable: false,
      renderCell: (params) => {
        return params?.row?.password || "abc@123"
      },
    },
    {
      class: sticky(0),
      field: "action",
      headerName: "Action",
      sortable: false,
      fixed: "right",
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={2}>
            <Link
              to={`/manage-account/update-account/${params?.row?.username}`}
              state={{ account: params?.row, isUpdate: true }}
            >
              Edit
            </Link>
            <Link
              to="#"
              onClick={() => {
                handleClickDelete(params)
              }}
            >
              Delete
            </Link>
          </Stack>
        )
      },
    },
  ]

  const handleClickDelete = (params) => {
    console.log({ params })
    setUsername(params?.username)
    setOpenDeleteModal(true)
  }

  const handleClickCreate = () => {
    navigate(ROUTE_PATH.CREATE_ACCOUNT, {
      state: {
        isUpdate: false,
      },
    })
  }

  const closeModal = (params) => {
    setOpenDeleteModal(false)
  }

  return (
    <Box sx={{ backgroundColor: "#fff", padding: 3, borderRadius: 3 }}>
      <Box sx={{ marginBottom: 3 }}>
        <Button size="large" variant="contained" onClick={handleClickCreate}>
          Tạo mới tài khoản
        </Button>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {isEmpty(tableData?.content) ? (
                  <TableRow>
                    <TableCell align="center" colSpan={COLUMNS.length}>
                      <Box>
                        <Typography>Không có dữ liệu</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  COLUMNS?.map((column) => (
                    <StyledTableCell
                      key={column?.field}
                      style={{ minWidth: column?.width }}
                      sx={column?.class || {}}
                    >
                      {column?.headerName}
                    </StyledTableCell>
                  ))
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.content?.map((row, index) => (
                <StyledTableRow
                  key={row?.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell>{row?.fullName}</StyledTableCell>
                  <StyledTableCell>{row?.dob?.join("-")}</StyledTableCell>
                  <StyledTableCell>{row?.email}</StyledTableCell>
                  <StyledTableCell>{row?.phoneNumber}</StyledTableCell>
                  <StyledTableCell>{row?.username}</StyledTableCell>
                  <StyledTableCell>{row?.password}</StyledTableCell>
                  <StyledTableCell sx={sticky(index)}>
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
                  </StyledTableCell>
                </StyledTableRow>
              ))}
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
      <Modal
        open={openDeleteModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={5} alignItems="center">
            <Typography variant="h6" sx={{ margin: 0 }}>
              {`Bạn có chắc chắn muốn xóa sản phẩm?`}
            </Typography>
            <Stack spacing={2}>
              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={() => {
                  dispatch(
                    ManageActions.deleteAccountRequest({
                      data: {
                        username,
                      },
                      callback: (isSuccess) => {
                        if (isSuccess) {
                          const arr = tableData?.content?.filter(
                            (item) => item?.username != username
                          )
                          const data = { ...tableData, content: arr }
                          setTableData(data)
                        }
                        closeModal()
                      },
                    })
                  )
                }}
              >
                Có
              </Button>
              <Button variant="contained" fullWidth onClick={closeModal}>
                Không
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </Box>
  )
}

export default ManageAccount

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#FFF",
  boxShadow: 24,
  p: 4,
}

const sticky = (index) => ({
  position: "sticky",
  right: 0,
  backgroundColor: index % 2 != 0 ? "#fff" : "#eeeeee",
})

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    overflow: "hidden",
  },
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}))
