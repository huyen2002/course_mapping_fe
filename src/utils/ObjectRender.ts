import { CountryObj } from '../constants/countries'
import { Address } from '../models/Address'

export const AddressRender = (address: Address) => {
  let addressStr = ''
  if (address.detail) {
    addressStr += address.detail
  }
  if (address.district) {
    addressStr += `, ${address.district}`
  }
  if (address.city) {
    addressStr += `, ${address.city}`
  }
  if (address.country) {
    addressStr += `, ${CountryObj[address.country].name}`
  }
  return addressStr
}

export const DateRender = (date: Date) => {
  let dateStr = ''
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  dateStr += day < 10 ? `0${day}` : day
  dateStr += '/'
  dateStr += month < 10 ? `0${month}` : month
  dateStr += '/'
  dateStr += year
  return dateStr
}
