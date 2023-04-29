import { Box, Divider, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import {
  FlexAlignCenterJustifySpaceBetween,
  FlexBetween,
  FlexRow,
  FormLayout,
  TextHelper,
} from "../../../components/Layout/Layout"
import { useFieldArray, useForm } from "react-hook-form"
import Title from "../../../components/Title/Title"
import { FormControl, InputSelect } from "../../../components"
import { PRODUCT_FIELD_NAME } from "./fieldName"

const PFN = PRODUCT_FIELD_NAME

const ProductForm = () => {
  const [brandList, setBrandList] = useState([])
  const methods = useForm({
    mode: "onSubmit",
  })
  const {
    register,
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = methods

  const { fields, append, remove } = useFieldArray({
    control,
    name: "requirementCourses",
  })

  return (
    <Box sx={{ backgroundColor: "#fff", padding: 3, borderRadius: 3 }}>
      <Title>Thêm mới sản phẩm</Title>
      <Divider />
      <Typography sx={{ fontSize: 16, fontWeight: "700", marginTop: 3 }}>
        Thông tin chung
      </Typography>
      <FormLayout>
        <FlexRow>
          <Box width={"50%"}>
            <FormControl label="Thương hiệu" required paddingLeft="0">
              <InputSelect
                control={control}
                name={PFN.BRAND.ID}
                label="Chọn thương hiệu"
                errorMes={errors?.[PFN.BRAND.ID]?.message}
              >
                {brandList?.map((item, index) => {
                  return (
                    <MenuItem key={item?.id} value={item?.id}>
                      {item?.brandName}
                    </MenuItem>
                  )
                })}
              </InputSelect>
            </FormControl>
          </Box>
          <Box width={"50%"}>
            <FormControl label="Model Series" required paddingRight="0">
              <InputSelect
                control={control}
                name={PFN.MODEL_SERIES}
                // label="Chọn series"
                errorMes={errors?.[PFN.MODEL_SERIES]?.message}
              >
                {brandList?.map((item, index) => {
                  return (
                    <MenuItem key={item?.id} value={item?.id}>
                      {item?.brandName}
                    </MenuItem>
                  )
                })}
              </InputSelect>
            </FormControl>
          </Box>
        </FlexRow>
        <FlexRow>
          <Box width={"50%"}>
            <FormControl label="Tên sản phẩm" required paddingLeft="0">
              <TextField
                size="small"
                hiddenLabel
                {...register(PFN.PRODUCT_NAME)}
                autoFocus={true}
                placeholder="Nhập tên sản phẩm"
                //   inputProps={{
                //     maxLength: MAX_LENGTH.name
                //   }}
                error={Boolean(errors?.[PFN.PRODUCT_NAME])}
                helperText={errors?.[PFN.PRODUCT_NAME]?.message}
              />
              <TextHelper>
                {(watch(PFN.PRODUCT_NAME)?.length || 0) + "/" + 0}
              </TextHelper>
            </FormControl>
          </Box>
        </FlexRow>
        <Divider />
        <Typography sx={{ fontSize: 16, fontWeight: "700", marginTop: 3 }}>
          Thông số sản phẩm
        </Typography>
        <FlexRow>
          <Box width={"50%"}>
            <FormControl label="Tên sản phẩm" required paddingLeft="0">
              <TextField
                size="small"
                hiddenLabel
                {...register(PFN.PRODUCT_NAME)}
                autoFocus={true}
                placeholder="Nhập tên sản phẩm"
                //   inputProps={{
                //     maxLength: MAX_LENGTH.name
                //   }}
                error={Boolean(errors?.[PFN.PRODUCT_NAME])}
                helperText={errors?.[PFN.PRODUCT_NAME]?.message}
              />
              <TextHelper>
                {(watch(PFN.PRODUCT_NAME)?.length || 0) + "/" + 0}
              </TextHelper>
            </FormControl>
          </Box>
        </FlexRow>
      </FormLayout>
    </Box>
  )
}

export default ProductForm
