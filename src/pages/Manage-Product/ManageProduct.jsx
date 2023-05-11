import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { ManageActions } from "../../ReduxSaga/Manage/ManageRedux"
import { fakeData } from "./config"
import { Link, useNavigate } from "react-router-dom"
import { ROUTE_PATH } from "../../constant/routes.const"
import { isNil } from "lodash"
import { PRODUCT_FIELD_NAME } from "./create-product/fieldName"
import { moneyConvert } from "utils/Ultilities"

const PFN = PRODUCT_FIELD_NAME

const ManageProduct = () => {
  const dispatch = useDispatch()
  const [category, setCategory] = useState("")
  const [categoryList, setCategoryList] = useState([])
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [deletedId, setDeletedId] = useState()
  const [tableData, setTableData] = useState({
    content: [],
    pageSize: 10,
  })
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0,
  })

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(
      ManageActions.getAllCateRequest({
        callback: (res) => setCategoryList(res),
      })
    )
  }, [])

  useEffect(() => {
    if (category) {
      dispatch(
        ManageActions.getProductByCategoryRequest({
          params: {
            categoryId: category,
          },
          callback: (res) => {
            if (res) {
              setTableData(res)
            }
          },
        })
      )
    }
  }, [category])

  const handleChange = (event) => {
    setCategory(event.target.value)
  }

  const handleClickCreate = () => {
    navigate(ROUTE_PATH.CREATE_PRODUCT, {
      state: {
        isCreate: true,
        categoryId: category,
      },
    })
  }

  const TABLE_COLUMNS = [
    { field: PFN.ID, headerName: "STT", width: 60, sortable: false },
    {
      field: PFN.PRODUCT_NAME,
      headerName: "Tên sản phẩm",
      width: 250,
      sortable: false,
    },
    // { field: "modelSeries", headerName: "Loại sản phẩm" },
    {
      field: PFN.MODEL_SERIES,
      headerName: "Dòng sản phẩm",
      width: 150,
      sortable: false,
    },
    {
      field: PFN.BRAND.ID,
      headerName: "Nhãn hiệu",
      width: 120,
      sortable: false,
      renderCell: (params) => {
        return params?.row?.brand?.brandName
      },
    },
    {
      field: PFN.PRICE,
      headerName: "Giá tiền",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return moneyConvert(params?.value)
      },
    },
    {
      field: PFN.TOTAL_PRODUCT,
      headerName: "Số lượng",
      width: 150,
      sortable: false,
      // renderCell: (params) => {
      //   return (params?.value) + '%'
      // },
    },
    {
      field: PFN.DESCRIPTION,
      headerName: "Mô tả",
      width: 200,
      sortable: false,
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
              to={`/manage-product/update-product/${params?.row?.id}`}
              state={{ product: params?.row, isCreate: false }}
            >
              Edit
            </Link>
            <Link to="#" onClick={() => handleClickDelete(params)}>
              Delete
            </Link>
          </Stack>
        )
      },
    },
  ]

  const handleClickDelete = (params) => {
    if (params?.row?.totalProduct) {
      alert("Không thể xóa vì sản phẩm vẫn tồn tại trong kho")
    } else {
      setDeletedId(params?.row?.id)
      setOpenDeleteModal(true)
    }
  }

  const closeModal = (params) => {
    setOpenDeleteModal(false)
  }

  return (
    <Box sx={{ backgroundColor: "#fff", padding: 3, borderRadius: 3 }}>
      <Stack direction="row" justifyContent="space-between">
        <Box sx={{ width: 200, marginBottom: 10 }}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">
              Chọn loại sản phẩm
            </InputLabel>
            <Select
              labelId="category-select-label"
              value={category}
              label="Select Category"
              onChange={handleChange}
            >
              {categoryList?.map((item, index) => {
                return (
                  <MenuItem key={item?.id} value={item?.id}>
                    {item?.categoryName}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Button
            size="large"
            disabled={!category}
            variant="contained"
            onClick={handleClickCreate}
          >
            Tạo mới
          </Button>
        </Box>
      </Stack>
      <Box>
        <DataGrid
          rows={tableData?.content}
          columns={TABLE_COLUMNS}
          localeText={{
            footerRowSelected: (count) => `Đã chọn ${count} bản ghi`,
            noRowsLabel: "Không có dữ liệu",
          }}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          componentsProps={{
            pagination: {
              labelRowsPerPage: "Số bản ghi mỗi trang",
            },
          }}
          disableColumnFilter
          disableColumnMenu
          disableSelectionOnClick
          keepNonExistentRowsSelected
          autoHeight
          // components={{
          //   NoRowsOverlay: () => (
          //     <Stack height="100%" alignItems="center" justifyContent="center">
          //       {NO_CORRESPONDING_DATA}
          //     </Stack>
          //   ),
          // }}
          // getRowId
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
                    ManageActions.deleteProductRequest({
                      data: {
                        id: deletedId,
                        isDeleted: true,
                      },
                      callback: (isSuccess) => {
                        if (isSuccess) {
                          const arr = tableData.content.filter(
                            (item) => item?.id != deletedId
                          )
                          setTableData({ ...tableData, content: arr })
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

export default ManageProduct

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
