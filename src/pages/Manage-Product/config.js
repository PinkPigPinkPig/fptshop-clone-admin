export const TABLE_COLUMNS = [
  { field: "id", headerName: "STT", width: 70 },
  { field: "modelSeries", headerName: "Series" },
  { field: "productCode", headerName: "Code" },
  { field: "productName", headerName: "Name" },
  { field: "price", headerName: "Price" },
  { field: "description", headerName: "Description" },
]

export const fakeData = [
  {
    id: 1,
    status: true,
    createdTime: 1681138839.154013,
    updatedTime: 1681138839.154013,
    createdBy: null,
    updatedBy: null,
    modelSeries: "IP14_MINI",
    productCode: "IP14",
    productName: "Điện thoại Iphone 14 mini",
    totalProduct: 100,
    price: 23000000.0,
    thumbnail: null,
    description:
      "Đây là điện thoại Iphone 14 mini. Thực hiện edit thêm thông tin phần description này",
    specification: {
      brand: "Iphone",
      timeRelease: [2013, 4, 10],
      origin: "Mỹ",
      warranty: "12 tháng",
      userManual: "Xem trong sách hướng dẫn sử dụng",
      storageInstruction: "Để nơi khô ráo, nhẹ tay, dễ vỡ",
      phoneWeight: "206g",
      cpu: "Apple A16 bionic",
      core: "6",
      cpuClock: "2.4Ghz*4",
      ram: "8GB",
      screenSize: "6.1 inch",
      screenTech: "Super Retina XDR",
      resolution: "2556 x 1179 Pixels",
      standardScreen: "QHD+",
      frequencyScreen: "120HZ",
      surfaceGlass: "Gorilla Glass Victus",
      touchType: "Điện dung đa điểm",
      maxBrightness: "2500 nits",
      gpu: "GPU-1 Iphone 14 mini",
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
      battery: "3800mAh",
      isFastCharging: false,
      osName: "IOS",
      osVersion: "IOS 14.0",
    },
    rating: 8.5,
    saleOff: 20,
    timeStartSaleOff: [2023, 4, 10, 15, 0, 39, 96014000],
    timeEndSaleOff: [2023, 4, 20, 15, 0, 39, 96014000],
    stopSelling: false,
    category: {
      id: 1,
      status: true,
      createdTime: 1680537809.991724,
      updatedTime: 1681138838.99302,
      createdBy: null,
      updatedBy: null,
      categoryCode: "DT",
      categoryName: "Điện thoại",
      parentId: null,
      thumbnail:
        "https://locng.blob.core.windows.net/selling/img-dienthoai-desk.webp",
    },
    brand: {
      id: 1,
      status: true,
      createdTime: 1681138839.032016,
      updatedTime: 1681138839.032016,
      createdBy: null,
      updatedBy: null,
      brandCode: "APPLE",
      brandName: "Apple",
      phoneNumber: "0123456789",
      email: "Apple@support.com",
      logo: "https://locng.blob.core.windows.net/selling/img-dienthoai-desk.webp",
    },
    promotions: [],
  },
]
