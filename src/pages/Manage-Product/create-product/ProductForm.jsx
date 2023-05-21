import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import React, { useEffect, useRef, useState } from "react"
import MenuItem from "@mui/material/MenuItem"
import {
  FlexAlignCenterJustifySpaceBetween,
  FlexBetween,
  FlexRow,
  FormLayout,
  TextHelper,
} from "../../../components/Layout/Layout"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import Title from "../../../components/Title/Title"
import { FormControl, InputSelect, InputUpload } from "../../../components"
import { PRODUCT_FIELD_NAME } from "./fieldName"
import {
  CORE_LOV,
  CPU_CLOCK_LOV,
  CPU_LOV,
  RAM_LOV,
  RESOLUTION_LOV,
  ROM_LOV,
  SCREEN_SIZE_LOV,
  SCREEN_TECH_LOV,
} from "../config"
import { IMAGE_ACCEPT, MAX_SIZE_IMAGE } from "constant/system.const"
import { toast } from "react-toastify"
import { useLocation, useNavigate } from "react-router-dom"
import { ROUTE_PATH } from "constant/routes.const"
import { useDispatch } from "react-redux"
import { ManageActions } from "ReduxSaga/Manage/ManageRedux"
import { uploadRequest } from "utils/ApiUtil"
import { array } from "yup"
import { mapCreateData } from "utils/Ultilities"
import { CleaningServices } from "@mui/icons-material"
import { isEmpty } from "lodash"
import { InputUploadMultiple } from "components/InputUpload/InputUploadMultiple"

const PFN = PRODUCT_FIELD_NAME

