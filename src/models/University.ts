import { Address, AddressUtils } from './Address'

export interface University {
  id: number
  code: string
  feature: string
  introduction: string
  address: Address
}
export const UniversityUtils = {
  toEntity: (dto: any) => {
    return {
      id: dto.id,
      code: dto.code,
      feature: dto.feature,
      introduction: dto.introduction,
      address: AddressUtils.toEntity(dto.address),
    } as University
  },
  toEntities: (dtos: any[]) => {
    return dtos.map((dto) => UniversityUtils.toEntity(dto))
  },
}
