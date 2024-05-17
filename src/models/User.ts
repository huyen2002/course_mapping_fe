import { UniversityData } from './University'

export interface User {
  id: number
  username: string
  email: string
  createAt: Date
  updateAt: Date
  role: Role
  enabled: boolean
}
export const UserUtils = {
  toEntity: (dto: any) => {
    return {
      id: dto.id,
      username: dto.username,
      email: dto.email,
      createAt: new Date(dto.createAt),
      updateAt: new Date(dto.updateAt),
      role: dto.role as Role,
      enabled: dto.enabled,
    }
  },
  toEntities: (dtos: any[]) => {
    return dtos.map((dto) => UserUtils.toEntity(dto))
  },
}

export interface UserLoginInput {
  email: string
  password: string
}

export interface UserCreateInput {
  username: string
  email: string
  password: string
  repeatPassword: string
  role: Role
  university?: UniversityData
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  UNIVERSITY = 'UNIVERSITY',
}
export enum RoleLabel {
  ADMIN = 'Quản trị viên hệ thống',
  USER = 'Cá nhân',
  UNIVERSITY = 'Cơ quan, trường học',
}
