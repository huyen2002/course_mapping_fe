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
