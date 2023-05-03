import axios from "axios"
import ApiConfig from "config/ApiConfig"
import { BASE_URL } from "../config/env"
import { LOCAL_STORE } from "../constant/system.const"
import { localStorageHelper } from "../helpers"

const UNAUTHORIZE_URL = [
  ApiConfig.GET_ALL_CATEGORY,
  ApiConfig.GET_BRAND_BY_CATEGORY,
  ApiConfig.GET_PRODUCT_BY_CATEGORY,
  ApiConfig.GET_BRAND_BY_CATEGORY,
  ApiConfig.LOGIN,
]
class ApiUtil {
  fetch = async (url = "", config = {}) => {
    try {
      config.method = config?.method ? config.method : "POST"
      config.timeout = 30000
      if (!config.headers) {
        config.headers = {}
      }
      config.validateStatus = function (status) {
        return status
      }
      config.headers["Content-Type"] = "application/json"
      config.headers["Accept"] = "application/json"

      const token = localStorageHelper.getItem(LOCAL_STORE.TOKEN)
      const isAuthorize = localStorageHelper?.isLogin()
      if (token && isAuthorize && !UNAUTHORIZE_URL.includes(url)) {
        config.headers["Authorization"] = `Bearer ${token}`
      }
      console.log("config ", config)
      config.url = BASE_URL + url
      let response = await axios(config)
      const data = response.data
      console.log(
        "response " + url + " >>>>>> " + response.status + " : ",
        data
      )
      if (data && data.code === 200) {
        return data
      }
    } catch (error) {
      console.log("error", error)
    }
  }
}

class UploadRequest {
  fetch = async (url = "", config = {}, contentType = 'application/json') => {
    try {
      config.method = "PUT"
      config.timeout = 30000
      if (!config.headers) {
        config.headers = {}
      }
      config.validateStatus = function (status) {
        return status
      }
      config.headers["Content-Type"] = contentType
      // config.headers["Accept"] = "application/json"
      config.headers["x-ms-blob-type"] = "BlockBlob"

      // const token = localStorageHelper.getItem(LOCAL_STORE.TOKEN)
      // const isAuthorize = localStorageHelper?.isLogin()
      // if (token && isAuthorize && !UNAUTHORIZE_URL.includes(url)) {
      //   config.headers["Authorization"] = `Bearer ${token}`
      // }
      console.log("config ", config)
      config.url = url
      let response = await axios(config)
      // const data = response.data
      console.log("response upload file" + response)
      // if (data && data.code === 200) {
      //   return data
      // }
    } catch (error) {
      console.log("error", error)
    }
  }
}

export const uploadRequest = new UploadRequest()

export default new ApiUtil()
