import { Box, Button, Stack } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { ManageActions } from "ReduxSaga/Manage/ManageRedux"
import { ROUTE_PATH } from "constant/routes.const"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

const ManageAccount = () => {
  const [accountList, setAccountList] = useState([])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(
      ManageActions.getAccountListRequest({
        params: {},
        callback: (res) => {
          if (res?.content) {
            console.log({ res })
            setAccountList(res?.content)
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
            <Link to="#" onClick={() => {}}>
              Delete
            </Link>
          </Stack>
        )
      },
    },
  ]

  const handleClickCreate = () => {
    navigate(ROUTE_PATH.CREATE_ACCOUNT, {
      state: {
        isUpdate: false,
      },
    })
  }

  return (
    <Box sx={{ backgroundColor: "#fff", padding: 3, borderRadius: 3 }}>
      <Box sx={{ marginBottom: 3 }}>
        <Button size="large" variant="contained" onClick={handleClickCreate}>
          Tạo mới tài khoản
        </Button>
      </Box>
      <Box>
        <DataGrid
          rows={accountList?.sort((a, b) => a?.id - b?.id)}
          columns={COLUMNS}
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
        />
      </Box>
    </Box>
  )
}

export default ManageAccount
