import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Tooltip,
} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import React, { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { ManageActions } from "../../ReduxSaga/Manage/ManageRedux"
import { fakeData } from "./config"
import { Link, useNavigate } from "react-router-dom"
import { ROUTE_PATH } from "../../constant/routes.const"
import { isEmpty, isNil } from "lodash"
import { PRODUCT_FIELD_NAME } from "./create-product/fieldName"
import { moneyConvert } from "utils/Ultilities"
import {
  StyledTableCell,
  StyledTableRow,
} from "pages/Manage-Account/ManageAccount"
import { makeStyles } from "@mui/styles"

const PFN = PRODUCT_FIELD_NAME

const sticky = (index) => ({
  position: "sticky",
  right: 0,
  backgroundColor: index % 2 != 0 ? "#fff" : "#eeeeee",
})

const ManageProduct = () => {
  const dispatch = useDispatch()
  const [category, setCategory] = useState("")
  const [categoryList, setCategoryList] = useState([])
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [deletedId, setDeletedId] = useState()
  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState({ content: [], totalElements: 0 })
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [searchParams, setSearchParams] = useState({})

  const handleChangePage = (event, newPage) => {
    const params = { ...searchParams, page: newPage }
    setPage(newPage)
    fetchProductList(params)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
    const params = { ...searchParams, page: 0, size: +event.target.value }
    fetchProductList(params)
  }

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
      fetchProductList({ categoryId: category, size: rowsPerPage })
    }
  }, [category])

  const fetchProductList = (params) => {
    setSearchParams(params)
    dispatch(
      ManageActions.getProductByCategoryRequest({
        params: params,
        callback: (res) => {
          if (res) {
            setTableData(res)
          }
        },
      })
    )
  }

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

  const handleClickDelete = (params) => {
    if (params?.totalProduct) {
      alert("Không thể xóa vì sản phẩm vẫn tồn tại trong kho")
    } else {
      setDeletedId(params?.id)
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell style={{ minWidth: 60 }} width={60}>
                  STT
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: 250 }} width={250}>
                  Tên sản phẩm
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: 150 }} width={150}>
                  Dòng sản phẩm
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: 120 }} width={120}>
                  Nhãn hiệu
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: 150 }} width={150}>
                  Giá tiền
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: 150 }} width={150}>
                  Số lượng
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: 300 }} width={500}>
                  Mô tả
                </StyledTableCell>
                <StyledTableCell sx={sticky(0)}>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isEmpty(tableData?.content) ? (
                <TableRow>
                  <TableCell align="center" colSpan={8}>
                    <Box>
                      <Typography>Không có dữ liệu</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                tableData?.content?.map((row, index) => (
                  <StyledTableRow
                    key={row?.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>{row?.[PFN.PRODUCT_NAME]}</StyledTableCell>
                    <StyledTableCell>{row?.[PFN.MODEL_SERIES]}</StyledTableCell>
                    <StyledTableCell>{row?.brand?.brandName}</StyledTableCell>
                    <StyledTableCell>
                      {moneyConvert(row?.[PFN.PRICE])}
                    </StyledTableCell>
                    <StyledTableCell>
                      {row?.[PFN.TOTAL_PRODUCT]}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Tooltip title={row?.description || "Mô tả sản phẩm"}>
                        <p>
                          {row?.description?.length > 30
                            ? row?.description.substring(0, 30 - 3) + "..."
                            : row?.description}
                        </p>
                      </Tooltip>
                    </StyledTableCell>
                    <StyledTableCell sx={sticky(index)}>
                      <Stack direction="row" spacing={2}>
                        <Link
                          to={`/manage-product/update-product/${row?.id}`}
                          state={{ product: row, isCreate: false }}
                        >
                          Edit
                        </Link>
                        <Link to="#" onClick={() => handleClickDelete(row)}>
                          Delete
                        </Link>
                      </Stack>
                    </StyledTableCell>
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
