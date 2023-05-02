import { Button, Stack } from "@mui/material"
import { moneyConvert } from "utils/Ultilities"
import { PRODUCT_FIELD_NAME } from "./create-product/fieldName"

const PFN = PRODUCT_FIELD_NAME

export const TABLE_COLUMNS = [
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
    renderCell: (params) => {
      return (
        <Stack direction='row' spacing={2}>
          <a href='#'>Edit</a>
          <a href='#'>Delete</a>
        </Stack>
      )
    },
  },
]

export const RAM_LOV = ["2GB", "4GB", "6GB", "8GB", "10GB", "12GB", "16GB"]

export const ROM_LOV = [
  "16GB",
  "32GB",
  "64GB",
  "128GB",
  "256GB",
  "512GB",
  "1TGB",
]

export const CPU_LOV = [
  "Apple A15 Bionic",
  "Apple A14 Bionic",
  "Chip Snapdragon 888",
  "Qualcomm Snapdragon 865",
  "Chip Exynos 990",
  "Exynos 1080",
  "MediaTek’s Dimensity 1000",
  "MediaTek Dimensity 800",
  "Qualcomm Snapdragon 855 Plus",
  "Qualcomm Snapdragon 855",
]

export const WARRANTY_LOV = [
  "3 tháng",
  "6 tháng",
  "12 tháng",
  "24 tháng",
  "36 tháng",
]

export const CORE_LOV = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
]

export const CPU_CLOCK_LOV = [
  "1.6Ghz",
  "1.8Ghz",
  "2.0Ghz",
  "2.4Ghz",
  "2.6Ghz",
  "3.6Ghz",
  "3.9Ghz",
  "4.2Ghz",
  "4.6Ghz",
]

export const SCREEN_SIZE_LOV = [
  "5.8 inch",
  "6.1 inch",
  "6.5 inch",
  "6.7 inch",
  "7 inch",
  "7.9 inch",
  "8 inch",
  "8.3 inch",
  "9.7 inch",
  "10.1 inch",
  "12.2 inch",
  "13.3 inch",
  "14 inch",
  "15.6 inch",
  "17 inch",
]

export const SCREEN_TECH_LOV = [
  "LCD",
  "TFT-LCD",
  "IPS",
  "Retina",
  "OLED",
  "AMOLED",
  "Super AMOLED",
  "S-LCD",
  "ClearBlack",
  "E-Ink",
]

export const RESOLUTION_LOV = [
  "1366 x 768 (HD)",
  "1920 x 1080 (Full HD or 1080p)",
  "2560 x 1440 (WQHD or 1440p)",
  "3840 x 2160 (4K or UHD)",
  "5120 x 2880 (5K)",
  "7680 x 4320 (8K)",
  "1280 x 720 (720p)",
  "1600 x 900 (HD+)",
  "3440 x 1440 (Ultrawide QHD)",
  "4096 x 2160 (DCI 4K)",
  "5120 x 2160 (Ultrawide 5K)",
  "7680 x 4320 (16K)",
]

export const STANDARD_SCREEN_LOV = []

export const FREQUENCY_SCREEN_LOV = []

