/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Major {
  id: number
  name: string
  code: string
  numberOfProgramEducations: number
  enabled?: boolean
}
export const MajorUtils = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toEntity: (dto: any) => {
    return {
      id: dto.id,
      name: dto.name,
      code: dto.code,
      numberOfProgramEducations: dto.numberOfProgramEducations,
      enabled: dto.enabled,
    } as Major
  },
  toEntities: (dtos: any[]) => {
    return dtos.map((dto) => MajorUtils.toEntity(dto)) as Major[]
  },
}
