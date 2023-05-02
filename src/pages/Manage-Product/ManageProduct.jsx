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
import { fakeData, TABLE_COLUMNS } from "./config"
import { useNavigate } from "react-router-dom"
import { ROUTE_PATH } from "../../constant/routes.const"
import { isNil } from "lodash"

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
          callback: (res) => setProductList(res?.content),
        })
      )
    }
  }, [category])

  console.log("productList", productList)
  console.log({category})

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
              {categoryList.map((item, index) => {
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
