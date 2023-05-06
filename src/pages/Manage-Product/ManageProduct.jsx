import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
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
  const [productList, setProductList] = useState(fakeData)

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
            if(res?.content) {
              setProductList(res?.content)
            }
          },
        })
      )
    }
  }, [category])

  console.log("productList", productList)
  console.log({ category })

  const handleChange = (event) => {
    setCategory(event.target.value)
  }

  const handleClickCreate = () => {
    navigate(ROUTE_PATH.CREATE_PRODUCT, {
      state: {
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
    { field: PFN.BRAND.ID, headerName: "Nhãn hiệu", width: 120, sortable: false },
    {
      field: PFN.PRICE,
      headerName: "Price",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return moneyConvert(params?.value)
      },
    },
    {
      field: PFN.SALE_OFF,
      headerName: "Khuyến mãi",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return (params?.value) + '%'
      },
    },
    { field: PFN.DESCRIPTION, headerName: "Mô tả", width: 200, sortable: false },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      fixed: 'right',
      renderCell: (params) => {
        return (
          <Stack direction='row' spacing={2}>
            <Link to='#'>Edit</Link>
            <Link to='#'>Delete</Link>
          </Stack>
        )
      },
    },
  ]

  return (
    <Box sx={{ backgroundColor: "#fff", padding: 3, borderRadius: 3 }}>
      <Stack direction='row' justifyContent='space-between'>
        <Box sx={{ width: 200, marginBottom: 10 }}>
          <FormControl fullWidth>
            <InputLabel id='category-select-label'>Select Category</InputLabel>
            <Select
              labelId='category-select-label'
              value={category}
              label='Select Category'
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
            size='large'
            disabled={!category}
            variant='contained'
            onClick={handleClickCreate}
          >
            Tạo mới
          </Button>
        </Box>
      </Stack>
      <Box>
        <DataGrid
          rows={productList}
          columns={TABLE_COLUMNS}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          // getRowId
        />
      </Box>
    </Box>
  )
}

export default ManageProduct
