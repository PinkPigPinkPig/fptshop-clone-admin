export const PRODUCT_FIELD_NAME = {
    ID: 'id',
    PRODUCT_NAME: 'productName',
    PRODUCT_CODE: 'productCode',
    MODEL_SERIES: 'modelSeries',
    PRICE: 'price',
    DESCRIPTION: 'description',
    SPECIFICATION: {
        SPECIFICATION: 'specification',
        BRAND: 'brand',
        ORIGIN: 'origin',
        WARRANTY: 'warranty',
        STORAGE_INSTRUCTION: 'storageInstruction',
        PHONE_WEIGHT: 'phoneWeight',
        CPU: 'cpu',
        CORE: 'core',
        CPU_CLOCK: 'cpuClock',
        RAM: 'ram',
        ROM: 'rom',
        SCREEN_SIZE: 'screenSize',
        SCREEN_TECH: 'screenTech',
        RESOLUTION: 'resolution',
        STANDARD_SCREEN: 'standardScreen',
        FREQUENCY_SCREEN: 'frequencyScreen',
        CAMERAS: {
            CAMERA_TYPE: 'cameraType',
            CAMERA_LABEL: 'cameraLabel',
            CAMERA_RESOLUTION: 'cameraResolution',
            CAMERA_APERTURE: 'cameraAperture',
            CAMERA_FEATURES: {
                FEATURE_CONTENT: 'featureContent'
            }
        }
    },
    RATING: 'rating',
    SALE_OFF: 'saleOff',
    STOP_SELLING: 'stopSelling',
    CATEGORY: {
        ID: 'categoryId',
    },
    BRAND: {
        ID: 'brandId',
    },
    IMAGES: 'images'

}

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
