import { Box } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { ManageActions } from "ReduxSaga/Manage/ManageRedux"
import { sortBy } from "lodash"
import React, { useEffect } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const ManageUser = () => {
  const [userList, setUserList] = useState([])

  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(
      ManageActions.getUserListRequest({
        data: {},
        callback: (res) => {
          if (res) {
            setUserList(res?.content)
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
        <DataGrid
          rows={sortBy(userList, ["id"])}
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
          onRowClick={(params) => {
            navigate(`/manage-user/detail/${params?.row?.id}`, {
              state: { user: params?.row },
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

export default ManageUser
