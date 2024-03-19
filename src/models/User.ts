export interface User {
  id: number
  name: string
  email: string
  createAt: Date
  updateAt: Date
  role: string
  enabled: boolean
}
export const UserUtils = {
  toEntity: (dto: any) => {
    return {
      id: dto.id,
      name: dto.name,
      email: dto.email,
      createAt: new Date(dto.create_at),
      updateAt: new Date(dto.update_at),
      role: dto.role,
      enabled: dto.enabled,
    }
  },
}