const ProductForm = () => {
  const [categoryId, setCategoryId] = useState()
  const [productId, setProductId] = useState()
  const [isUpdate, setIsUpdate] = useState(false)
  const [brandList, setBrandList] = useState([])
  const [modelList, setModelList] = useState([])
  const [image, setImage] = useState([])
  const [thumbnail, setThumbnail] = useState("")
  const [isCreate, setIsCreate] = useState(false)
  const dispatch = useDispatch()
  const methods = useForm({
    mode: "onSubmit",
  })
  const {
    register,
    control,
    getValues,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = methods

  const fileListRef = useRef({})

  const navigate = useNavigate()

  const location = useLocation()

  useEffect(() => {
    if (location?.state?.isCreate) {
      setIsCreate(location?.state?.isCreate)
      setCategoryId(location?.state?.categoryId)
    } else {
      setIsCreate(location?.state?.isCreate)
      setCategoryId(location?.state?.product?.category?.id)
      setProductId(location?.state?.product?.id)
      const product = location?.state?.product
      const specification = location?.state?.product?.specification
      setValue(PFN.BRAND.ID, product?.brand?.id)
      setValue(PFN.MODEL_SERIES, product?.[PFN.MODEL_SERIES])
      setValue(PFN.PRODUCT_NAME, product?.[PFN.PRODUCT_NAME])
      setValue(PFN.PRODUCT_CODE, product?.[PFN.PRODUCT_CODE])
      setValue(PFN.DESCRIPTION, product?.[PFN.DESCRIPTION])
      setValue(PFN.PRICE, product?.[PFN.PRICE])
      setValue(PFN.TOTAL_PRODUCT, product?.[PFN.TOTAL_PRODUCT])
      setValue(
        PFN.IMAGES,
        product?.images?.map((item) => {
          return { name: item?.imageName }
        })
      )
      setValue(PFN.THUMBNAIL, product?.thumbnail?.imageName)
      setValue(PFN.SPECIFICATION.CPU, specification?.[PFN.SPECIFICATION.CPU])
      setValue(PFN.SPECIFICATION.CORE, specification?.[PFN.SPECIFICATION.CORE])
      setValue(
        PFN.SPECIFICATION.CPU_CLOCK,
        specification?.[PFN.SPECIFICATION.CPU_CLOCK]
      )
      setValue(PFN.SPECIFICATION.RAM, specification?.[PFN.SPECIFICATION.RAM])
      setValue(PFN.SPECIFICATION.ROM, specification?.[PFN.SPECIFICATION.ROM])
      setValue(
        PFN.SPECIFICATION.SCREEN_SIZE,
        specification?.[PFN.SPECIFICATION.SCREEN_SIZE]
      )
      setValue(
        PFN.SPECIFICATION.SCREEN_TECH,
        specification?.[PFN.SPECIFICATION.SCREEN_TECH]
      )
      setValue(
        PFN.SPECIFICATION.RESOLUTION,
        specification?.[PFN.SPECIFICATION.RESOLUTION]
      )

      setThumbnail(product?.thumbnail)
      setImage(product?.images)
    }
  }, [location, brandList])

  console.log({ thumbnail, image })

  useEffect(() => {
    if (categoryId) {
      setValue(PFN.CATEGORY.ID, categoryId)
      dispatch(
        ManageActions.getBrandByCategoryRequest({
          params: {
            categoryId: categoryId,
          },
          callback: (res) => {
            // console.log({res})
            if (res) {
              setBrandList(res)
            }
          },
        })
      )
    }
  }, [categoryId])

  useEffect(() => {
    const id = getValues()?.[PFN.BRAND.ID]
    brandList?.forEach((item) => {
      if (item?.id == id) {
        if (item?.modelSeries) {
          setModelList(item?.modelSeries)
        }
      }
    })
  }, [watch(PFN.BRAND.ID)])

  const onChangeFileDetail = async (field, file, cb) => {
    console.log({ file })
    cb(file)
    if (!isEmpty(file)) {
      if (file?.length < image?.length) {
        let idx = 0
        image?.forEach((img, index) => {
          if (file?.every((item) => item?.name != img?.imageName)) {
            idx = index
          }
        })
        const newImage = [...image]
        newImage.splice(idx, 1)
        setImage(newImage)
        return
      }
      file?.forEach((item, index) => {
        if (image?.every((img) => img?.imageName != file?.name)) {
          dispatch(
            ManageActions.getImageLinkRequest({
              params: {
                numberLink: 1,
              },
              callback: async (res) => {
                const urlObject = res?.[0]
                const blob = new Blob([item], { type: item?.type })
                if (urlObject?.urlUpload && urlObject?.urlFile) {
                  setImage([
                    ...image,
                    {
                      imageName: item.name,
                      imageLink: urlObject?.urlFile,
                      fileType: 2,
                      productId: null,
                    },
                  ])
                  uploadRequest.fetch(
                    urlObject?.urlUpload,
                    {
                      data: blob,
                    },
                    item?.type
                  )
                }
              },
            })
          )
        }
      })
    } else {
      setImage([])
    }
  }

  const onChangeFileThumbnail = (field, file, cb) => {
    fileListRef.current[field] = file
    cb(file?.name)
    if (file) {
      dispatch(
        ManageActions.getImageLinkRequest({
          params: {
            numberLink: 1,
          },
          callback: async (res) => {
            const urlObject = res?.[0]
            const blob = new Blob([file], { type: file?.type })
            if (urlObject?.urlUpload && urlObject?.urlFile) {
              setThumbnail({
                imageLink: urlObject?.urlFile,
                imageName: file?.name,
              })
              uploadRequest.fetch(
                urlObject?.urlUpload,
                {
                  data: blob,
                },
                file?.type
              )
            }
          },
        })
      )
    } else {
      setThumbnail(null)
    }
  }

  const handleCreateNewProduct = () => {
    const formValue = getValues()
    const data = mapCreateData(formValue, thumbnail, image)
    console.log({ data })
    dispatch(
      ManageActions.createProductRequest({
        data,
        callback: (isSuccess) => {
          if (isSuccess) {
            navigate(ROUTE_PATH.MANAGE_PRODUCT)
            reset()
          } else {
            alert("Tạo mới không thành công!")
          }
        },
      })
    )
  }

  const handleUpdateProduct = () => {
    const formValue = getValues()
    const data = mapCreateData(formValue, thumbnail, image)
    console.log({ data })
    dispatch(
      ManageActions.updateProductRequest({
        data: { ...data, id: productId },
        callback: (isSuccess) => {
          if (isSuccess) {
            navigate(ROUTE_PATH.MANAGE_PRODUCT)
            reset()
          } else {
            alert("Cập nhật không thành công!")
          }
        },
      })
    )
  }

  return (
    <Box sx={{ backgroundColor: "#fff", padding: 3, borderRadius: 3 }}>
      <Title>{isCreate ? "Thêm mới sản phẩm" : "Cập nhật sản phẩm"}</Title>
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
              <TextField
                size="small"
                hiddenLabel
                {...register(PFN.MODEL_SERIES)}
                placeholder="Nhập tên model"
              />
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
              />
            </FormControl>
          </Box>
          <Box width={"50%"}>
            <FormControl label="Số lượng" required paddingRight="0">
              <TextField
                size="small"
                hiddenLabel
                {...register(PFN.TOTAL_PRODUCT)}
                autoFocus={true}
                placeholder="Nhập số lượng sản phẩm"
                //   inputProps={{
                //     maxLength: MAX_LENGTH.name
                //   }}
                // error={Boolean(errors?.[PFN.PRODUCT_NAME])}
                // helperText={errors?.[PFN.PRODUCT_NAME]?.message}
              />
              {/* <TextHelper>
                {(watch(PFN.PRODUCT_NAME)?.length || 0) + "/" + 0}
              </TextHelper> */}
            </FormControl>
          </Box>
        </FlexRow>
        <FlexRow>
          <Box width={"50%"}>
            <FormControl label="Giá sản phẩm" required paddingLeft="0">
              <TextField
                size="small"
                hiddenLabel
                {...register(PFN.PRICE)}
                autoFocus={true}
                placeholder="Nhập giá sản phẩm"

                //   inputProps={{
                //     maxLength: MAX_LENGTH.name
                //   }}
                // error={Boolean(errors?.[PFN.PRODUCT_NAME])}
                // helperText={errors?.[PFN.PRODUCT_NAME]?.message}
              />
              {/* <TextHelper>
                {(watch(PFN.PRODUCT_NAME)?.length || 0) + "/" + 0}
              </TextHelper> */}
            </FormControl>
          </Box>
        </FlexRow>
        <FlexRow>
          <Box width={"100%"}>
            <FormControl
              label="Mô tả sản phẩm"
              required
              paddingLeft="0"
              paddingRight="0"
            >
              <TextField
                size="small"
                hiddenLabel
                {...register(PFN.DESCRIPTION)}
                autoFocus={true}
                placeholder="Nhập mô tả"
                multiline
                rows={4}
              />
              <TextHelper>
                {(watch(PFN.DESCRIPTION)?.length || 0) + " ký tự"}
              </TextHelper>
            </FormControl>
          </Box>
        </FlexRow>
        <FlexRow>
          <Box width={"100%"}>
            <FormControl
              label="Tải ảnh"
              required
              paddingLeft="0"
              paddingRight="0"
            >
              <Controller
                name={PFN.THUMBNAIL}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <InputUpload
                    placeholder="Tải ảnh sản phẩm"
                    value={value}
                    // disabled={watchType !== COURSE_TYPE.OFFER}
                    onChange={(file) =>
                      onChangeFileThumbnail(PFN.THUMBNAIL, file, onChange)
                    }
                    // maxSize={MAX_SIZE_IMAGE}
                    // accept={IMAGE_ACCEPT}
                  />
                )}
              />
            </FormControl>
          </Box>
        </FlexRow>
        <FlexRow>
          <Box width={"100%"}>
            <FormControl
              label="Tải ảnh chi tiết"
              required
              paddingLeft="0"
              paddingRight="0"
            >
              <Controller
                name={PFN.IMAGES}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <InputUpload
                    placeholder="Tải ảnh"
                    value={value}
                    multiple={true}
                    onChange={(file) =>
                      onChangeFileDetail(PFN.IMAGES, file, onChange)
                    }
                    // maxSize={MAX_SIZE_IMAGE}
                    // accept={IMAGE_ACCEPT}
                  />
                )}
              />
            </FormControl>
          </Box>
        </FlexRow>
        <Divider />
        <Typography sx={{ fontSize: 16, fontWeight: "700", marginTop: 3 }}>
          Thông số sản phẩm
        </Typography>
        <FlexRow>
          <Box width={"50%"}>
            <FormControl label="CPU" required paddingLeft="0">
              <InputSelect
                control={control}
                name={PFN.SPECIFICATION.CPU}
                // label='Chọn series'
                // errorMes={errors?.[PFN.MODEL_SERIES]?.message}
              >
                {CPU_LOV?.map((item, index) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  )
                })}
              </InputSelect>
            </FormControl>
          </Box>
          <Box width={"50%"}>
            <FormControl label="CORE" required>
              <InputSelect
                control={control}
                name={PFN.SPECIFICATION.CORE}
                // label='Chọn series'
                // errorMes={errors?.[PFN.MODEL_SERIES]?.message}
              >
                {CORE_LOV?.map((item, index) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  )
                })}
              </InputSelect>
            </FormControl>
          </Box>
          <Box width={"50%"}>
            <FormControl label="CPU CLOCK" required paddingRight="0">
              <InputSelect
                control={control}
                name={PFN.SPECIFICATION.CPU_CLOCK}
                // label='Chọn series'
                // errorMes={errors?.[PFN.MODEL_SERIES]?.message}
              >
                {CPU_CLOCK_LOV?.map((item, index) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  )
                })}
              </InputSelect>
            </FormControl>
          </Box>
        </FlexRow>
        <FlexRow>
          <Box width={"50%"}>
            <FormControl label="RAM" required paddingLeft="0">
              <InputSelect
                control={control}
                name={PFN.SPECIFICATION.RAM}
                // label='Chọn series'
                // errorMes={errors?.[PFN.MODEL_SERIES]?.message}
              >
                {RAM_LOV?.map((item, index) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  )
                })}
              </InputSelect>
            </FormControl>
          </Box>
          <Box width={"50%"}>
            <FormControl label="ROM" required paddingRight="0">
              <InputSelect
                control={control}
                name={PFN.SPECIFICATION.ROM}
                // label='Chọn series'
                // errorMes={errors?.[PFN.MODEL_SERIES]?.message}
              >
                {ROM_LOV?.map((item, index) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  )
                })}
              </InputSelect>
            </FormControl>
          </Box>
        </FlexRow>
        <FlexRow>
          <Box width={"50%"}>
            <FormControl label="SCREEN SIZE" required paddingLeft="0">
              <InputSelect
                control={control}
                name={PFN.SPECIFICATION.SCREEN_SIZE}
                // label='Chọn series'
                // errorMes={errors?.[PFN.MODEL_SERIES]?.message}
              >
                {SCREEN_SIZE_LOV?.map((item, index) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  )
                })}
              </InputSelect>
            </FormControl>
          </Box>
          <Box width={"50%"}>
            <FormControl label="SCREEN TECH" required>
              <InputSelect
                control={control}
                name={PFN.SPECIFICATION.SCREEN_TECH}
                // label='Chọn series'
                // errorMes={errors?.[PFN.MODEL_SERIES]?.message}
              >
                {SCREEN_TECH_LOV?.map((item, index) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  )
                })}
              </InputSelect>
            </FormControl>
          </Box>
          <Box width={"50%"}>
            <FormControl label="RESOLUTION" required paddingRight="0">
              <InputSelect
                control={control}
                name={PFN.SPECIFICATION.RESOLUTION}
                // label='Chọn series'
                // errorMes={errors?.[PFN.MODEL_SERIES]?.message}
              >
                {RESOLUTION_LOV?.map((item, index) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  )
                })}
              </InputSelect>
            </FormControl>
          </Box>
        </FlexRow>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          marginTop={3}
        >
          <Button
            variant="outlined"
            onClick={() => navigate(ROUTE_PATH.MANAGE_PRODUCT)}
          >
            Hủy
          </Button>
          {isCreate ? (
            <Button variant="contained" onClick={handleCreateNewProduct}>
              Tạo mới
            </Button>
          ) : (
            <Button variant="contained" onClick={handleUpdateProduct}>
              Cập nhật
            </Button>
          )}
        </Stack>
      </FormLayout>
    </Box>
  )
}

export default ProductForm
