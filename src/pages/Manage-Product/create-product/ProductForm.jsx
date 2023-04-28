import { Box, TextField } from "@mui/material"
import React from "react"
import {
  FlexRow,
  FormLayout,
  TextHelper,
} from "../../../components/Layout/Layout"
import { useFieldArray, useForm } from "react-hook-form"
import Title from "../../../components/Title/Title"
import { FormControl } from "../../../components"


const ProductForm = () => {
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
      <FormLayout>
        <FlexRow>
          <Box width={"50%"}>
            <FormControl label='Tên khóa học' required paddingLeft='0'>
              <TextField
                size="small"
                hiddenLabel
                {...register("name")}
                autoFocus={true}
                placeholder='Nhập tên sản phẩm'
                //   inputProps={{
                //     maxLength: MAX_LENGTH.name
                //   }}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
              />
              <TextHelper>{(watch("name")?.length || 0) + "/" + 0}</TextHelper>
            </FormControl>
          </Box>
        </FlexRow>
      </FormLayout>
    </Box>
  )
}

export default ProductForm
