import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { ManageActions } from "ReduxSaga/Manage/ManageRedux"
import { isEmpty, sortBy } from "lodash"
import { StyledTableCell, StyledTableRow } from "pages/Manage-Account/ManageAccount"
import React, { useEffect } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const ManageUser = () => {
  const [tableData, setTableData] = useState({ content: [], totalElements: 0 })
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [searchParams, setSearchParams] = useState({})

  const handleChangePage = (event, newPage) => {
    const params = { ...searchParams, page: newPage }
    setPage(newPage)
    fetchUserList(params)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
    const params = { ...searchParams, page: 0, pageSize: +event.target.value }
    fetchUserList(params)
  }

  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    fetchUserList({ pageSize: rowsPerPage })
  }, [])

  const fetchUserList = (params) => {
    setSearchParams(params)
    dispatch(
      ManageActions.getUserListRequest({
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
      width: 200,
      sortable: false,
      renderCell: (params) => {
        return params?.row?.fullName || "Vũ Quý Tuấn"
      },
    },
    {
      field: "dob",
      headerName: "Ngày sinh",
      width: 200,
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
      width: 200,
      sortable: false,
      renderCell: (params) => {
        return params?.row?.phoneNumber || "0359623327"
      },
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        return params?.row?.address || "Hà Nội"
      },
    },
  ]

  return (
    <Box sx={{ backgroundColor: "#fff", padding: 3, borderRadius: 3 }}>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {COLUMNS?.map((column) => (
                  <StyledTableCell
                    key={column?.field}
                    style={{ minWidth: column?.width }}
                  >
                    {column?.headerName}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isEmpty(tableData?.content) ? (
                <TableRow>
                  <TableCell align="center" colSpan={COLUMNS.length}>
                    <Box>
                      <Typography>Không có dữ liệu</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                tableData?.content?.map((row, index) => (
                  <StyledTableRow
                    key={row?.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#def6fa" },
                    }}
                    onClick={() =>
                      navigate(`/manage-user/detail/${row?.id}`, {
                        state: { user: row },
                      })
                    }
                  >
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>{row?.fullName}</StyledTableCell>
                    <StyledTableCell>{row?.dob?.join('-')}</StyledTableCell>
                    <StyledTableCell>{row?.email}</StyledTableCell>
                    <StyledTableCell>{row?.phoneNumber}</StyledTableCell>
                    <StyledTableCell>{row?.address}</StyledTableCell>
                  </StyledTableRow>
                ))
              )}
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

export default ManageUser