export const fakeData = [
  {
    id: 3,
    status: true,
    createdTime: 1681138839.329105,
    updatedTime: 1681138839.329105,
    createdBy: null,
    updatedBy: null,
    modelSeries: "SAMSUNG_S23",
    productCode: "SAMSUNG",
    productName: "Điện thoại Samsung s23",
    totalProduct: 100,
    price: 23000000,
    thumbnail: null,
    description:
      "Đây là điện thoại Samsung s23. Thực hiện edit thêm thông tin phần description này",
    specification: {
      brand: "Iphone",
      timeRelease: [2013, 4, 10],
      origin: "Hàn Quốc",
      warranty: "12 tháng",
      userManual: "Xem trong sách hướng dẫn sử dụng",
      storageInstruction: "Để nơi khô ráo, nhẹ tay, dễ vỡ",
      phoneWeight: "206g",
      cpu: "Qualcomm snapdragom 8 gen 2",
      core: "6",
      cpuClock: "2.4Ghz*4",
      ram: "8GB",
      screenSize: "6.1 inch",
      screenTech: "Super AMOLED",
      resolution: "2556 x 1179 Pixels",
      standardScreen: "QHD+",
      frequencyScreen: "120HZ",
      surfaceGlass: "Gorilla Glass Victus",
      touchType: "Điện dung đa điểm",
      maxBrightness: "2500 nits",
      gpu: "GPU-1 S23",
      cameras: [
        {
          cameraType: "FRONT",
          cameraLabel: "Single camera",
          cameraResolution: "12MP",
          cameraAperture: "Khẩu độ f/1.6",
          cameraFeatures: [
            {
              featureContent:
                "Đây là thông tin giới thiệu tính năng camera thứ nhất",
            },
            {
              featureContent:
                "Đây là thông tin giới thiệu tính năng camera thứ hai",
            },
          ],
          videos: [
            {
              videoResolution: "4K",
              videoFps: "60fps",
            },
            {
              videoResolution: "FullHD",
              videoFps: "240fps",
            },
          ],
        },
        {
          cameraType: "BACK",
          cameraLabel: "Ultrawide",
          cameraResolution: "50MP",
          cameraAperture: "Khẩu độ f/1.8",
          cameraFeatures: [
            {
              featureContent:
                "Đây là thông tin giới thiệu tính năng camera thứ nhất",
            },
            {
              featureContent:
                "Đây là thông tin giới thiệu tính năng camera thứ hai",
            },
          ],
          videos: [
            {
              videoResolution: "4K",
              videoFps: "60fps",
            },
            {
              videoResolution: "FullHD",
              videoFps: "240fps",
            },
          ],
        },
      ],
      features: [
        {
          featureContent:
            "Đây là thông tin giơi thiệu tính năng sản phẩm thứ nhất",
        },
        {
          featureContent:
            "Đây là thông tin giơi thiệu tính năng sản phẩm thứ hai",
        },
      ],
      sensors: [
        {
          sensorContent: "Cảm biến ánh sáng",
        },
        {
          sensorContent: "Cảm biến vân tay",
        },
      ],
      communicationConnectingList: [
        {
          communicationLabel: "Số khe sim",
          communicationContent: "1",
        },
        {
          communicationLabel: "Loại sim",
          communicationContent: "2 Nano SIM hoặc 1 eSIM, 1 Nano SIM",
        },
        {
          communicationLabel: "Bluetooth",
          communicationContent: "V5.3",
        },
        {
          communicationLabel: "Hỗ trợ mạng",
          communicationContent: "4G, 5G",
        },
      ],
      batteryType: "Lion",
      battery: "4200mAh",
      isFastCharging: false,
      osName: "Android",
      osVersion: "Android 12.0",
    },
    rating: 8.5,
    saleOff: 20,
    timeStartSaleOff: [2023, 4, 10, 15, 0, 39, 96014000],
    timeEndSaleOff: [2023, 4, 20, 15, 0, 39, 96014000],
    stopSelling: false,
    category: {
      id: 2,
      status: true,
      createdTime: 1680537809.994801,
      updatedTime: 1681138839.011013,
      createdBy: null,
      updatedBy: null,
      categoryCode: "LT",
      categoryName: "Laptop",
      parentId: null,
      thumbnail: "https://locng.blob.core.windows.net/selling/icon-laptop.webp",
      routeKey: "lt",
    },
    brand: {
      id: 2,
      status: true,
      createdTime: 1681138839.045015,
      updatedTime: 1681138839.045015,
      createdBy: null,
      updatedBy: null,
      brandCode: "SAMSUNG",
      brandName: "Samsung",
      phoneNumber: "0123456789",
      email: "Samsung@support.com",
      logo: "https://locng.blob.core.windows.net/selling/img-dienthoai-desk.webp",
    },
    promotions: [],
    images: null,
  },
]
