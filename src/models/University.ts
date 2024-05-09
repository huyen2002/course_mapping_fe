import { Address, AddressUtils } from './Address'
import { User, UserUtils } from './User'

export interface University {
  id: number
  name: string
  code: string
  feature: string
  introduction: string | null
  address: Address | null
  user: User | null
  enabled: boolean
}
export interface UniversityData {
  name?: string
  code?: string
  feature?: string
  introduction?: string
  address?: Address
}
export const UniversityUtils = {
  toEntity: (dto: any) => {
    return {
      id: dto.id,
      name: dto.name,
      code: dto.code,
      feature: dto.feature,
      introduction: dto.introduction,
      enabled: dto.enabled,
      address: AddressUtils.toEntity(dto.address),
      user: dto.user ? UserUtils.toEntity(dto.user) : null,
    } as University
  },
  toEntities: (dtos: any[]) => {
    return dtos.map((dto) => UniversityUtils.toEntity(dto))
  },
}
