import { cloneDeep } from "lodash"

export const moneyConvert = (number, num = 1) => {
  const result = number * num
  return result?.toLocaleString("it-IT", { style: "currency", currency: "VND" })
}

export const calculatePayMoney = (price, saleOff, num = 1) => {
  const result = ((price * (100 - saleOff)) / 100) * num
  return result?.toLocaleString("it-IT", { style: "currency", currency: "VND" })
}

export const mapSubmitData = (data, fileListObj) => {
  let submitData = cloneDeep(data)
  let files = []
  if (submitData.type === COURSE_TYPE.OFFER) {
    submitData.fileNameProvideBy = undefined
    // submitData.fileNameProvideBy2 = undefined;
    // submitData.fileNameProvideBy3 = undefined;
    files = omit(fileListObj, ["fileNameProvideBy"])
  }
  if (submitData.type === COURSE_TYPE.PROVIDE) {
    submitData.fileNameOfferBy = undefined
    files = omit(fileListObj, ["fileNameOfferBy"])
  }
  submitData.requirementCourses = getAllNonEmptyValue(
    submitData.requirementCourses
  )
  // if (submitData.requireApproval === 'false') {
  //   submitData.approveName = undefined;
  // }
  // if (submitData.requireCancel === 'false') {
  //   submitData.cancelName = undefined;
  // }
  submitData = omit(submitData, [
    "type",
    // 'requireApproval',
    // 'requireCancel',
    "programYear",
    "programKey",
  ])
  return { submitData, files }
}
