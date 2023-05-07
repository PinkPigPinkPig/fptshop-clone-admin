import { cloneDeep, isNil } from "lodash"
import { PRODUCT_FIELD_NAME } from "pages/Manage-Product/create-product/fieldName"

export const moneyConvert = (number, num = 1) => {
  const result = number * num
  return result?.toLocaleString("it-IT", { style: "currency", currency: "VND" })
}

export const calculatePayMoney = (price, saleOff, num = 1) => {
  const result = ((price * (100 - saleOff)) / 100) * num
  return result?.toLocaleString("it-IT", { style: "currency", currency: "VND" })
}

export const mapCreateData = (formValue, image) => {
  const PFN = PRODUCT_FIELD_NAME
  const data = {
    [PFN.PRODUCT_NAME]: formValue?.[PFN.PRODUCT_NAME],
    [PFN.PRODUCT_CODE]: formValue?.[PFN.PRODUCT_CODE],
    [PFN.MODEL_SERIES]: formValue?.[PFN.MODEL_SERIES],
    [PFN.PRICE]: formValue?.[PFN.PRICE],
    // [PFN.SALE_OFF]: formValue?.[PFN.SALE_OFF],
    [PFN.TOTAL_PRODUCT]: formValue?.[PFN.TOTAL_PRODUCT],
    [PFN.DESCRIPTION]: formValue?.[PFN.DESCRIPTION],
    [PFN.IMAGES]: image,
    [PFN.SPECIFICATION.SPECIFICATION]: {
      [PFN.SPECIFICATION.CPU]: formValue?.[PFN.SPECIFICATION.CPU],
      [PFN.SPECIFICATION.CORE]: formValue?.[PFN.SPECIFICATION.CORE],
      [PFN.SPECIFICATION.CPU_CLOCK]: formValue?.[PFN.SPECIFICATION.CPU_CLOCK],
      [PFN.SPECIFICATION.RAM]: formValue?.[PFN.SPECIFICATION.RAM],
      [PFN.SPECIFICATION.ROM]: formValue?.[PFN.SPECIFICATION.ROM],
      [PFN.SPECIFICATION.SCREEN_SIZE]:
        formValue?.[PFN.SPECIFICATION.SCREEN_SIZE],
      [PFN.SPECIFICATION.SCREEN_TECH]:
        formValue?.[PFN.SPECIFICATION.SCREEN_TECH],
      [PFN.SPECIFICATION.RESOLUTION]: formValue?.[PFN.SPECIFICATION.RESOLUTION],
    },
    categoryId: formValue?.[PFN.CATEGORY.ID],
    brandId: formValue?.[PFN.BRAND.ID],
  }
  return data
}

export const findItemInOptions = (code, options, propertyGet) => {
  try {
    if (isNil(code)) {
      return ""
    }
    const item = options?.find((el) => el?.[propertyGet] == code)
    if (!item) return null
    return item
  } catch (error) {
    return null
  }
}
