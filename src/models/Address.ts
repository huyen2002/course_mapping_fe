export interface Address {
  detail?: string
  district?: string
  city?: string
  country?: string
}
export const AddressUtils = {
  toEntity: (dto: any) => {
    return {
      detail: dto.detail,
      district: dto.district,
      city: dto.city,
      country: dto.country,
    } as Address
  },
}
